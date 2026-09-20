import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import DashboardProfile from '../../../containers/pages/DashboardProfile';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

beforeAll(() => {
  window.matchMedia = window.matchMedia || function() {
    return { matches: false, addListener: function() {}, removeListener: function() {} };
  };
  window.scrollTo = jest.fn(); // Mock scroll as it's used in the component on submit
});

describe('DashboardProfile Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            Auth: {
                isAuthenticated: true,
                user: { id: 1, email: 'test@test.com' }
            },
            Profile: {
                profile: { 
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'test@test.com',
                    address_line_1: '123 Test St',
                    city: 'Test City',
                    photo: '/media/users/test.jpg'
                }
            },
            Orders: {
                orders: [
                    { transaction_id: 'abc-123', status: 'Procesado', amount: '100.00', address_line_1: '123 Test St', date_issued: '2026-09-19T10:00:00Z' }
                ]
            }
        });

        // Mock fetch or other calls if actions hit the API
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

    it('renders the user profile data correctly', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardProfile />
                </BrowserRouter>
            </Provider>
        );

        // Check placeholders or values
        expect(screen.getByPlaceholderText('John')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument();
        expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
        
        // Orders section
        expect(screen.getByText(/Pedido #abc-123/i)).toBeInTheDocument();
    });

    it('handles input changes and submits form', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardProfile />
                </BrowserRouter>
            </Provider>
        );

        const firstNameInput = screen.getByLabelText(/Nombre/i);
        fireEvent.change(firstNameInput, { target: { value: 'Jane', name: 'first_name' } });
        
        expect(firstNameInput.value).toBe('Jane');

        // Form submit
        const submitBtn = screen.getByText('Guardar Cambios');
        fireEvent.click(submitBtn);

        await waitFor(() => {
            // Check if actions were dispatched or scrollTo was called
            expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
        });
    });

    it('renders empty orders list correctly', () => {
        const emptyStore = mockStore({
            Auth: { isAuthenticated: true },
            Profile: { profile: null },
            Orders: { orders: [] }
        });

        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <DashboardProfile />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('No tienes pedidos recientes.')).toBeInTheDocument();
    });
});
