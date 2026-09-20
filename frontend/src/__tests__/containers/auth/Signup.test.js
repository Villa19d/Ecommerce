import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../../../containers/auth/Signup';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Signup Component', () => {
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
          <Signup />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders signup form properly', () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  it('displays social signup buttons', () => {
    renderComponent();

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

    renderComponent(authStore);
    
    // Form should not be in the document
    expect(screen.queryByPlaceholderText(/Email address/i)).not.toBeInTheDocument();
  });

  it('allows user to type in form fields', () => {
    renderComponent();

    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    const emailInput = screen.getByPlaceholderText(/Email address/i);

    fireEvent.change(firstNameInput, { target: { name: 'first_name', value: 'John' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'john@example.com' } });

    expect(firstNameInput.value).toBe('John');
    expect(emailInput.value).toBe('john@example.com');
  });
});
