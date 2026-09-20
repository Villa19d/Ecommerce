import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CartItem from '../../../components/cart/CartItem';

const mockItem = {
    product: {
        id: 1,
        name: 'Test Product',
        price: 10.00,
        photo: 'http://example.com/photo.jpg',
        quantity: 5
    },
    count: 1
};

const mockOutOfStockItem = {
    product: {
        id: 2,
        name: 'Out of Stock Product',
        price: 20.00,
        photo: 'http://example.com/photo.jpg',
        quantity: 0
    },
    count: 1
};

describe('CartItem Component', () => {
    let mockUpdateItem;
    let mockRemoveItem;
    let mockSetRender;
    let mockSetAlert;

    beforeEach(() => {
        mockUpdateItem = jest.fn();
        mockRemoveItem = jest.fn();
        mockSetRender = jest.fn();
        mockSetAlert = jest.fn();
    });

    const renderComponent = (item = mockItem) => {
        render(
            <MemoryRouter>
                <CartItem
                    item={item}
                    count={item.count}
                    update_item={mockUpdateItem}
                    remove_item={mockRemoveItem}
                    render={false}
                    setRender={mockSetRender}
                    setAlert={mockSetAlert}
                />
            </MemoryRouter>
        );
    };

    it('renders correctly with item details', () => {
        renderComponent();
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$ 10')).toBeInTheDocument();
        expect(screen.getByText('In Stock')).toBeInTheDocument();
        expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });

    it('renders out of stock state correctly', () => {
        renderComponent(mockOutOfStockItem);
        expect(screen.getByText('Out of Stock Product')).toBeInTheDocument();
        expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    });

    it('updates quantity successfully when within stock limits', async () => {
        renderComponent();
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: '3' } });
        
        const updateBtn = screen.getByText('Update');
        fireEvent.click(updateBtn);

        await waitFor(() => {
            expect(mockUpdateItem).toHaveBeenCalledWith(mockItem, "3");
            expect(mockSetRender).toHaveBeenCalled();
            expect(mockSetAlert).not.toHaveBeenCalled();
        });
    });

    it('shows alert when trying to update quantity beyond stock', async () => {
        renderComponent();
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: '6' } }); // stock is 5
        
        const updateBtn = screen.getByText('Update');
        fireEvent.click(updateBtn);

        await waitFor(() => {
            expect(mockSetAlert).toHaveBeenCalledWith('Not enough in stock', 'danger');
            expect(mockUpdateItem).not.toHaveBeenCalled();
        });
    });

    it('removes item successfully', async () => {
        renderComponent();
        const removeBtn = screen.getByRole('button', { name: /Remove/i });
        fireEvent.click(removeBtn);

        await waitFor(() => {
            expect(mockRemoveItem).toHaveBeenCalledWith(mockItem);
            expect(mockSetRender).toHaveBeenCalled();
        });
    });
});
