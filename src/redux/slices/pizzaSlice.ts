import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { type AxiosResponse } from 'axios';
import type { IPizzaBlock } from '../../constants/types&Interfaces.ts';

const fetchPizzas = createAsyncThunk<AxiosResponse<IPizzaBlock[]>, string>(
    'pizza/fetchPizzasStatus',
    async (url: string, { rejectWithValue }) => {
        try {
            return await axios.get<IPizzaBlock[]>(url);
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
                state.items = action.payload.data;

                const countOfItems = action.payload.headers['x-total-count'];
                if (countOfItems) {
                    const count = parseInt(countOfItems, 10);
                    state.totalCount = Math.ceil(count / state.itemsPerPage);
                } else state.totalCount = 1;

                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            });
    },
});

export const { setItems } = pizzaSlice.actions;
export { fetchPizzas };

export default pizzaSlice.reducer;
