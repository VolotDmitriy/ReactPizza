import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: 0,
    sort: {
        name: 'популярности (возрастанию)',
        sortProperty: 'rating',
        sortOrder: 'asc',
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.categoryId = action.payload;
        },
    },
});

export const { setActiveCategory } = filterSlice.actions;
export default filterSlice.reducer;
