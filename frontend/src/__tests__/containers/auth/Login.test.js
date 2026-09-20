import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../../containers/auth/Login';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login Component', () => {
  let store;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }),
    });
  });

  beforeEach(() => {
    store = mockStore({
      Auth: {
        isAuthenticated: false,
        loading: false
      },
      Categories: { categories: null },
      Cart: { total_items: 0, items: [] },
      Profile: { profile: null },
      Wishlist: { items: [], item_count: 0 },
      Products: { products: [] },
      Alert: { alert: null }
    });
  });

  const renderComponent = (customStore) => {
    return render(
      <Provider store={customStore || store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders login form properly', () => {
    renderComponent();

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('displays social login buttons', () => {
    renderComponent();

    // Check for Google and Github buttons by their text
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /GitHub/i })).toBeInTheDocument();
  });

  it('redirects when user is already authenticated', () => {
    // Modify store to be authenticated
    const authStore = mockStore({
      Auth: {
        isAuthenticated: true,
        loading: false
      },
      Categories: { categories: null },
      Cart: { total_items: 0, items: [] },
      Profile: { profile: null },
      Wishlist: { items: [], item_count: 0 },
      Products: { products: [] },
      Alert: { alert: null }
    });

    // Since we use <Navigate to="/" /> when authenticated, the actual component body won't render
    const { container } = renderComponent(authStore);
    
    // Form should not be in the document
    expect(screen.queryByLabelText(/Email address/i)).not.toBeInTheDocument();
  });

  it('allows user to type in form fields', () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });

    expect(emailInput.value).toBe('test@test.com');
    expect(passwordInput.value).toBe('password123');
  });
});
