import {configureStore,combineReducers} from '@reduxjs/toolkit';
import {apiSlice} from "../features/api/apiSlice";
import authReducer from  "../features/auth/authSlice";
import {persistReducer,persistStore} from "redux-persist"
import storage from "./storage"

const persistConfig={
    key:"auth",//storage key
    storage,
    whitelist:["auth"],
}
console.log("test")
const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  });

const persistedReducer=persistReducer(persistConfig,rootReducer)

// Configure the store with the persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(apiSlice.middleware),
  });

export const persistor=persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;