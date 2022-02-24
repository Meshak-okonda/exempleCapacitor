import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ButtonYellow from '../../../../components/ButtonYellow';
import { UPDATE_DRIVER } from '../../../../graphql/queries';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Image } from 'primereact/image';
import { useDispatch, useSelector } from 'react-redux';
import {
	GetAges,
	GetSex,
	GetVehicles,
	GetYearsLicense,
	PostImage,
} from '../../../../hooks';
import PopUpMutation from '../../../../components/PopUpMutation';
import { Modal, Form } from 'react-bootstrap';
import { schema } from '../../../../schema/driveSchemaValidator';
import { updateDriveInState } from '../../../../redux/slice/globalSlice';
import ToastCustom from '../../../../components/ToastCustom';

export default function PopUpModifyDriver({
	openModal,
	setModalON,
	updateDriver,
}) {
	const [valueModify, setValueModify] = useState(updateDriver);
	const [variablesMutation, setVariablesMutation] = useState({});
	const [modalOn, setModalOn] = useState(false);
	const [toast, setToast] = useState({
		state: false,
		body: '',
		header: '',
		type: '',
		delay: 6000,
	});
	const [data, setData] = useState(null);
	const dispatch = useDispatch();
	const handleClose = () => setModalON(false);
	useEffect(() => {
		if (data) {
			if (data.updateDriver) {
				dispatch(updateDriveInState(data.updateDriver));
				setTimeout(() => {
					setModalON(false);
				}, 2000);
			}
		}
	}, [data, dispatch, setModalON]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm();

	async function onSubmit(data) {
		await schema
			.isValid({ ...data, image: valueModify.image })
			.then((valid) => {
				if (valid) {
					setVariablesMutation({ ...data });
					setModalOn(true);
				} else {
					setToast({
						header: 'Erreur',
						type: 'danger',
						body: 'Reverifier les données SVP!',
						state: true,
					});
				}
			});
	}

	const confirmMutation = async (mutation) => {
		const imageUrl = [];
		if (valueModify.image && valueModify.image.length > 0) {
			for (const file of valueModify.image) {
				if (file.startsWith('http')) {
					imageUrl.push(file);
				} else {
					setToast({
						header: 'Envoi des images',
						type: 'info',
						awaitView: true,
						state: true,
					});
					const { url } = await PostImage(file);
					imageUrl.push(url);
				}
			}
			setToast({ state: false });
		}
		try {
			await mutation({
				variables: {
					updateDriverId: valueModify.id,
					driver: {
						...variablesMutation,
						password: variablesMutation.password || '',
						image: imageUrl,
						age: parseInt(variablesMutation.age),
					},
				},
			});
			reset();
		} catch (error) {
			setToast({
				header: 'Erreur',
				body: `${JSON.stringify(error.message)}`,
				type: 'danger',
				state: true,
			});
		}
	};

	const recupNumberInString = (string) => {
		const regex = /\d+/g;
		const result = string.match(regex);
		return result[0];
	};

	function chooseImage({ target }) {
		var reader = new FileReader();

		reader.onloadend = function ({ target }) {
			setValueModify({
				...valueModify,
				image: [reader.result],
			});
		};
		if (target.files[0]) {
			reader.readAsDataURL(target.files[0]);
		}
	}

	return (
		<>
			<Modal size='lg' show={openModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Modification de {`${valueModify.name} ${valueModify.lastName}`}
					</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<div className='p-fluid p-formgrid p-grid'>
							<div className='p-field p-col-12 p-md-6'>
								<label htmlFor='firstname6'>
									Nom <i className='danger-color'>*</i>
								</label>
								<Controller
									name='name'
									defaultValue={valueModify.name}
									rules={{
										required: {
											value: true,
											message: 'Le nom est obligatoire',
										},
										minLength: {
											value: 3,
											message: 'Le nom doit contenir au moins 3 caractères',
										},
										maxLength: {
											value: 30,
											message: 'Le nom doit contenir moins de 30 caractères',
										},
									}}
									control={control}
									render={({ field }) => {
										return (
											<>
												<InputText
													id={field.name}
													type='text'
													name={field.name}
													{...field}
													value={field.value}
												/>
											</>
										);
									}}
								/>
								{errors.name && (
									<div className='alert-danger p-1'>{errors.name.message}</div>
								)}
							</div>
							<div className='p-field p-col-12 p-md-6'>
								<label htmlFor='lastname6'>
									Post nom <i className='danger-color'>*</i>
								</label>
								<Controller
									name='lastName'
									defaultValue={valueModify.lastName}
									rules={{
										required: {
											value: true,
											message: 'Le post nom est obligatoire',
										},
										minLength: {
											value: 3,
											message:
												'Le post nom doit contenir au moins 3 caractères',
										},
										maxLength: {
											value: 30,
											message:
												'Le post nom doit contenir moins de 30 caractères',
										},
									}}
									control={control}
									render={({ field }) => {
										return (
											<>
												<InputText
													id={field.name}
													type='text'
													name={field.name}
													{...field}
													value={field.value}
												/>
											</>
										);
									}}
								/>
								{errors.lastname && (
									<div className='alert-danger p-1'>
										{errors.lastname.message}
									</div>
								)}
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='address'>Numero de telephone</label>
								<Controller
									name='phone'
									defaultValue={valueModify.phone}
									rules={{
										minLength: {
											value: 10,
											message:
												'Le numero de telephone doit contenir au moins 10 caractères',
										},
										maxLength: {
											value: 14,
											message: 'Le numero doit contenir moins de 30 caractères',
										},
										pattern: {
											value: '^[0-9]*$',
											message:
												'Le numero de telephone doit contenir que des chiffres',
										},
									}}
									control={control}
									render={({ field }) => {
										return (
											<>
												<InputText
													id={field.name}
													type='text'
													name={field.name}
													{...field}
													value={field.value}
												/>
											</>
										);
									}}
								/>
								{errors.phone && (
									<div className='alert-danger p-1'>{errors.phone.message}</div>
								)}
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='address'>
									Mot de passe <i className='danger-color'>*</i>
								</label>
								<Controller
									name='password'
									rules={{
										minLength: {
											value: 8,
											message:
												'Le mot de passe doit contenir au moins 8 caractères',
										},
										maxLength: {
											value: 20,
											message:
												'Le mot de passe doit contenir moins de 20 caractères',
										},
									}}
									control={control}
									render={({ field }) => {
										return (
											<>
												<InputText
													id={field.name}
													type='text'
													name={field.name}
													{...field}
													value={field.value}
												/>
											</>
										);
									}}
								/>
								{errors.password && (
									<div className='alert-danger p-1'>
										{errors.password.message}
									</div>
								)}
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='address'>E - Mail</label>
								<Controller
									name='email'
									defaultValue={valueModify.email}
									rules={{
										minLength: {
											value: 5,
											message: 'Le mail doit contenir au moins 5 caractères',
										},
										maxLength: {
											value: 50,
											message: 'Le mail doit contenir moins de 50 caractères',
										},
										pattern: {
											value:
												'^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
											message: "mauvais format d'e-mail",
										},
									}}
									control={control}
									render={({ field }) => {
										return (
											<>
												<InputText
													id={field.name}
													type='text'
													name={field.name}
													{...field}
													value={field.value}
												/>
											</>
										);
									}}
								/>
								{errors.email && (
									<div className='alert-danger p-1'>{errors.email.message}</div>
								)}
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='city'>
									Validité de la license <i className='danger-color'>*</i>
								</label>
								<Controller
									name='licenseValidity'
									defaultValue={`${valueModify.licenseValidity}`}
									rules={{
										required: {
											value: true,
											message: 'La validité de la license est obligatoire',
										},
									}}
									control={control}
									render={({ field }) => {
										return (
											<>
												<Dropdown
													id={field.name}
													value={`${field.value}`}
													options={GetYearsLicense()}
													onChange={({ value }) => field.onChange(value)}
													placeholder='Validité de la license'
												/>
											</>
										);
									}}
								/>
								{errors.licenseValidity && (
									<div className='alert-danger p-1'>
										{errors.licenseValidity.message}
									</div>
								)}
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='city'>
									Age <i className='danger-color'>*</i>
								</label>
								<Controller
									name='age'
									defaultValue={`${valueModify.age}`}
									rules={{
										required: {
											value: true,
											message: "L'age est obligatoire",
										},
									}}
									control={control}
									render={({ field }) => {
										return (
											<>
												<Dropdown
													id={field.name}
													value={field.value}
													options={GetAges()}
													onChange={({ value }) => field.onChange(value)}
													placeholder='Age'
												/>
											</>
										);
									}}
								/>
								{errors.age && (
									<div className='alert-danger p-1'>{errors.age.message}</div>
								)}
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='city'>
									Sexe du chaufeur <i className='danger-color'>*</i>
								</label>
								<Controller
									name='sex'
									defaultValue={`${valueModify.sex}`}
									rules={{
										required: {
											value: true,
											message: 'Le sexe est obligatoire',
										},
									}}
									control={control}
									render={({ field }) => {
										return (
											<>
												<Dropdown
													id={field.name}
													value={`${field.value}`}
													options={GetSex()}
													onChange={({ value }) => field.onChange(value)}
													placeholder='Sexe'
												/>
											</>
										);
									}}
								/>
								{errors.sex && (
									<div className='alert-danger p-1'>{errors.sex.message}</div>
								)}
							</div>
							<div className='p-field p-col-12'>
								<Form.Group controlId='formFileSm' className='mb-3'>
									<label htmlFor='address'>Photo</label>
									<Form.Control type='file' size='md' onChange={chooseImage} />
								</Form.Group>
							</div>
							<div className='p-field p-col-12 d-flex align-content-center'>
								{valueModify.image &&
									valueModify.image.length > 0 &&
									valueModify.image.map((url, id) => {
										return (
											<div className='m-1' key={id}>
												<Image
													src={url}
													template='Preview Content'
													alt='Image Text'
													width='100'
													height='100'
												/>
												<i
													className='bi bi-trash-fill'
													onClick={() =>
														setValueModify({
															image: valueModify.image.filter(
																(image, index) => index !== id
															),
														})
													}></i>
											</div>
										);
									})}
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<ButtonYellow
							style={{
								paddingRight: 50,
								paddingLeft: 50,
							}}
							title={'Modifier'}
						/>
					</Modal.Footer>
				</form>
			</Modal>
			{modalOn && (
				<PopUpMutation
					query={UPDATE_DRIVER}
					setModalON={setModalOn}
					openModal={modalOn}
					confirmMutation={confirmMutation}
					setDataGet={setData}
				/>
			)}
			{toast.state && (
				<ToastCustom
					stateToast={toast.state}
					body={toast.body}
					header={toast.header}
					type={toast.type}
					delay={toast.delay}
					awaitView={toast.awaitView}
				/>
			)}
		</>
	);
}
