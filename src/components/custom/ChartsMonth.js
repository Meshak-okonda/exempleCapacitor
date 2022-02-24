import React from 'react';
import ButtonSaveToExcel from './ButtonSaveToExcel';
import ButtonSaveToPdf from './ButtonSaveToPdf';
import ViewChartsSegement from './ViewChartsSegement';
import { useSelector } from 'react-redux';
import { GetFrenchElementControl, GetMonthInFrench } from '../hooks';
import PopOver from './PopOver';
export default function ChartsMonth({ dataCharts }) {
	const { vehicles, drivers } = useSelector((state) => state.globalState);
	let dataFormat = {};
	let dataStat = [];
	let dataRecupSimple = [];
	let dataToExport = [];
	let listDate = [];
	let vehicleName = '';
	const exportColumns = [{ title: "Nom de l'élément", dataKey: 'name' }];
	function formatDataElementControlToExport(listElementControl) {
		for (const property in listElementControl) {
			const name = GetFrenchElementControl(property);
			let valueProperty = {};
			listElementControl[property].map(({ name, good, missing, damaged }) => {
				valueProperty[name.split('/')[0]] = good ? 'B' : missing ? ' M' : 'A';
			});
			dataToExport.push({ name: name.split('/')[0], ...valueProperty });
		}
	}

	function formatStatGeneralControlToExport(dataStatGen) {
		let good = {};
		let damaged = {};
		let missing = {};
		for (let i = 0; i < dataStatGen.length; i++) {
			good[dataStatGen[i].name.split('/')[0]] = dataStatGen[i].good;
			damaged[dataStatGen[i].name.split('/')[0]] = dataStatGen[i].damaged;
			missing[dataStatGen[i].name.split('/')[0]] = dataStatGen[i].missing;
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
	function compareDataKey(a, b) {
		const genreA = a.dataKey.toUpperCase();
		const genreB = b.dataKey.toUpperCase();
		let comparison = 0;
		if (genreA > genreB) {
			comparison = 1;
		} else if (genreA < genreB) {
			comparison = -1;
		}
		return comparison;
	}

	function formatDataExport(dataHeader, listElementControl, dataStatGen) {
		exportColumns.push(
			...dataHeader
				.map((element) => {
					return {
						title: `${element.split('/')[0]}`,
						dataKey: element.split('/')[0],
					};
				})
				.sort(compareDataKey)
		);
		formatDataElementControlToExport(listElementControl);
		formatStatGeneralControlToExport(dataStatGen);
	}
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

	if (dataCharts) {
		let mileage = '';
		dataCharts.map((dataDayValue) => {
			for (const property in dataDayValue) {
				if (
					dataDayValue[property] &&
					dataDayValue[property].state &&
					property !== 'stateVehicle'
				) {
					if (!dataFormat[property]) {
						dataFormat[property] = [];
					}
					dataFormat[property].push({
						name: dataDayValue['dateVerification'],
						good: dataDayValue[property].state === 'Bonne' ? 1 : 0,
						damaged: dataDayValue[property].state === 'Abimé' ? 1 : 0,
						missing: dataDayValue[property].state === 'Manque' ? 1 : 0,
						comment: dataDayValue[property].comment
							? dataDayValue[property].comment
							: null,
						image: dataDayValue[property].image
							? dataDayValue[property].image
							: null,
					});
				} else if (property === 'stateVehicle') {
					dataStat.push({
						name: dataDayValue['dateVerification'],
						...dataDayValue[property],
					});
				} else if (property === 'idVehicle') {
					if (dataRecupSimple && dataRecupSimple.length < 1) {
						let vehicle = vehicles.find(
							(vehicle) => vehicle.id === dataDayValue[property]
						);
						if (vehicle) {
							vehicleName = vehicle.name;
							let driver = drivers.find(
								(driver) => driver.id === vehicle.idDriver
							);
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
					}
				} else {
					if (property === 'dateVerification') {
						listDate.push(dataDayValue[property]);
					} else if (property === 'mileage') {
						mileage = `${dataDayValue[property]}`;
					} else {
						if (
							dataRecupSimple &&
							dataRecupSimple.length < 3 &&
							property !== 'id'
						) {
							dataRecupSimple.push({
								name: property,
								data: dataDayValue[property] || 'Aucune donnée',
							});
						}
					}
				}
			}
		});
		dataRecupSimple.push({
			name: 'mileage',
			data: `${mileage} KM au dernier jour`,
		});
		dataRecupSimple.push({
			name: 'Mois',
			data: `${GetMonthInFrench(listDate[0].split('/')[1])} ${
				listDate[0].split('/')[2]
			}`,
		});
		formatDataExport(listDate, dataFormat, dataStat);
	}
	return (
		<div className='p-col-12'>
			<div className='p-col-12 p-d-flex p-fluid p-formgrid p-grid justify-content-center'>
				<div className='p-sm-12 p-md-12 p-lg-9 p-col-12'>
					<div className='p-sm-12 p-md-12 p-lg-12'>
						<ViewChartsSegement
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
							nameFile={`Statistique du véhicule (${vehicleName})`}
						/>
						<ButtonSaveToExcel
							title='Exporter PDF'
							data={dataToExport}
							nameFile={`Statistique du véhicule (${vehicleName})`}
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
			<div className='p-d-flex p-fluid p-formgrid p-grid p-col-12'>
				{Object.keys(dataFormat).map((data, key) => {
					return (
						<div
							className='p-sm-12 p-md-12 p-lg-6 pt-2 pb-3 mt-1 mb-1 chart-shadow'
							key={key}>
							<ViewChartsSegement
								data={dataFormat[data].sort(compare)}
								name={
									GetFrenchElementControl(data)
										? GetFrenchElementControl(data)
										: data
								}
							/>
							<div className='p-d-flex p-fluid p-formgrid p-grid p-col-12  mt-2'>
								{dataFormat[data]
									.sort(compare)
									.map(
										({ comment, image, name, good, missing, damaged }, key) => {
											return (
												(comment || image) && (
													<div className='p-col' key={key}>
														<PopOver
															buttonPlaceHolder={name.substr(0, 2)}
															title={
																good ? 'Bonne' : missing ? 'Manque' : 'Abimé'
															}
															body={` ${comment}`}
															image={image}
														/>
													</div>
												)
											);
										}
									)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
