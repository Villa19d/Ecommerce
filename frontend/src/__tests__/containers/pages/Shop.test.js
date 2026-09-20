import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import Shop from '../../../containers/pages/Shop';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('Shop Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            Categories: {
                categories: [
                    { id: 1, name: 'Laptops', sub_categories: [] },
                    { id: 2, name: 'Smartphones', sub_categories: [] }
                ]
            },
            Products: {
                products: [
                    { id: 1, name: 'Test Laptop', price: 999, category: { name: 'Laptops' }, get_thumbnail: '' },
                    { id: 2, name: 'Test Phone', price: 499, category: { name: 'Smartphones' }, get_thumbnail: '' }
                ],
                filtered_products: null,
                search_products: null
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders categories and products', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Shop />
                </BrowserRouter>
            </Provider>
        );

        // Check if categories render
        expect(screen.getByText('Laptops')).toBeInTheDocument();
        expect(screen.getByText('Smartphones')).toBeInTheDocument();

        // Check if products render
        expect(screen.getByText('Test Laptop')).toBeInTheDocument();
        expect(screen.getByText('Test Phone')).toBeInTheDocument();
    });

    it('shows price range filter', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Shop />
                </BrowserRouter>
            </Provider>
        );

        // Prices are rendered as radio buttons
        const priceRadios = screen.getAllByRole('radio');
        expect(priceRadios.length).toBeGreaterThan(0);
        
        // Let's check for "$1 - $19" or similar text from the prices array
        // (Assuming standard prices array from the code)
        expect(screen.getByText('Any price')).toBeInTheDocument();
    });
});
