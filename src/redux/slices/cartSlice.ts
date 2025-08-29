import { createSlice } from '@reduxjs/toolkit';
import type { ICartObjectProps } from '../../constants/types&Interfaces';

const initialState: ICartObjectProps = {
    totalPrice: 0,
    items: [],
};

const recalcTotalPrice = (state: ICartObjectProps) => {
    state.totalPrice = state.items.reduce(
        (total, element) => total + element.item.price * element.quantity,
        0,
    );
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // The bug was caused by checking only the ID, it’s better to compare the whole object.
        addToCart: (state, action) => {
            const findItem = state.items.find(
                (element) => element.item.id === action.payload.id,
            );
            if (findItem) {
                findItem.quantity++;
            } else {
                state.items.push({
                    item: action.payload,
                    quantity: 1,
                });
            }

            recalcTotalPrice(state);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (element) => element.item.id !== action.payload,
            );

            recalcTotalPrice(state);
        },
        clearCart: (state) => {
            state.items = [];
            recalcTotalPrice(state);
        },

        increaseQuantity: (state, action) => {
            const index = state.items.findIndex(
                (obj) => obj.item.id === action.payload,
            );
            if (index !== -1) {
                state.items[index].quantity += 1;
                recalcTotalPrice(state);
            }
        },
        decreaseQuantity: (state, action) => {
            const index = state.items.findIndex(
                (obj) => obj.item.id === action.payload,
            );

            if (index !== -1) {
                if (state.items[index].quantity > 1) {
                    state.items[index].quantity -= 1;
                } else {
                    state.items.splice(index, 1);
                }
                recalcTotalPrice(state);
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
