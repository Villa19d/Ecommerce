import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import WishlistItem from '../../../components/cart/WishlistItem';

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

describe('WishlistItem Component', () => {
    let mockRemoveWishlistItem;
    let mockAddItem;
    let mockSetRender;
    let mockSetAlert;

    beforeEach(() => {
        mockRemoveWishlistItem = jest.fn();
        mockAddItem = jest.fn();
        mockSetRender = jest.fn();
        mockSetAlert = jest.fn();
    });

    const renderComponent = (item = mockItem) => {
        render(
            <MemoryRouter>
                <WishlistItem
                    item={item}
                    count={item.count}
                    remove_wishlist_item={mockRemoveWishlistItem}
                    add_item={mockAddItem}
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
        expect(screen.getByRole('button', { name: /Agregar a carrito/i })).toBeInTheDocument();
    });

    it('renders out of stock state correctly', () => {
        renderComponent(mockOutOfStockItem);
        expect(screen.getByText('Out of Stock Product')).toBeInTheDocument();
        expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    });

    it('adds item to cart successfully when within stock limits', async () => {
        renderComponent();
        
        const addBtn = screen.getByRole('button', { name: /Agregar a carrito/i });
        fireEvent.click(addBtn);

        await waitFor(() => {
            expect(mockAddItem).toHaveBeenCalledWith(mockItem.product);
            expect(mockSetRender).toHaveBeenCalled();
            expect(mockSetAlert).toHaveBeenCalledWith('Artículo agregado al carrito', 'success');
        });
    });

    it('shows alert when trying to add out of stock item to cart', async () => {
        renderComponent(mockOutOfStockItem);
        
        const addBtn = screen.getByRole('button', { name: /Agregar a carrito/i });
        fireEvent.click(addBtn);

        await waitFor(() => {
            expect(mockSetAlert).toHaveBeenCalledWith('El artículo está agotado', 'danger');
            expect(mockAddItem).not.toHaveBeenCalled();
        });
    });

    it('removes item successfully', async () => {
        renderComponent();
        const removeBtn = screen.getByRole('button', { name: /Remove/i });
        fireEvent.click(removeBtn);

        await waitFor(() => {
            expect(mockRemoveWishlistItem).toHaveBeenCalledWith(mockItem.product.id);
            expect(mockSetRender).toHaveBeenCalled();
        });
    });
});
