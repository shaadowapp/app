import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ThemeReducer from './ThemeSlice';
import userSlice from "./userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

let persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

let rootReducer = combineReducers({
    theme: ThemeReducer,
    users: userSlice
})

let persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store