import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { JobsApi } from "./Jobs";
import { SkillsApi } from "./Skills";
import AppStatus from "./AppStatus";

const store = configureStore({
  reducer: {
    AppStatus: AppStatus,
    [JobsApi.reducerPath]: JobsApi.reducer,
    [SkillsApi.reducerPath]: SkillsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(JobsApi.middleware)
      .concat(SkillsApi.middleware)
});
setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
