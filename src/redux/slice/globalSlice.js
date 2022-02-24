import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "globalState",
  initialState: {
    vehicles: [],
    drivers: [],
    typesVehicles: [],
    responsables: [],
    vehiclesHistory: [],
  },
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
    },
    setDrivers: (state, action) => {
      state.drivers = action.payload;
    },
    setTypesVehicles: (state, action) => {
      state.typesVehicles = action.payload;
    },
    setResponsables: (state, action) => {
      state.responsables = action.payload;
    },
    setVehiclesHistory: (state, action) => {
      state.vehiclesHistory = action.payload;
    },
    deleteVehicle: (state, action) => {
      state.vehicles = state.vehicles.filter(({ id }) => id !== action.payload);
    },
    deleteDriver: (state, action) => {
      state.drivers = state.drivers.filter(({ id }) => id !== action.payload);
    },
    deleteTypeVehicle: (state, action) => {
      state.typesVehicles = state.typesVehicles.filter(
        ({ id }) => id !== action.payload
      );
    },
    deleteResponsable: (state, action) => {
      state.responsables = state.responsables.filter(
        ({ id }) => id !== action.payload
      );
    },
    addVehicleInState: (state, action) => {
      state.vehicles = [...state.vehicles, action.payload];
    },
    addDriverInState: (state, action) => {
      state.drivers = [...state.drivers, action.payload];
    },
    AddTypeVehicleInState: (state, action) => {
      state.typesVehicles = [...state.typesVehicles, action.payload];
    },
    addResponsableInState: (state, action) => {
      state.responsables = [...state.responsables, action.payload];
    },
    updateVehicleInState: (state, action) => {
      state.vehicles = state.vehicles.map((vehicle) => {
        if (vehicle.id === action.payload.id) {
          return action.payload;
        }
        return vehicle;
      });
    },
    updateDriveInState: (state, action) => {
      state.drivers = state.drivers.map((driver) => {
        if (driver.id === action.payload.id) {
          return action.payload;
        }
        return driver;
      });
    },
    updateTypeVehicleInState: (state, action) => {
      state.typesVehicles = state.typesVehicles.map((type) => {
        if (type.id === action.payload.id) {
          return action.payload;
        }
        return type;
      });
    },
    updateResponsableInState: (state, action) => {
      state.responsables = state.responsables.map((responsable) => {
        if (responsable.id === action.payload.id) {
          return action.payload;
        }
        return responsable;
      });
    },
  },
});

// Export Actions
export const {
  setVehicles,
  setDrivers,
  setTypesVehicles,
  setResponsables,
  setVehiclesHistory,
  deleteVehicle,
  deleteDriver,
  deleteResponsable,
  deleteTypeVehicle,
  addDriverInState,
  addResponsableInState,
  addVehicleInState,
  AddTypeVehicleInState,
  updateDriveInState,
  updateResponsableInState,
  updateTypeVehicleInState,
  updateVehicleInState,
} = globalSlice.actions;

export default globalSlice.reducer;
