import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { IPizzaBlock } from '../../constants/types&Interfaces.ts';
import type { RootState } from '../store.ts';

const fetchPizzas = createAsyncThunk<
    {
        items: IPizzaBlock[];
        totalCount: number;
    },
    string,
    { state: RootState }
>(
    'pizza/fetchPizzasStatus',
    async (url: string, { rejectWithValue, getState }) => {
        try {
            const response = await axios.get<IPizzaBlock[]>(url);
            const { itemsPerPage } = getState().pizza;
            const totalCount = Math.ceil(
                parseInt(response.headers['x-total-count'] || '1', 10) /
                    itemsPerPage,
            );
            return {
                items: response.data,
                totalCount,
            };
        } catch (error) {
            console.log(error);
            return rejectWithValue('Failed to fetch pizzas');
        }
    },
);

const initialState: {
    items: IPizzaBlock[];
    status: 'loading' | 'success' | 'error';
    totalCount: number;
    itemsPerPage: number;
} = {
    items: [],
    status: 'loading',
    totalCount: 1,
    itemsPerPage: 4,
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.totalCount = action.payload.totalCount;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            });
    },
});

export const selectPizza = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export { fetchPizzas };

export default pizzaSlice.reducer;
