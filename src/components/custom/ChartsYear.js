import React from 'react';
import ButtonSaveToExcel from './ButtonSaveToExcel';
import ButtonSaveToPdf from './ButtonSaveToPdf';
import { useSelector } from 'react-redux';
import { GetFrenchElementControl, GetMonthInFrench } from '../hooks';
import ViewChartsYear from './ViewChartsYear';

export default function ChartsYear({ dataCharts, idVehicle, year }) {
	const { vehicles, drivers } = useSelector((state) => state.globalState);
	let dataFormat = {};
	let dataStat = [];
	let dataRecupSimple = [];
	let dataToExport = [];
	let vehicleName = '';
	let dataKeyExport = [];
	let statusExistData = false;
	dataCharts.forEach(({ month }) => {
		dataKeyExport.push({
			title: `${GetMonthInFrench(month).substr(0, 3)}`,
			dataKey: `${month}`,
		});
	});
	const exportColumns = [
		{ title: 'Elément', dataKey: 'name' },
		...dataKeyExport,
	];

	function compare(a, b) {
		const genreA = a.name.toUpperCase();
		const genreB = b.name.toUpperCase();
		let comparison = 0;
		if (genreA > genreB) {
			comparison = 1;
		} else if (genreA < genreB) {
			comparison = -1;
		}
		return comparison;
	}

	function formatDataElementControlToExport(listElementControl) {
		for (const property in listElementControl) {
			const name = GetFrenchElementControl(property);
			let valueProperty = {};
			listElementControl[property].forEach(
				({ name, good, missing, damaged }) => {
					valueProperty[name] = `${good}|${damaged}|${missing}`;
				}
			);
			dataToExport.push({ name, ...valueProperty });
		}
	}

	function formatStatGeneralControlToExport(dataStatGen) {
		let good = {};
		let damaged = {};
		let missing = {};
		for (let i = 0; i < dataStatGen.length; i++) {
			good[dataStatGen[i].name] = dataStatGen[i].good;
			damaged[dataStatGen[i].name] = dataStatGen[i].damaged;
			missing[dataStatGen[i].name] = dataStatGen[i].missing;
			if (
				dataStatGen[i].good >= 0 &&
				dataStatGen[i].damaged >= 0 &&
				dataStatGen[i].missing >= 0
			)
				statusExistData = true;
		}
		dataToExport.push({
			name: 'Element Bonne Etat Total',
			...good,
		});
		dataToExport.push({
			name: 'Element Abimé Total',
			...damaged,
		});
		dataToExport.push({
			name: 'Element Manquant Total',
			...missing,
		});
	}

	function formatDataExport(listElementControl, dataStatGen) {
		formatDataElementControlToExport(listElementControl);
		formatStatGeneralControlToExport(dataStatGen);
	}

	if (dataCharts) {
		let mileage = '';
		dataCharts.map(({ month, dataMonth }) => {
			if (dataMonth) {
				for (const property in dataMonth) {
					if (
						dataMonth[property] &&
						(dataMonth[property].good ||
							dataMonth[property].damaged ||
							dataMonth[property].missing) &&
						property !== 'stateVehicle'
					) {
						if (!dataFormat[property]) {
							dataFormat[property] = [];
						}
						dataFormat[property].push({
							name: month,
							good: dataMonth[property].good,
							damaged: dataMonth[property].damaged,
							missing: dataMonth[property].missing,
						});
					} else if (property === 'stateVehicle') {
						dataStat.push({
							name: month,
							...dataMonth[property],
						});
					} else if (property === 'mileage') {
						mileage = `${dataMonth[property]}`;
					}
				}
			}
		});
		let vehicle = vehicles.find((vehicle) => vehicle.id === idVehicle);
		if (vehicle) {
			vehicleName = vehicle.name;
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
		}
		dataRecupSimple.push({
			name: 'mileage',
			data: `${mileage} KM au dernier jour`,
		});
		dataRecupSimple.push({
			name: 'Anné de statistique',
			data: `${year}`,
		});
		formatDataExport(dataFormat, dataStat);
	}

	if (!statusExistData)
		return (
			<div className='control-not-found p-col-12'>
				<div className='error'>
					<div className='container-floud'>
						<div className='col-xs-12 ground-color text-center'>
							<div className='container-error-404'>
								<div className='clip'>
									<div className='shadow'>
										<span className='digit thirdDigit'>X</span>
									</div>
								</div>
								<div className='clip'>
									<div className='shadow'>
										<span className='digit secondDigit'>X</span>
									</div>
								</div>
								<div className='clip'>
									<div className='shadow'>
										<span className='digit firstDigit'>X</span>
									</div>
								</div>
								<div className='msg'>
									OH!<span className='triangle'></span>
								</div>
							</div>
							<h2 className='h1'>
								Desolé ! Aucun control existant durant la periode !
							</h2>
						</div>
					</div>
				</div>
			</div>
		);

	return (
		<div className='p-col-12'>
			<div className='p-col-12 p-d-flex p-fluid p-formgrid p-grid justify-content-center'>
				<div className='p-sm-12 p-md-12 p-lg-9 p-col-12'>
					<div className='p-sm-12 p-md-12 p-lg-12'>
						<ViewChartsYear
							data={dataStat.sort(compare)}
							name='Statistique général'
							global={true}
						/>
					</div>
					<div className='p-col-12'>
						<ButtonSaveToPdf
							title='Exporter PDF'
							formData={exportColumns}
							data={dataToExport}
							nameFile={`Statistique du véhicule (${vehicleName}) en ${year}`}
						/>
						<ButtonSaveToExcel
							title='Exporter PDF'
							data={dataToExport}
							nameFile={`Statistique du véhicule (${vehicleName}) en ${year}`}
						/>
					</div>
				</div>
				<div className='p-sm-12 p-md-6 p-lg-3'>
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
				</div>
			</div>

			<hr />
			<div className='p-d-flex p-fluid p-formgrid p-grid p-col-12 justify-content-between'>
				{Object.keys(dataFormat).map((data, key) => {
					return (
						<div
							className='p-sm-12 p-md-12 p-lg-6 pt-2 pb-3 mt-1 mb-1 chart-shadow'
							key={key}>
							<ViewChartsYear
								data={dataFormat[data].sort(compare)}
								name={
									GetFrenchElementControl(data)
										? GetFrenchElementControl(data)
										: data
								}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
