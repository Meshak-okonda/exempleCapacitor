import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, Spinner } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import getYears from '../../../../components/getYears';
import { UPDATE_TYPE_VEHICLE } from '../../../../graphql/queries';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import ButtonYellow from '../../../../components/ButtonYellow';
import ToastCustom from '../../../../components/ToastCustom';

export default function PopUpUpdateTypeVehicle({
	openModal,
	setModalON,
	dataGet,
	typeUpdate,
}) {
	const [mutation, { data, error, loading }] = useMutation(UPDATE_TYPE_VEHICLE);
	const handleClose = () => setModalON(false);

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();
	async function onSubmit(dataUpdate) {
		try {
			await mutation({
				variables: {
					updateTypeVehicleId: typeUpdate.id,
					typeVehicle: dataUpdate,
				},
			});
		} catch (error) {
			toast.error(JSON.stringify(error));
		}
	}

	if (loading) {
		return (
			<>
				<ToastCustom
					stateToast={true}
					body='Action en cours'
					header='Pattienter SVP ...'
					type='info'
					awaitView={true}
				/>
			</>
		);
	}

	if (error) {
		let title,
			msg,
			btContent = '';
		if (error.message == 'Failed to fetch') {
			title = 'Erreur';
			msg = 'Verifiez le server, veuillez reessayer plutard ! ';
			btContent = 'Reessayer';
		} else {
			title = 'Erreur';
			msg = error.message;
			btContent = 'Reessayer';
		}
		setTimeout(() => {
			setModalON(false);
		}, 60000);
		return (
			<>
				<ToastCustom
					stateToast={true}
					body={msg}
					header='Erreur'
					type='error'
					delay={5000}
				/>
			</>
		);
	}
	if (data) {
		dataGet(data);
		return (
			<>
				<ToastCustom
					stateToast={true}
					body='Mis a jour avec succes'
					header='Felicitation'
					type='success'
				/>
			</>
		);
	}

	return (
		<>
			<Modal show={openModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modification de {typeUpdate.name}</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<div className='p-field p-col-12 p-md-12'>
							<label htmlFor='lastname6'>
								Nom <i className='danger-color'>*</i>
							</label>
							<br />
							<Controller
								control={control}
								name='name'
								rules={{
									required: true,
									minLength: 3,
									maxLength: 50,
								}}
								defaultValue={typeUpdate.name}
								render={({ field }) => {
									return (
										<>
											<InputText
												autoFocus
												id='name'
												type='text'
												placeholder='Nom'
												value={field.value}
												{...field}
											/>
											<br />
											{errors.name && errors.name.type === 'required' && (
												<small className='alert-danger p-1'>
													le type de vehicule est requis !
												</small>
											)}
											{errors.name && errors.name.type === 'minLength' && (
												<small className='alert-danger p-1'>
													le type de vehicule doit avoir au moins 3
												</small>
											)}
											{errors.name && errors.name.type === 'maxLength' && (
												<small className='alert-danger p-1'>
													le type de vehicule ne doit pas depasser 50
												</small>
											)}
										</>
									);
								}}
							/>
						</div>
						<div className='p-field p-col-12 p-md-12'>
							<label htmlFor='lastname6'>
								Description <i className='danger-color'>*</i>
							</label>
							<br />
							<Controller
								control={control}
								name='description'
								rules={{
									required: true,
									minLength: 15,
									maxLength: 150,
								}}
								defaultValue={typeUpdate.description}
								render={({ field }) => {
									return (
										<>
											<InputTextarea
												autoFocus
												id={field.name}
												type='text'
												placeholder='Description'
												rows={5}
												cols={30}
												value={field.value}
												{...field}
											/>
											<br />
											{errors.description &&
												errors.description.type === 'required' && (
													<small className='alert-danger p-1'>
														La Description du type de vehicule est requis !
													</small>
												)}
											{errors.description &&
												errors.description.type === 'minLength' && (
													<small className='alert-danger p-1'>
														La Description du type doit avoir au moins 15
													</small>
												)}
											{errors.description &&
												errors.description.type === 'maxLength' && (
													<small className='alert-danger p-1'>
														La Description du type ne doit pas depasser 150
													</small>
												)}
										</>
									);
								}}
							/>
						</div>
						<div className='p-field p-col-12 p-md-9'>
							<label htmlFor='address'>
								Date debut <i className='danger-color'>*</i>
							</label>
							<br />
							<Controller
								control={control}
								name='startYear'
								defaultValue={typeUpdate.startYear}
								rules={{ required: true }}
								render={({ field }) => {
									return (
										<>
											<Dropdown
												value={field.value}
												options={getYears}
												onChange={({ value }) => field.onChange(value)}
												placeholder='Année de debut'
											/>
											<br />
											{errors.startYear &&
												errors.startYear.type === 'required' && (
													<small className='alert-danger p-1'>
														L'année de debut est requise !
													</small>
												)}
										</>
									);
								}}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<ButtonYellow title='Valider' />
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
}
