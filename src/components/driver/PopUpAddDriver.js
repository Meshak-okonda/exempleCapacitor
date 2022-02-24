import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ButtonYellow from '../../../../components/ButtonYellow';
import getYears from '../../../../components/getYears';
import { CREATE_DRIVER } from '../../../../graphql/queries';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Image } from 'primereact/image';
import { useDispatch } from 'react-redux';
import {
	GetAges,
	GetListYears,
	GetSex,
	GetYearsLicense,
	PostImage,
} from '../../../../hooks';
import PopUpMutation from '../../../../components/PopUpMutation';
import { Form, Modal } from 'react-bootstrap';
import { schema } from '../../../../schema/driveSchemaValidator';
import { ToastContainer, toast } from 'react-toastify';
import { addDriverInState } from '../../../../redux/slice/globalSlice';
import ToastCustom from '../../../../components/ToastCustom';

export default function PopUpAddDriver({ openModal, setModalON }) {
	const dispatch = useDispatch();
	const [data, setData] = useState(null);
	const [image, setImage] = useState([]);
	const [modalOn, setModalOn] = useState(false);
	const [variablesMutation, setVariablesMutation] = useState({});
	const handleClose = () => setModalON(false);
	const [toast, setToast] = useState({
		state: false,
		message: '',
		type: '',
		header: '',
		delay: null,
	});

	useEffect(() => {
		if (data) {
			const { createDriver } = data;
			if (createDriver) {
				dispatch(addDriverInState(createDriver));
				setTimeout(() => {
					setModalON(false);
				}, 1000);
			}
		}
	}, [data, dispatch, setModalON]);

	const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm();

	async function onSubmit(data) {
		await schema
			.isValid({
				...data,
				image,
			})
			.then((valid) => {
				if (valid) {
					setVariablesMutation({
						...data,
						image,
					});
					setModalOn(true);
				} else {
					setToast({
						state: true,
						message: "Quelque chose s'est mal passé",
						type: 'danger',
						header: 'Erreur',
						delay: 3000,
					});
				}
			});
	}

	const confirmMutation = async (mutation) => {
		const listImage = image;
		const imageUrl = [];
		if (image.length > 0) {
			setToast({
				state: true,
				message: 'Envoie fichier(s)',
				type: 'warrning',
				awaitView: true,
			});
			for (const file of listImage) {
				const { url } = await PostImage(file);
				imageUrl.push(url);
			}
			setToast({
				state: false,
			});
		}
		try {
			await mutation({
				variables: { driver: { ...variablesMutation, image: imageUrl } },
			});
			setToast({
				state: true,
				message: 'Votre action avec succès',
				type: 'success',
				header: 'Felicitation',
				delay: 3000,
			});
			reset();
		} catch (error) {
			setToast({
				state: true,
				message: JSON.stringify(error),
				type: 'danger',
				header: 'Erreur',
				delay: 3000,
			});
		}
	};

	function chooseImage({ target }) {
		var reader = new FileReader();

		reader.onloadend = function ({ target }) {
			setImage([reader.result]);
		};
		if (target.files[0]) {
			reader.readAsDataURL(target.files[0]);
		}
	}

	return (
		<>
			<Modal size='lg' show={openModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Créer un chauffeur</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<div className='p-fluid p-formgrid p-grid'>
							<div className='p-field p-col-12 p-md-6'>
								<label htmlFor='firstname6'>
									Nom <i className='danger-color'>*</i>
								</label>
								<Controller
									control={control}
									name='name'
									rules={{
										required: {
											value: true,
											message: 'Le nom est requis',
										},
										minLength: {
											value: 3,
											message: "La taille minimal n'est pas respecter(3)",
										},
										maxLength: {
											value: 20,
											message: 'La taille maximal est depassé(20)',
										},
									}}
									render={({ field }) => {
										return (
											<>
												<InputText id={field.name} type='text' {...field} />
												{errors.name && (
													<div className='alert-danger'>
														{errors.name.message}
													</div>
												)}
											</>
										);
									}}
								/>
							</div>
							<div className='p-field p-col-12 p-md-6'>
								<label htmlFor='lastname6'>
									Post nom <i className='danger-color'>*</i>
								</label>
								<Controller
									control={control}
									name='lastName'
									rules={{
										required: {
											value: true,
											message: 'Le post nom est requis',
										},
										minLength: {
											value: 3,
											message: "La taille minimal n'est pas respecter(3)",
										},
										maxLength: {
											value: 20,
											message: 'La taille maximal est depassé(20)',
										},
									}}
									render={({ field }) => {
										return (
											<>
												<InputText id={field.name} type='text' {...field} />
												{errors.lastName && (
													<div className='alert-danger'>
														{errors.lastName.message}
													</div>
												)}
											</>
										);
									}}
								/>
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='address'>Numero de telephone</label>
								<Controller
									control={control}
									name='phone'
									rules={{
										maxLength: {
											value: 14,
											message: 'La taille maximal est depassé(14)',
										},
										pattern: {
											value: '^[0-9]*$',
											message:
												'Le numero de telephone doit contenir que des chiffres',
										},
									}}
									render={({ field }) => {
										return (
											<>
												<InputText id={field.name} type='text' {...field} />
												{errors.phone && (
													<div className='alert-danger'>
														{errors.phone.message}
													</div>
												)}
											</>
										);
									}}
								/>
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='address'>
									Mot de passe <i className='danger-color'>*</i>
								</label>
								<Controller
									control={control}
									name='password'
									rules={{
										required: {
											value: true,
											message: 'Le mot de passe est requis',
										},
										minLength: {
											value: 8,
											message: "La taille minimal n'est pas respecter(8)",
										},
										maxLength: {
											value: 20,
											message: 'La taille maximal est depassé(20)',
										},
									}}
									render={({ field }) => {
										return (
											<>
												<InputText id={field.name} type='text' {...field} />
												{errors.password && (
													<div className='alert-danger'>
														{errors.password.message}
													</div>
												)}
											</>
										);
									}}
								/>
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='address'>E - Mail</label>
								<Controller
									control={control}
									name='email'
									rules={{
										minLength: {
											value: 8,
											message: "La taille minimal n'est pas respecter(8)",
										},
										pattern: {
											value:
												/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
											message: 'Mauvais format',
										},
									}}
									render={({ field }) => {
										return (
											<>
												<InputText id={field.name} type='text' {...field} />
												{errors.email && errors.email.type === 'maxLength' && (
													<small className='alert-danger'>
														La taille maximal est depassé
													</small>
												)}
												{errors.email && errors.email.type === 'pattern' && (
													<small className='alert-danger'>
														Mauvais format d'email
													</small>
												)}
											</>
										);
									}}
								/>
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='city'>
									Validité de la license <i className='danger-color'>*</i>
								</label>
								<Controller
									control={control}
									name='licenseValidity'
									rules={{
										required: true,
									}}
									render={({ field }) => {
										return (
											<>
												<Dropdown
													value={`${field.value}`}
													options={GetYearsLicense()}
													onChange={({ value }) => field.onChange(value)}
													placeholder='Validité de la license'
												/>
												{errors.licenseValidity &&
													errors.licenseValidity.type === 'required' && (
														<small className='alert-danger'>
															La validité de la license est requise !
														</small>
													)}
											</>
										);
									}}
								/>
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='city'>
									Age <i className='danger-color'>*</i>
								</label>
								<Controller
									control={control}
									name='age'
									rules={{
										required: true,
									}}
									render={({ field }) => {
										return (
											<>
												<Dropdown
													value={`${field.value}`}
													options={GetAges()}
													onChange={({ value }) => {
														let year = parseInt(value);
														field.onChange(year);
													}}
													placeholder='Age'
												/>
												{errors.age && errors.age.type === 'required' && (
													<small className='alert-danger'>
														L'age est requis !
													</small>
												)}
											</>
										);
									}}
								/>
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='city'>
									Sexe <i className='danger-color'>*</i>
								</label>
								<Controller
									control={control}
									name='sex'
									rules={{
										required: true,
									}}
									render={({ field }) => {
										return (
											<>
												<Dropdown
													value={field.value}
													options={GetSex()}
													onChange={({ value }) => field.onChange(value)}
													placeholder='Sexe'
												/>
												{errors.sex && errors.sex.type === 'required' && (
													<small className='alert-danger'>
														Le Sexe est requis !
													</small>
												)}
											</>
										);
									}}
								/>
							</div>
							<div className='p-field p-col-12'>
								<Form.Group controlId='formFileSm' className='mb-3'>
									<label htmlFor='address'>Photo</label>
									<Form.Control type='file' size='md' onChange={chooseImage} />
								</Form.Group>
							</div>
							<div className='p-field p-col-12 d-flex align-content-center'>
								{image.length > 0 &&
									image.map((url, id) => {
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
														setImage(image.filter((url, idimg) => idimg == !id))
													}></i>
											</div>
										);
									})}
							</div>
						</div>
						<Modal.Footer>
							<ButtonYellow
								style={{
									paddingRight: 50,
									paddingLeft: 50,
								}}
								title={'Créer'}
							/>
						</Modal.Footer>
					</Modal.Body>
				</form>
			</Modal>
			{modalOn && (
				<PopUpMutation
					query={CREATE_DRIVER}
					setModalON={setModalOn}
					openModal={modalOn}
					confirmMutation={confirmMutation}
					setDataGet={setData}
				/>
			)}
			{toast.state && (
				<ToastCustom
					stateToast={toast.state}
					body={toast.message}
					header={toast.header}
					delay={toast.delay}
					type={toast.type}
					awaitView={toast.awaitView}
				/>
			)}
		</>
	);
}
