import { gql } from '@apollo/client';


export const CONNECTION_DRIVER = (name, password) => {
  return gql`
    query{
  connectionDriver (name: "${name}", password: "${password}") {
      id
      name
      lastName
      password
      licenseValidity
      email
      phone
      image
      age
      sex
      createdAt
    delete
  }
}`;
};

export const GET_VEHICLES = gql`
  query GetVehicles {
    getVehicles {
      idDriver
      id
      name
      model
      serie
      image
      color
      stratYear
      registrationNumber
      power
      delete
    }
  }
`;

export const GET_VEHICLES_NAME_BY_ID = (id) => gql`
	query GetVehicle {
		getVehicle(id: "${id}") {
			name
		}
	}
`;

export const REFRESH_ALL_DATA = gql`
  query {
    getVehicles {
      id
      idDriver
      name
      model
      serie
      gpsData
      image
      color
      startYear
      registrationNumber
      power
      delete
    }
  }
`;


export const VERIFICATION_VEHICLE_ADD = gql`
	subscription VerificationVehicleAdded {
		VerificationVehicleAdded {
			idVehicle
			stateVehicle {
				good
				damaged
				missing
			}
		}
	}
`;
export const CREATE_DRIVER = gql`
	mutation CreateDriver($driver: DriverInput) {
		createDriver(driver: $driver) {
			id
			name
			password
			lastName
			licenseValidity
			phone
			email
			image
			age
			sex
			delete
		}
	}
`;

export const DELETE_DRIVER = (id) => {
	return gql`
		mutation {
			deleteDriver(id: "${id}") {
				id
				name
				password
				lastName
				licenseValidity
				email
				phone
				image
				age
				sex
				delete
			}
		}
	`;
};

export const UPDATE_DRIVER = gql`
  mutation UpdateDriver($updateDriverId: String!, $driver: DriverInput) {
    updateDriver(id: $updateDriverId, driver: $driver) {
      id
      name
      lastName
      password
      licenseValidity
      email
      phone
      image
      age
      sex
      delete
    }
  }
`;

export const CREATE_RESPONSABLE = gql`
  mutation CreateResponsable($responsable: ResponsableInput) {
    createResponsable(responsable: $responsable) {
      id
      name
      lastName
      password
      email
      phone
      age
      image
      addVehicle
      upVehicle
      delVehicle
      addDriver
      upDriver
      delDriver
      addResponsable
      upResponsable
      delResponsable
      sex
      createdAt
      delete
    }
  }
`;

export const DELETE_RESPONSABLE = (id) => {
	return gql`
		mutation {
			deleteResponsable(id: "${id}") {
				id
				name
				lastName
				password
				email
				phone
				image
				age
				sex
				delete
			}
		}
	`;
};

export const UPDATE_RESPONSABLE = gql`
  mutation UpdateResponsable(
    $updateResponsableId: String!
    $responsable: ResponsableInput
  ) {
    updateResponsable(id: $updateResponsableId, responsable: $responsable) {
      id
      name
      lastName
      password
      email
      phone
      image
      superAdm
      addVehicle
      upVehicle
      delVehicle
      addDriver
      upDriver
      delDriver
      addResponsable
      upResponsable
      delResponsable
      age
      sex
      createdAt
      delete
    }
  }
`;

export const CREATE_CONTROL_VEHICLE = gql`
	mutation CreateVehicleVerification(
		$vehicleVerification: VerificationVehicleInput
	) {
		createVehicleVerification(vehicleVerification: $vehicleVerification) {
			id
			idVehicle
			honk {
				state
				image
				comment
			}
			motor {
				state
				image
				comment
			}
			stopLight {
				state
				image
				comment
			}
			startUp {
				state
				image
				comment
			}
			handBrake {
				state
				image
				comment
			}
			stricken {
				state
				image
				comment
			}
			siegeState {
				state
				image
				comment
			}
			ceilingState {
				state
				image
				comment
			}
			windshieldConditionAV {
				state
				image
				comment
			}
			windshieldConditionAR {
				state
				image
				comment
			}
			carStateOut {
				state
				image
				comment
			}
			carStateIn {
				state
				image
				comment
			}
			shockAbsorbersAV {
				state
				image
				comment
			}
			shockAbsorbersAR {
				state
				image
				comment
			}
			brakingSystem {
				state
				image
				comment
			}
			radioAndReader {
				state
				image
				comment
			}
			reserveTire {
				state
				image
				comment
			}
			leftAndRightTireAV {
				state
				image
				comment
			}
			leftAndRightTireAR {
				state
				image
				comment
			}
			gironfardOperation {
				state
				image
				comment
			}
			flashingOperationAV {
				state
				image
				comment
			}
			flashingOperationAR {
				state
				image
				comment
			}
			warningLightsOperation {
				state
				image
				comment
			}
			windshieldWipers {
				state
				image
				comment
			}
			mechanismOperation {
				state
				image
				comment
			}
			cric {
				state
				image
				comment
			}
			wheelWrench {
				state
				image
				comment
			}
			cricRemover {
				state
				image
				comment
			}
			mileage
			dateVerification
			stateVehicle {
				damaged
				good
				missing
			}
		}
	}
`;

export const UPDATE_CONTROL_VEHICLE = gql`
	mutation updateVehicleVerification(
		$id: String!
		$updateVehicleVerification: VerificationVehicleInput
	) {
		updateVehicleVerification(
			id: $id
			updateVehicleVerification: $updateVehicleVerification
		) {
			honk {
				state
				image
				comment
			}
			mileage
			dateVerification
			stateVehicle {
				damaged
				good
				missing
			}
		}
	}
`;

export const GET_ONE_DAY_CONTROL_VEHICLE = (idVehicle, dateVerification) => {
	return gql`
		query {
			getVehicleVerificationElementsOfOneDay(
				idVehicle: "${idVehicle}",
				dateVerification: "${dateVerification}"
			) {
				id
				idVehicle
				mileage
				dateVerification
				honk {
					state
					image
					comment
				}
				motor {
					state
					image
					comment
				}
				stopLight {
					state
					image
					comment
				}
				startUp {
					state
					image
					comment
				}
				handBrake {
					state
					image
					comment
				}
				stricken {
					state
					image
					comment
				}
				siegeState {
					state
					image
					comment
				}
				ceilingState {
					state
					image
					comment
				}
				windshieldConditionAV {
					state
					image
					comment
				}
				windshieldConditionAR {
					state
					image
					comment
				}
				carStateOut {
					state
					image
					comment
				}
				carStateIn {
					state
					image
					comment
				}
				shockAbsorbersAV {
					state
					image
					comment
				}
				shockAbsorbersAR {
					state
					image
					comment
				}
				brakingSystem {
					state
					image
					comment
				}
				radioAndReader {
					state
					image
					comment
				}
				reserveTire {
					state
					image
					comment
				}
				leftAndRightTireAV {
					state
					image
					comment
				}
				leftAndRightTireAR {
					state
					image
					comment
				}
				gironfardOperation {
					state
					image
					comment
				}
				flashingOperationAV {
					state
					image
					comment
				}
				flashingOperationAR {
					state
					image
					comment
				}
				warningLightsOperation {
					state
					image
					comment
				}
				windshieldWipers {
					state
					image
					comment
				}
				mechanismOperation {
					state
					image
					comment
				}
				cric {
					state
					image
					comment
				}
				wheelWrench {
					state
					image
					comment
				}
				cricRemover {
					state
					image
					comment
				}
				stateVehicle {
					damaged
					good
					missing
				}
			}
		}
	`;
};

export const GET_VERIFIED_ONE_DAY_CONTROL_VEHICLE = (
	idVehicle,
	dateVerification
) => {
	return gql`
		query {
			getVerifiedVerificationElementsOfOneDay(
				idVehicle: "${idVehicle}",
				dateVerification: "${dateVerification}"
			) {
				id
			}
		}
	`;
};
export const DELETE_CONTROL = (id) => {
	return gql`
	mutation {
		deleteVehicleVerification(id: "${id}") {
		id
		}
	}
	`;
};

export const GET_RANGE_STATISTIC_CONTROL = (id, range) => {
	return gql`
		query {
			getVehicleVerificationElementsByRange(
				idVehicle: "${id}",
				range: "${range}"
			) {
				id
				idVehicle
				mileage
				dateVerification
				honk {
					state
					image
					comment
				}
				motor {
					state
					image
					comment
				}
				stopLight {
					state
					image
					comment
				}
				startUp {
					state
					image
					comment
				}
				handBrake {
					state
					image
					comment
				}
				stricken {
					state
					image
					comment
				}
				siegeState {
					state
					image
					comment
				}
				ceilingState {
					state
					image
					comment
				}
				windshieldConditionAV {
					state
					image
					comment
				}
				windshieldConditionAR {
					state
					image
					comment
				}
				carStateOut {
					state
					image
					comment
				}
				carStateIn {
					state
					image
					comment
				}
				shockAbsorbersAV {
					state
					image
					comment
				}
				shockAbsorbersAR {
					state
					image
					comment
				}
				brakingSystem {
					state
					image
					comment
				}
				radioAndReader {
					state
					image
					comment
				}
				reserveTire {
					state
					image
					comment
				}
				leftAndRightTireAV {
					state
					image
					comment
				}
				leftAndRightTireAR {
					state
					image
					comment
				}
				gironfardOperation {
					state
					image
					comment
				}
				flashingOperationAV {
					state
					image
					comment
				}
				flashingOperationAR {
					state
					image
					comment
				}
				warningLightsOperation {
					state
					image
					comment
				}
				windshieldWipers {
					state
					image
					comment
				}
				mechanismOperation {
					state
					image
					comment
				}
				cric {
					state
					image
					comment
				}
				wheelWrench {
					state
					image
					comment
				}
				cricRemover {
					state
					image
					comment
				}
				stateVehicle {
					damaged
					good
					missing
				}
			}
		}
	`;
};

export const GET_MONTH_STATISTIC_CONTROL = (id, month) => {
	return gql`
		query {
			getVehicleVerificationElementsByMonth(
				idVehicle: "${id}",
				month: "${month}"
			) {
				id
				idVehicle
				mileage
				dateVerification
				honk {
					state
					image
					comment
				}
				motor {
					state
					image
					comment
				}
				stopLight {
					state
					image
					comment
				}
				startUp {
					state
					image
					comment
				}
				handBrake {
					state
					image
					comment
				}
				stricken {
					state
					image
					comment
				}
				siegeState {
					state
					image
					comment
				}
				ceilingState {
					state
					image
					comment
				}
				windshieldConditionAV {
					state
					image
					comment
				}
				windshieldConditionAR {
					state
					image
					comment
				}
				carStateOut {
					state
					image
					comment
				}
				carStateIn {
					state
					image
					comment
				}
				shockAbsorbersAV {
					state
					image
					comment
				}
				shockAbsorbersAR {
					state
					image
					comment
				}
				brakingSystem {
					state
					image
					comment
				}
				radioAndReader {
					state
					image
					comment
				}
				reserveTire {
					state
					image
					comment
				}
				leftAndRightTireAV {
					state
					image
					comment
				}
				leftAndRightTireAR {
					state
					image
					comment
				}
				gironfardOperation {
					state
					image
					comment
				}
				flashingOperationAV {
					state
					image
					comment
				}
				flashingOperationAR {
					state
					image
					comment
				}
				warningLightsOperation {
					state
					image
					comment
				}
				windshieldWipers {
					state
					image
					comment
				}
				mechanismOperation {
					state
					image
					comment
				}
				cric {
					state
					image
					comment
				}
				wheelWrench {
					state
					image
					comment
				}
				cricRemover {
					state
					image
					comment
				}
				stateVehicle {
					damaged
					good
					missing
				}
			}
		}
	`;
};

export const GET_YEAR_STATISTIC_CONTROL = (id, year) => {
	return gql`
		query {
			getVehicleVerificationElementsByYear(
				idVehicle: "${id}",
				year: "${year}"
			) {
				month
				dataMonth {
					stateVehicle {
						good
						damaged
						missing
					}
					honk {
						good
						damaged
						missing
					}
					motor {
						good
						damaged
						missing
					}
					stopLight {
						good
						damaged
						missing
					}
					mileage
					cricRemover {
						missing
						damaged
						good
					}
					startUp {
						missing
						damaged
						good
					}
					handBrake {
						good
						damaged
						missing
					}
					stricken {
						good
						damaged
						missing
					}
					siegeState {
						good
						damaged
						missing
					}
					ceilingState {
						missing
						damaged
						good
					}
					windshieldConditionAV {
						missing
						damaged
						good
					}
					windshieldConditionAR {
						missing
						damaged
						good
					}
					carStateOut {
						damaged
						missing
						good
					}
					carStateIn {
						missing
						damaged
						good
					}
					shockAbsorbersAV {
						good
						damaged
						missing
					}
					shockAbsorbersAR {
						missing
						damaged
						good
					}
					brakingSystem {
						missing
						damaged
						good
					}
					radioAndReader {
						missing
						damaged
						good
					}
					reserveTire {
						good
						damaged
						missing
					}
					leftAndRightTireAV {
						good
						damaged
						missing
					}
					leftAndRightTireAR {
						missing
						damaged
						good
					}
					gironfardOperation {
						missing
						damaged
						good
					}
					flashingOperationAV {
						good
						damaged
						missing
					}
					flashingOperationAR {
						good
						damaged
						missing
					}
					warningLightsOperation {
						missing
						damaged
						good
					}
					windshieldWipers {
						missing
						damaged
						good
					}
					mechanismOperation {
						missing
						damaged
						good
					}
					cric {
						missing
						damaged
						good
					}
					wheelWrench {
						missing
						damaged
						good
					}
				}
			}
		}
	`;
};
