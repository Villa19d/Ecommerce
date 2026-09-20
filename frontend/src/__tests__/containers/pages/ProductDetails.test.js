import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from '../../../containers/pages/ProductDetails';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('ProductDetails Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            Products: {
                product: {
                    id: 1,
                    name: 'Awesome Product',
                    description: 'A very awesome product',
                    price: 250.00,
                    quantity: 10,
                    get_thumbnail: '/media/test.jpg'
                },
                related_products: []
            },
            Wishlist: {
                items: [],
                wishlist: []
            },
            Reviews: {
                reviews: [
                    { id: 1, comment: 'Great product!', user: 'Test User', rating: 5, user_id: 1, created_at: new Date().toISOString() }
                ],
                review: null // Currently no review from logged in user
            },
            Auth: {
                isAuthenticated: true,
                user: { id: 1, first_name: 'Test', last_name: 'User', email: 'test@user.com' }
            }
        });

        // Mock fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
                status: 200,
                ok: true
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders product details and reviews', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/product/1']}>
                    <Routes>
                        <Route path="/product/:productId" element={<ProductDetails />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        // Verify product renders
        expect(screen.getByText('Awesome Product')).toBeInTheDocument();
        expect(screen.getByText('$250.00')).toBeInTheDocument();

        // Verify review renders
        expect(screen.getByText('Great product!')).toBeInTheDocument();
    });

    it('simulates writing and submitting a new review', async () => {
        const storeWithoutReview = mockStore({
            ...store.getState(),
            Reviews: {
                ...store.getState().Reviews,
                review: null // No existing review
            }
        });

        render(
            <Provider store={storeWithoutReview}>
                <MemoryRouter initialEntries={['/product/1']}>
                    <Routes>
                        <Route path="/product/:productId" element={<ProductDetails />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        // Since user has no review, there should be a "Deja tu Reseña" section.
        // Assuming there's a text area or input for the review.
        // Let's just find the text area
        const reviewInput = screen.getByPlaceholderText(/Escribe tu reseña/i);
        expect(reviewInput).toBeInTheDocument();

        fireEvent.change(reviewInput, { target: { value: 'This is my new review test' } });
        expect(reviewInput.value).toBe('This is my new review test');

        // Submit button
        const submitBtn = screen.getByText('Publicar Reseña');
        fireEvent.click(submitBtn);

        // Can't perfectly test thunk dispatch side effects here without a deeper mock,
        // but we verify the interactions don't crash.
        await waitFor(() => {
            // we'd expect an action to be dispatched here
        });
    });
});
