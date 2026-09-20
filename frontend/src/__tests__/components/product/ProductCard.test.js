import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../../components/product/ProductCard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ProductCard Component', () => {
    let store;

    const mockProduct = {
        id: 1,
        name: 'Test Product',
        price: 100.00,
        get_thumbnail: '/media/test.jpg'
    };

    beforeEach(() => {
        store = mockStore({
            Wishlist: {
                items: [
                    { product: { id: 1 } } // Product 1 is in wishlist
                ]
            }
        });
    });

    it('renders product details correctly', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductCard product={mockProduct} />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$100.00')).toBeInTheDocument();
    });

    it('renders red heart if product is in wishlist', () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductCard product={mockProduct} />
                </BrowserRouter>
            </Provider>
        );

        // We find the heart button and check its color.
        // Assuming red heart uses text-red-500
        const heartButton = container.querySelector('button svg');
        expect(heartButton).toHaveClass('text-red-500');
    });

    it('renders gray outline heart if product is not in wishlist', () => {
        const otherProduct = { ...mockProduct, id: 2 };
        
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductCard product={otherProduct} />
                </BrowserRouter>
            </Provider>
        );

        const heartButton = container.querySelector('button svg');
        expect(heartButton).not.toHaveClass('text-red-500');
        expect(heartButton).toHaveClass('text-slate-400'); // Assuming this is the default
    });
});
