import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ButtonYellow from '../../../../components/ButtonYellow';
import { CREATE_RESPONSABLE } from '../../../../graphql/queries';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Image } from 'primereact/image';
import { useDispatch } from 'react-redux';
import { GetAges, GetSex, PostImage } from '../../../../hooks';
import PopUpMutation from '../../../../components/PopUpMutation';
import { Form, Spinner, Modal } from 'react-bootstrap';
import { schema } from '../../../../schema/responsableSchemaValidator';
import { addResponsableInState } from '../../../../redux/slice/globalSlice';
import ToastCustom from '../../../../components/ToastCustom';

export default function PopUpAddResponsable({ openModal, setModalON }) {
	const dispatch = useDispatch();
	const [data, setData] = useState(null);
	const [image, setImage] = useState('');
	const [modalOn, setModalOn] = useState(false);
	const [variablesMutation, setVariablesMutation] = useState({});
	const [spinner, setSpinner] = useState(false);
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
			const { createResponsable } = data;
			setTimeout(() => {
				setModalON(false);
			}, 2000);
			dispatch(addResponsableInState(createResponsable));
		}
	}, [data, dispatch, setModalON]);
	const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm();

	async function onSubmit(data) {
		await schema.isValid({ ...data, image }).then((valid) => {
			if (valid) {
				setVariablesMutation({ ...data });
				setModalOn(true);
			} else {
				setToast({
					state: true,
					message: 'Reverifier vos données !',
					type: 'success',
					header: 'Felicitation',
					delay: 3000,
				});
			}
		});
	}

	const confirmMutation = async (mutation) => {
		let listUrl = '';
		if (image && image.length > 0) {
			setToast({
				header: 'Envoi des images',
				type: 'info',
				awaitView: true,
				state: true,
			});
			setSpinner(true);
			setToast({
				header: 'Envoi des images',
				type: 'warning',
				awaitView: true,
				state: true,
			});
			const { url } = await PostImage(image);
			listUrl = url;
			setToast({ state: false });
		}
		try {
			await mutation({
				variables: { responsable: { ...variablesMutation, image: listUrl } },
			});
			reset();
		} catch (error) {
			setToast({
				state: true,
				message: JSON.stringify(error.message),
				type: 'danger',
				header: 'Erreur',
				delay: 3000,
			});
		}
	};

	function chooseImage({ target }) {
		var reader = new FileReader();

		reader.onloadend = function ({ target }) {
			setImage(reader.result);
		};
		if (target.files[0]) {
			reader.readAsDataURL(target.files[0]);
		}
	}

	return (
		<>
			<Modal show={openModal} size='lg' onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Créer un Responsable</Modal.Title>
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
									render={({ field }) => {
										return (
											<InputText id={field.name} name={field.name} {...field} />
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
										le nom ne doit contenir que des lettres
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
									render={({ field }) => {
										return (
											<InputText id={field.name} name={field.name} {...field} />
										);
									}}
								/>
								{errors.lastName && errors.lastName.type === 'required' && (
									<small className='alert-danger p-1'>
										Le nom est requis !
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
										le nom ne doit contenir que des lettres
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
										required: true,
										maxLength: 50,
										minLength: 3,
										pattern:
											/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
									}}
									render={({ field }) => {
										return (
											<InputText id={field.name} name={field.name} {...field} />
										);
									}}
								/>
								{errors.email && errors.email.type === 'required' && (
									<small className='alert-danger p-1'>
										Le mail est requis !
									</small>
								)}
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
										required: true,
										maxLength: 50,
										minLength: 8,
										pattern: /^[a-zA-Z0-9]+$/,
									}}
									render={({ field }) => {
										return (
											<InputText id={field.name} name={field.name} {...field} />
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
									render={({ field }) => {
										return (
											<InputText id={field.name} name={field.name} {...field} />
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
									<label htmlFor='address'>Photo du Responsable</label>
									<Form.Control type='file' size='md' onChange={chooseImage} />
								</Form.Group>
							</div>
							<div className='p-field p-col-12 d-flex align-content-center'>
								{image && (
									<div className='m-1' s>
										<Image
											src={image}
											template='Preview Content'
											alt='Image Text'
											width='100'
											height='100'
										/>
										<i
											className='bi bi-trash-fill'
											onClick={() => setImage(null)}></i>
									</div>
								)}
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						{spinner ? <Spinner animation='border' variant='warning' /> : ''}
						<ButtonYellow
							style={{
								paddingRight: 50,
								paddingLeft: 50,
							}}
							title={'Créer'}
						/>
					</Modal.Footer>
				</form>
			</Modal>

			{modalOn && (
				<PopUpMutation
					query={CREATE_RESPONSABLE}
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
