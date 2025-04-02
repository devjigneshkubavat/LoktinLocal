import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import reduxStorage from "./reduxStorage";
import createSagaMiddleware from "redux-saga";
import rootSaga from "@/redux/sagas";
import authReducer from "../redux/slices/authSlice";
import userReducer from "../redux/slices/userSlice";
import planReducer from "../redux/slices/planSlice";
const sagaMiddleware = createSagaMiddleware();
import cartReducer from "../redux/slices/cartSlice";
import chatReducer from "../redux/slices/chatSlice";
import postReducer from "../redux/slices/postSlice";
import updateSecuritiesSlice from "../redux/slices/updateSecuritiesSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: reduxStorage,
};

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  cart: cartReducer,
  plan: planReducer,
  chat: chatReducer,
  post: postReducer,
  updateSecuritiesSaga: updateSecuritiesSlice,
});
const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STATE") {
    state = undefined; // Reset state
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
