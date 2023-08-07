'use client'

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from "./features/auth-slice";
import cartReducer from "./features/cart-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'; 
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    authReducer,
    cartReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;