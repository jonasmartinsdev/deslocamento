import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { clientApi, } from "./queries/clientApi";
import { driverApi } from "./queries/driverApi";
import { displacementApi } from "./queries/displacementApi";
import { vehicleApi } from "./queries/vehicleApi";


export const store = () => configureStore({
  reducer: {
    drawer: (state = false, action) => {
      switch (action.type) {
        case 'TOGGLE_DRAWER':
          return !state
        default:
          return state
      }
    },
    [driverApi.reducerPath]: driverApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [displacementApi.reducerPath]: displacementApi.reducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
  },
  middleware: (gDM) => gDM().concat([
    clientApi.middleware,
    driverApi.middleware,
    displacementApi.middleware,
    vehicleApi.middleware,
    ]),
})

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(store)