import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { GetFrenchElementControl } from "../../hooks";
import PopOver from '../custom/PopOver';
import ButtonYellow from '../custom/ButtonYellow';
import { useMutation } from '@apollo/client';
import { UPDATE_CONTROL_VEHICLE } from '../../graphql/queries';
import ToastCustom from '../ToastCustom';

export default function PopUpVerifControlMutation({
	modalOn,
	setModalOn,
	dataControl,
	date,
	idVehicle,
	idControl,
	reset,
	setIdVehicle,
	setDate,
}) {
	const [mutation, { data, loading, error }] = useMutation(
		UPDATE_CONTROL_VEHICLE
	);
	const handleClose = () => setModalOn(false);
	const styleResum = { width: 80, textAlign: 'center', borderRadius: 5 };
	let stateVehicle = {
		damaged: 0,
		good: 0,
		missing: 0,
	};
	dataControl.map((data) => {
		if (data[data.name] && data[data.name].state) {
			switch (data[data.name].state) {
				case 'Bonne':
					stateVehicle.good += 1;
					break;
				case 'Abimé':
					stateVehicle.damaged += 1;
					break;
				case 'Manque':
					stateVehicle.missing += 1;
					break;
				default:
					break;
			}
		}
	});
	if (error) {
		setTimeout(() => {
			handleClose();
			setIdVehicle(null);
			setDate(null);
		}, 3000);
		return (
			<ToastCustom
				stateToast={true}
				body={error.message}
				header='Erreur'
				type='danger'
				delay={5000}
			/>
		);
	}

	const validateControl = () => {
		let dataFormat = {};
		dataControl.forEach((data) => {
			if (data[data.name] && data[data.name].state) {
				dataFormat[data.name] = {
					state: data[data.name].state,
				};
				data[data.name].comment
					? (dataFormat[data.name].comment = data[data.name].comment)
					: null;
				data[data.name].image
					? (dataFormat[data.name].image = data[data.name].image)
					: null;
			}
			if (data.name == 'mileage') {
				dataFormat[data.name] = data[data.name];
			}
		});
		dataFormat = {
			...dataFormat,
			stateVehicle,
			dateVerification: date,
			idVehicle,
		};
		try {
			mutation({
				variables: {
					id: idControl,
					updateVehicleVerification: dataFormat,
				},
			});
		} catch (error) {
			setModalOn(false);
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};
	const formatBody = (name, body) => {
		if (name === mileage) {
			return body;
		}
	};
	if (loading) {
		return (
			<ToastCustom
				stateToast={true}
				body='Envoi en cours'
				header='Patientez'
				type='warning'
				awaitView={true}
			/>
		);
	}
	if (!data) {
		return (
			<>
				<Modal
					show={modalOn}
					onHide={handleClose}
					fullscreen='lg-down'
					backdrop='static'>
					<Modal.Header closeButton>
						<Modal.Title id='example-custom-modal-styling-title'>
							Resumé du controle
						</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<div className='p-fluid p-formgrid p-grid mt-2'>
							<div className='p-field p-col-12 d-flex justify-content-evenly'>
								<div
									style={styleResum}
									className='bg-success d-flex justify-content-center align-items-center bold'>
									Bonne <br />
									{stateVehicle.good === 0 ? 'Aucun' : stateVehicle.good}
								</div>
								<div
									style={styleResum}
									className='bg-warning d-flex justify-content-center align-items-center bold'>
									Abimé <br />
									{stateVehicle.damaged === 0 ? 'Aucun' : stateVehicle.damaged}
								</div>
								<div
									style={styleResum}
									className='bg-danger d-flex justify-content-center align-items-center p-0 center bold'>
									Manque <br />
									{stateVehicle.missing === 0 ? 'Aucun' : stateVehicle.missing}
								</div>
							</div>
							{dataControl.map((data, key) => {
								return (
									<div
										className='p-field p-col-6 align-self-center self'
										key={key}>
										<PopOver
											buttonPlaceHolder={GetFrenchElementControl(data.name)}
											title={
												data[data.name]
													? data[data.name].state
														? data[data.name].state
														: data[data.name]
													: ''
											}
											body={data[data.name] ? data[data.name].comment : ''}
											image={data[data.name] ? data[data.name].image : ''}
										/>
									</div>
								);
							})}
						</div>
						<div className='p-grid'>
							<div className='p-col-6 p-col-align-center'>
								<ButtonYellow
									title=' Confirmez le controle '
									onClick={validateControl}
									className='mr-2 mr-5'
								/>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</>
		);
	}
	setTimeout(() => {
		handleClose();
		setIdVehicle(null);
		setDate(null);
	}, 3000);
	return (
		<ToastCustom
			stateToast={true}
			body='Controle mis a jour avec succès'
			header='Felicitation'
			type='success'
			delay={5000}
		/>
	);
}
