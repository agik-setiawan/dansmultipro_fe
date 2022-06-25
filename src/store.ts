import { configureStore, createSerializableStateInvariantMiddleware, isPlain, getDefaultMiddleware } from "@reduxjs/toolkit";
import jobsApi from "./features/jobs/jobs.api";
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const stores = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer
  },
  middleware: customizedMiddleware
})
export type RootState = ReturnType<typeof stores.getState>;

export default stores;