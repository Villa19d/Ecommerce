import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Cart from '../../../containers/pages/Cart';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 10.00,
    photo: 'http://example.com/photo.jpg',
    quantity: 5
};

const mockStateWithItems = {
    Auth: {
        isAuthenticated: true,
        user: { id: 1, first_name: 'Test' }
    },
    Categories: {
        categories: []
    },
    Profile: {
        profile: null
    },
    Alert: {
        alert: null
    },
    Cart: {
        items: [{ product: mockProduct, count: 2 }],
        amount: 20.00,
        compare_amount: 30.00,
        total_items: 2
    },
    Wishlist: {
        items: [{ product: mockProduct, count: 1 }],
        total_items: 1
    }
};

const mockEmptyState = {
    Auth: {
        isAuthenticated: false,
        user: null
    },
    Categories: {
        categories: []
    },
    Profile: {
        profile: null
    },
    Alert: {
        alert: null
    },
    Cart: {
        items: [],
        amount: 0.00,
        compare_amount: 0.00,
        total_items: 0
    },
    Wishlist: {
        items: [],
        total_items: 0
    }
};

describe('Cart Container', () => {
    let store;

    const renderComponent = (state = mockStateWithItems) => {
        store = mockStore(state);
        // Mock dispatch to avoid actual thunk execution errors if any
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );
    };

    beforeEach(() => {
        // mock window.scrollTo which is called in Cart.jsx useEffect
        window.scrollTo = jest.fn();
        
        // mock window.matchMedia which is called in Navbar.js
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    it('renders empty cart correctly', () => {
        renderComponent(mockEmptyState);
        expect(screen.getByText('Shopping Cart Items (0)')).toBeInTheDocument();
        // Since there are 0 items, checkout button redirects to shop instead of checkout
        const shopLink = screen.getByRole('button', { name: /Buscar items/i }).closest('a');
        expect(shopLink).toHaveAttribute('href', '/shop');
        expect(screen.getByText('$0.00')).toBeInTheDocument(); // Order total should be 0.00 since amount is 0 (or 0 + 5 + 8.32 = 13.32 depending on static calculation)
    });

    it('renders cart with items correctly', () => {
        renderComponent(mockStateWithItems);
        expect(screen.getByText('Shopping Cart Items (2)')).toBeInTheDocument();
        expect(screen.getAllByText('Test Product')).toHaveLength(2); // 1 in cart, 1 in wishlist
        
        // Checkout button should link to /checkout
        const checkoutLink = screen.getByRole('link', { name: /Checkout/i });
        expect(checkoutLink).toHaveAttribute('href', '/checkout');
    });

    it('displays order summary calculations correctly', () => {
        renderComponent(mockStateWithItems);
        // We know amount is 20.00, so Subtotal is 20.00
        expect(screen.getByText('Subtotal').nextElementSibling.textContent).toBe('$20.00');
        // Order total = 20.00 + 5.00 + 8.32 = 33.32
        expect(screen.getByText('Order total').nextElementSibling.textContent).toBe('$33.32');
    });

    it('fetches items on mount', async () => {
        renderComponent(mockEmptyState);
        await waitFor(() => {
            // Because dispatch is mocked, we verify it was called
            expect(store.dispatch).toHaveBeenCalled();
        });
    });
});
