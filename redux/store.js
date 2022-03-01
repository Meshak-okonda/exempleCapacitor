import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import globalSlice from './slice/globalSlice';
import refreshSlice from './slice/refreshSlice';
import userSlice from './slice/userSlice';

export const store = configureStore({
	reducer: {
		userConnected: userSlice,
		globalState: globalSlice,
		refreshData: refreshSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),
});
