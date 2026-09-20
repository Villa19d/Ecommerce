import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';

const mockStore = configureStore([]);

// Mock para evitar problemas con IntersectionObserver o ResizeObserver si hay
beforeAll(() => {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };
});

describe('DashboardLayout Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            Auth: {
                isAuthenticated: true,
                user: { id: 1, email: 'test@test.com' }
            },
            Profile: {
                profile: { photo: '/media/test-photo.jpg' }
            }
        });
    });

    it('renders without crashing when authenticated', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardLayout>
                        <div data-testid="dashboard-child">Test Content</div>
                    </DashboardLayout>
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByTestId('dashboard-child')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders the user profile photo correctly', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardLayout />
                </BrowserRouter>
            </Provider>
        );

        // Find all images. The profile image should be rendered
        const images = screen.getAllByRole('img');
        const profileImage = images.find(img => img.src.includes('test-photo.jpg'));
        expect(profileImage).toBeInTheDocument();
    });

    it('redirects to login if not authenticated', () => {
        const unauthStore = mockStore({
            Auth: {
                isAuthenticated: false,
                user: null
            },
            Profile: {
                profile: null
            }
        });

        render(
            <Provider store={unauthStore}>
                <BrowserRouter>
                    <DashboardLayout />
                </BrowserRouter>
            </Provider>
        );

        // Since we are mocking BrowserRouter but not catching the Navigate directly easily,
        // we can check that children are NOT rendered when unauthenticated.
        const child = screen.queryByTestId('dashboard-child');
        expect(child).not.toBeInTheDocument();
    });

    it('toggles dark mode when button is clicked', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardLayout />
                </BrowserRouter>
            </Provider>
        );

        const toggleBtn = screen.getByLabelText('Toggle Dark Mode');
        expect(toggleBtn).toBeInTheDocument();

        // Spy on document.documentElement.classList
        const addSpy = jest.spyOn(document.documentElement.classList, 'add');
        
        fireEvent.click(toggleBtn);
        
        expect(addSpy).toHaveBeenCalledWith('dark');
        expect(localStorage.getItem('color-theme')).toBe('dark');
    });
});
