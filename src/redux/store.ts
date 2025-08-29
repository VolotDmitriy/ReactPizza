import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import filter from './slices/filterSlice';

export const store = configureStore({
    reducer: {
        filter,
        cart,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
