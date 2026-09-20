import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Alert from '../../components/alert';

const mockStore = configureStore([]);

describe('Alert Component', () => {
    it('renders without crashing when there is no alert', () => {
        const store = mockStore({
            Alert: {
                alert: null
            }
        });

        const { container } = render(
            <Provider store={store}>
                <Alert />
            </Provider>
        );

        expect(container.firstChild).toBeNull();
    });

    it('renders the alert message when alert state is present', () => {
        const store = mockStore({
            Alert: {
                alert: {
                    type: 'red',
                    msj: 'This is a test error message'
                }
            }
        });

        render(
            <Provider store={store}>
                <Alert />
            </Provider>
        );

        // Alert title should be visible
        expect(screen.getByText('This is an Alert')).toBeInTheDocument();
        
        // Alert message should be visible
        expect(screen.getByText('This is a test error message')).toBeInTheDocument();
    });
});
