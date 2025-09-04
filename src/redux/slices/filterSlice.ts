import { createSlice } from '@reduxjs/toolkit';
import qs from 'qs';
import { options } from '../../constants/Options.ts';
import type { RootState } from '../store.ts';

const initialState = () => {
    if (window.location.search) {
        const params = qs.parse(window.location.search.substring(1));
        const sort = options.find((obj) => obj.sortProperty === params._sort);
        return {
            categoryId: Number(params.category),
            sort: sort || options[0],
            currentPage: Number(params._page),
        };
    }

    return {
        searchValue: '',
        categoryId: 0,
        currentPage: 1,
        sort: {
            name: 'популярности (возрастанию)',
            sortProperty: 'rating',
            sortOrder: 'asc',
        },
    };
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.categoryId = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterSort = (state: RootState) => state.filter.sort;

export const { setActiveCategory, setSort, setCurrentPage, setSearchValue } =
    filterSlice.actions;
export default filterSlice.reducer;
