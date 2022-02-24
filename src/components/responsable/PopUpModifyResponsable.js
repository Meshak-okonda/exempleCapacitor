import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ButtonYellow from '../../../../components/ButtonYellow';
import { UPDATE_RESPONSABLE } from '../../../../graphql/queries';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Image } from 'primereact/image';
import { useDispatch, useSelector } from 'react-redux';
import { GetAges, GetSex, PostImage } from '../../../../hooks';
import PopUpMutation from '../../../../components/PopUpMutation';
import { Form, Modal } from 'react-bootstrap';
import { updateResponsableInState } from '../../../../redux/slice/globalSlice';
import ToastCustom from '../../../../components/ToastCustom';

export default function PopUpModifyResponsable({
	openModal,
	setModalON,
	responsableUpdate,
}) {
	const { responsables } = useSelector((state) => state.globalState);
	const { user } = useSelector((state) => state.userConnected);
	const dispatch = useDispatch();
	const [data, setData] = useState(null);
	const [modalOn, setModalOn] = useState(false);
	const [variablesMutation, setVariablesMutation] = useState({});
	const [valueModify, setValueModify] = useState(responsableUpdate);
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
			const { updateResponsable } = data;
			dispatch(updateResponsableInState(updateResponsable));
			localStorage.removeItem('user');
			localStorage.setItem('user', JSON.stringify(updateResponsable));
			setTimeout(() => {
				setModalON(false);
			}, 1000);
		}
	}, [data, dispatch, setModalON]);
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	async function onSubmit(data) {
		setVariablesMutation({ ...data, image: valueModify.image });
		setModalOn(true);
	}
	const recupNumberInString = (string) => {
		const regex = /\d+/g;
		const result = string.match(regex);
		return result[0];
	};

	const confirmMutation = async (mutation) => {
		let imageUrl = '';
		if (valueModify.image) {
			if (valueModify.image.includes('http')) {
				imageUrl = valueModify.image;
			} else {
				setToast({
					header: 'Envoi des images',
					type: 'info',
					awaitView: true,
					state: true,
				});
				const { url } = await PostImage(valueModify.image);
				imageUrl = url;
			}
		}
		setToast({ state: false });
		try {
			await mutation({
				variables: {
					updateResponsableId: valueModify.id,
					responsable: { ...variablesMutation, image: imageUrl },
				},
			});
		} catch (error) {}
	};

	const chooseOptions = {
		label: 'Selectionner les photos',
		icon: 'pi pi-fw pi-plus',
	};
	const cancelOptions = {
		label: 'Annuler',
		icon: 'pi pi-times',
	};

	function chooseImage({ target }) {
		var reader = new FileReader();

		reader.onloadend = function ({ target }) {
			setValueModify({ ...valueModify, image: target.result });
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
						Modification : {`${valueModify.name} ${valueModify.lastName}`}
					</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<div className='p-fluid p-formgrid p-grid'></div>
						<div className='p-fluid p-formgrid p-grid'>
							<div className='p-field p-col-12 p-md-6'>
								<label htmlFor='firstname6'>
									Nom <i className='danger-color'>*</i>
								</label>
								<Controller
									name='name'
									control={control}
									rules={{
										required: true,
										pattern: /^[a-zA-Z]+$/,
										maxLength: 20,
										minLength: 3,
									}}
									defaultValue={valueModify.name}
									render={({ field }) => {
										return (
											<InputText
												id={field.name}
												name={field.name}
												{...field}
												value={field.value}
											/>
										);
									}}
								/>
								{errors.name && errors.name.type === 'required' && (
									<small className='alert-danger p-1'>
										Le nom est requis !
									</small>
								)}
								{errors.name && errors.name.type === 'maxLength' && (
									<small className='alert-danger p-1'>
										La taille minimal n'est pas respecter (20 caractères)
									</small>
								)}
								{errors.name && errors.name.type === 'minLength' && (
									<small className='alert-danger p-1'>
										La taille minimal n'est pas respecter (3 caractères)
									</small>
								)}
								{errors.name && errors.name.type === 'pattern' && (
									<small className='alert-danger p-1'>
										Le nom ne doit contenir que des lettres
									</small>
								)}
							</div>
							<div className='p-field p-col-12 p-md-6'>
								<label htmlFor='lastname6'>
									Post nom <i className='danger-color'>*</i>
								</label>
								<Controller
									name='lastName'
									control={control}
									rules={{
										required: true,
										pattern: /^[a-zA-Z]+$/,
										maxLength: 20,
										minLength: 3,
									}}
									defaultValue={valueModify.lastName}
									render={({ field }) => {
										return (
											<InputText
												id={field.name}
												name={field.name}
												{...field}
												value={field.value}
											/>
										);
									}}
								/>
								{errors.lastName && errors.lastName.type === 'required' && (
									<small className='alert-danger p-1'>
										Le post nom est requis !
									</small>
								)}
								{errors.lastName && errors.lastName.type === 'maxLength' && (
									<small className='alert-danger p-1'>
										La taille minimal n'est pas respecter (20 caractères)
									</small>
								)}
								{errors.lastName && errors.lastName.type === 'minLength' && (
									<small className='alert-danger p-1'>
										La taille minimal n'est pas respecter (3 caractères)
									</small>
								)}
								{errors.lastName && errors.lastName.type === 'pattern' && (
									<small className='alert-danger p-1'>
										le post nom ne doit contenir que des lettres
									</small>
								)}
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='address'>
									E - Mail <i className='danger-color'>*</i>
								</label>
								<Controller
									name='email'
									control={control}
									rules={{
										maxLength: 50,
										minLength: 3,
										pattern:
											/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
									}}
									defaultValue={valueModify.email}
									render={({ field }) => {
										return (
											<InputText
												id={field.name}
												name={field.name}
												{...field}
												value={field.value}
											/>
										);
									}}
								/>
								{errors.email && errors.email.type === 'maxLength' && (
									<small className='alert-danger p-1'>
										La taille minimal n'est pas respecter (20 caractères)
									</small>
								)}
								{errors.email && errors.email.type === 'minLength' && (
									<small className='alert-danger p-1'>
										La taille minimal n'est pas respecter (3 caractères)
									</small>
								)}
								{errors.email && errors.email.type === 'pattern' && (
									<small className='alert-danger p-1'>email invalide</small>
								)}
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='address'>
									Mot de passe <i className='danger-color'>*</i>
								</label>
								<Controller
									name='password'
									control={control}
									rules={{
										maxLength: 50,
										minLength: 8,
										pattern: /^[a-zA-Z0-9]+$/,
									}}
									defaultValue=''
									render={({ field }) => {
										return (
											<InputText
												id={field.name}
												name={field.name}
												placeholder='Mot de passe'
												{...field}
												value={field.value}
											/>
										);
									}}
								/>
								{errors.password && errors.password.type === 'required' && (
									<small className='alert-danger p-1'>
										le mot de passe est requis !
									</small>
								)}
								{errors.password && errors.password.type === 'maxLength' && (
									<small className='alert-danger p-1'>
										La taille minimal n'est pas respecter (50 caractères)
									</small>
								)}
								{errors.password && errors.password.type === 'minLength' && (
									<small className='alert-danger p-1'>
										La taille minimal n'est pas respecter (8 caractères)
									</small>
								)}
								{errors.password && errors.password.type === 'pattern' && (
									<small className='alert-danger p-1'>
										le mot de passe ne doit contenir que des lettres
									</small>
								)}
							</div>
							<div className='p-field p-col-6'>
								<label htmlFor='address'>
									Numero de telephone <i className='danger-color'>*</i>
								</label>
								<Controller
									name='phone'
									control={control}
									rules={{
										required: true,
										maxLength: 50,
										minLength: 8,
										pattern: /^[0-9]+$/,
									}}
									defaultValue={valueModify.phone}
									render={({ field }) => {
										return (
											<InputText
												id={field.name}
												name={field.name}
												{...field}
												value={field.value}
											/>
										);
									}}
								/>
								{errors.phone && errors.phone.type === 'required' && (
									<small className='alert-danger p-1'>
										le mot de passe est requis !
									</small>
								)}
								{errors.phone && errors.phone.type === 'maxLength' && (
									<small className='alert-danger p-1'>
										La taille minimal n'est pas respecter (50 caractères)
									</small>
								)}
								{errors.phone && errors.phone.type === 'minLength' && (
									<small className='alert-danger p-1'>
										La taille minimal n'est pas respecter (8 caractères)
									</small>
								)}
								{errors.phone && errors.phone.type === 'pattern' && (
									<small className='alert-danger p-1'>
										le format du numero de telephone est invalide (0-9)
									</small>
								)}
							</div>
							<div className='p-field p-col-3'>
								<label htmlFor='city'>
									Age <i className='danger-color'>*</i>
								</label>
								<Controller
									name='age'
									control={control}
									rules={{
										required: true,
									}}
									defaultValue={valueModify.age}
									render={({ field }) => {
										return (
											<Dropdown
												value={`${field.value}`}
												options={GetAges()}
												onChange={({ value }) => {
													let year = parseInt(value);
													field.onChange(year);
												}}
												placeholder='Age du responsable'
											/>
										);
									}}
								/>
								{errors.age && (
									<small className='alert-danger p-1'>L'age est requis !</small>
								)}
							</div>
							<div className='p-field p-col-3'>
								<label htmlFor='city'>
									Sexe du chaufeur <i className='danger-color'>*</i>
								</label>
								<Controller
									name='sex'
									control={control}
									rules={{
										required: true,
									}}
									defaultValue={`${valueModify.sex}`}
									render={({ field }) => {
										return (
											<Dropdown
												value={`${field.value}`}
												options={GetSex()}
												onChange={({ value }) => {
													field.onChange(value);
												}}
												placeholder='Sexe du responsable'
											/>
										);
									}}
								/>
								{errors.sex && (
									<small className='alert-danger p-1'>
										Le sexe est requis !
									</small>
								)}
							</div>
							<div className='p-field p-col-12'>
								<Form.Group controlId='formFileSm' className='mb-3'>
									<label htmlFor='address'>Photo de l'adm</label>
									<Form.Control type='file' size='md' onChange={chooseImage} />
								</Form.Group>
							</div>
							<div className='p-field p-col-12 d-flex align-content-center'>
								{valueModify.image && (
									<div className='m-1' s>
										<Image
											src={valueModify.image}
											template='Preview Content'
											alt='Image Text'
											width='100'
											height='100'
										/>
										<i
											className='bi bi-trash-fill'
											onClick={() => valueModify({ image: null })}></i>
									</div>
								)}
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
			<div className='d-flex justify-content-between align-content-center m-1'></div>
			{modalOn && (
				<PopUpMutation
					query={UPDATE_RESPONSABLE}
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
				/>
			)}
		</>
	);
}
