import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { DELETE_CONTROL } from '../graphql/queries';
import { GetFrenchElementControl } from '../hooks';
import ButtonSaveToExcel from './ButtonSaveToExcel';
import ButtonSaveToPdf from './ButtonSaveToPdf';
import ButtonTrash from './ButtonTrash';
import PopUpMutation from './PopUpMutation';
import PopOver from './PopOver';
import ViewChart from './ViewChart';
import { Toast } from 'primereact/toast';

export default function ChartsDay({ dataCharts }) {
	const { vehicles, drivers } = useSelector((state) => state.globalState);
	const [modalDelete, setModalDelete] = useState(false);
	const toast = useRef(null);
	let dataToExport = [];
	const exportColumns = [
		{ title: "Nom de l'élément", dataKey: 'name' },
		{ title: "Valeur de l'élement", dataKey: 'state' },
		{ title: 'Commentaire', dataKey: 'comment' },
	];

	const confirmMutation = (mutation) => {
		try {
			mutation();
			toast.current.show({
				severity: 'success',
				summary: 'Felicitation',
				detail: `Suppression reussi avec succès`,
			});
		} catch (error) {
			toast.current.show({
				severity: 'error',
				summary: 'Erreur',
				detail: error.networkError.message,
			});
		}
	};
	const formatExportDataForOneDayStat = (
		dataRecupSimple,
		dataRecup,
		dataRecupState
	) => {
		let dataExport = [];
		dataRecupSimple.forEach(({ name, data }) => {
			dataExport.push({
				name: GetFrenchElementControl(name)
					? GetFrenchElementControl(name)
					: name,
				state: data,
			});
		});
		dataRecup.forEach(({ name, good, missing, comment }) => {
			dataExport.push({
				name: GetFrenchElementControl(name),
				state: good ? 'Bonne' : missing ? 'Manque' : 'Abimé',
				comment: comment ? comment : '',
			});
		});
		dataExport.push({
			name: 'Total Bonne Etat',
			state: dataRecupState.good,
		});
		dataExport.push({
			name: 'Total Abimé',
			state: dataRecupState.damaged,
		});
		dataExport.push({
			name: 'Total Manque',
			state: dataRecupState.missing,
		});
		dataToExport = dataExport;
	};

	let dataRecup = [];
	let dataRecupSimple = [];
	let dataRecupState = {};
	let idControl;
	for (const property in dataCharts) {
		if (dataCharts[property] && dataCharts[property].state) {
			dataRecup.push({
				name: property,
				good: dataCharts[property].state === 'Bonne' ? 1 : null,
				missing: dataCharts[property].state === 'Manque' ? 1 : null,
				damaged: dataCharts[property].state === 'Abimé' ? 1 : null,
				comment: dataCharts[property].comment
					? dataCharts[property].comment
					: null,
				image: dataCharts[property].image ? dataCharts[property].image : null,
			});
		} else if (property === 'stateVehicle') {
			dataRecupState.good = dataCharts[property].good;
			dataRecupState.missing = dataCharts[property].missing;
			dataRecupState.damaged = dataCharts[property].damaged;
		} else if (property === 'idVehicle') {
			let vehicle = vehicles.find(
				(vehicle) => vehicle.id === dataCharts[property]
			);
			let driver = drivers.find((driver) => driver.id === vehicle.idDriver);
			dataRecupSimple.push({
				name: 'Vehicule',
				data: vehicle.name || 'Aucune donnée',
			});
			dataRecupSimple.push({
				name: 'Chauffeur Attribué',
				data:
					driver && driver.name
						? `${driver.name || ''} ${driver.lastName || ''}`
						: 'Aucune donnée',
			});
		} else if (property === 'id') {
			idControl = dataCharts[property];
		} else {
			dataRecupSimple.push({
				name: property,
				data: dataCharts[property] || '',
			});
		}
	}
	formatExportDataForOneDayStat(dataRecupSimple, dataRecup, dataRecupState);

	return (
		<>
			{dataRecup && (
				<div className='p-d-flex p-fluid p-formgrid p-grid'>
					<div className='p-col-12 p-d-flex p-fluid p-formgrid p-grid justify-content-center'>
						<div className='p-sm-12 p-md-12 p-lg-8'>
							<ViewChart
								good={dataRecupState.good}
								missing={dataRecupState.missing}
								damaged={dataRecupState.damaged}
								name='Statistique général'
								descript={true}
							/>
						</div>
						<div className='p-sm-12 p-md-12 p-lg-4'>
							{dataRecupSimple &&
								dataRecupSimple.map(({ name, data }) => {
									return (
										<div className='p-col-12 mt-3 mb-3 text-left' key={name}>
											<h3>
												{GetFrenchElementControl(name)
													? GetFrenchElementControl(name)
													: name}
											</h3>
											<p className='h6 p-warning bold'>{data}</p>
										</div>
									);
								})}

							<div className='align-self-end mr-1'>
								{idControl && (
									<div className='p-col-12 d-flex justify-content-center'>
										<ButtonTrash
											style={{
												display: 'flex',
												justifyContent: 'center',
												width: '30%',
											}}
											onClick={() => setModalDelete(true)}
										/>
									</div>
								)}
								<ButtonSaveToPdf
									title='Exporter PDF'
									formData={exportColumns}
									data={dataToExport}
									nameFile='Statistique du véhicule'
								/>
								<ButtonSaveToExcel
									title='Exporter PDF'
									data={dataToExport}
									nameFile='Statistique du véhicule'
								/>
							</div>
						</div>
					</div>
					<br />
					<div className='p-d-flex p-fluid p-formgrid p-grid'>
						{dataRecup &&
							dataRecup.map(
								(
									{ name, good, missing, damaged, value, comment, image },
									key
								) => {
									return (
										<div className='p-lg-2 p-md-4 p-sm-6' key={key}>
											<PopOver
												buttonPlaceHolder={`${GetFrenchElementControl(name)}`}
												title={good ? 'Bonne' : missing ? 'Manque' : 'Abimé'}
												body={comment}
												image={image ? image : ''}
											/>
										</div>
									);
								}
							)}
					</div>
				</div>
			)}
			{modalDelete && (
				<PopUpMutation
					query={DELETE_CONTROL(idControl)}
					setModalON={setModalDelete}
					openModal={modalDelete}
					confirmMutation={confirmMutation}
				/>
			)}
			<Toast ref={toast} />
		</>
	);
}
