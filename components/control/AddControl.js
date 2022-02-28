import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { GetVehicles } from "../../hooks";
import FormAddControl from './FormAddControl';

export default function AddControl() {
	const [idVehicle, setIdVehicle] = useState(null);
	const [date, setDate] = useState(null);
	return (
		<>
			<div className='d-flex justify-content-between align-content-center m-1'>
				<h2 className='title m-3'>Controle du véhicule</h2>
				<div className='p-field m-3 text-right'>
					<Dropdown
						value={idVehicle}
						className='mb-1'
						options={GetVehicles()}
						onChange={({ value }) => setIdVehicle(value)}
						placeholder='Véhicule'
						style={{ marginRight: 5 }}
					/>
					{idVehicle && (
						<Calendar
							className='mb-1'
							value={date}
							dateFormat='dd/mm/yy'
							maxDate={new Date()}
							onChange={({ value }) => {
								const date = new Date(value);
								date.setDate(date.getDate() + 1);
								const dateNow = date
									.toISOString()
									.split('T')[0]
									.split('-')
									.reverse()
									.join('/');
								setDate(dateNow);
							}}
							showIcon
							placeholder='Date du controle'></Calendar>
					)}
				</div>
			</div>
			<hr />
			{idVehicle && date && (
				<FormAddControl idVehicle={idVehicle} dateControl={date} />
			)}
		</>
	);
}
