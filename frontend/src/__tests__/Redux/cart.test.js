import cartReducer from '../../Redux/Reducers/cart';
import {
    ADD_ITEM_SUCCESS,
    GET_ITEMS_SUCCESS,
    EMPTY_CART_SUCCESS
} from '../../Redux/Actions/types';

describe('Cart Reducer', () => {
    const initialState = {
        items: null,
        amount: 0.00,
        compare_amount: 0.00,
        total_items: 0
    };

    it('should return the initial state', () => {
        expect(cartReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle ADD_ITEM_SUCCESS correctly', () => {
        const payload = {
            cart: [
                { id: 1, product: { name: 'Item 1' }, count: 1 }
            ]
        };
        const newState = cartReducer(initialState, {
            type: ADD_ITEM_SUCCESS,
            payload: payload
        });
        expect(newState.items).toEqual(payload.cart);
    });

    it('should handle GET_ITEMS_SUCCESS correctly', () => {
        const payload = {
            cart: [
                { id: 1, product: { name: 'Item 1' }, count: 1 }
            ]
        };
        const newState = cartReducer(initialState, {
            type: GET_ITEMS_SUCCESS,
            payload: payload
        });
        expect(newState.items).toEqual(payload.cart);
    });

    it('should handle EMPTY_CART_SUCCESS by resetting state', () => {
        const filledState = {
            items: [{ id: 1 }],
            amount: 100.00,
            compare_amount: 120.00,
            total_items: 1
        };
        const newState = cartReducer(filledState, { type: EMPTY_CART_SUCCESS });
        expect(newState.items).toBeNull();
        expect(newState.amount).toEqual(0.00);
        expect(newState.compare_amount).toEqual(0.00);
        expect(newState.total_items).toEqual(0);
    });
});
