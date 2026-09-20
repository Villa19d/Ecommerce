import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CommentItem from '../../../components/reviews/CommentItem';

describe('CommentItem Component', () => {
    const mockUser = {
        id: 1,
        first_name: 'Auth',
        last_name: 'User',
        email: 'auth@user.com'
    };

    const mockReview = {
        id: 10,
        user: 'Auth User',
        user_id: 1, // Matches logged in user
        comment: 'This is a test comment',
        created_at: new Date().toISOString(),
        rating: 4,
        is_edited: false
    };

    const mockOtherUserReview = {
        ...mockReview,
        user_id: 2, // Different user
        user: 'Other User'
    };

    it('renders comment details correctly', () => {
        render(<CommentItem review={mockReview} user={mockUser} productId={1} />);
        
        expect(screen.getByText('This is a test comment')).toBeInTheDocument();
        expect(screen.getByText('Auth User')).toBeInTheDocument();
    });

    it('shows edit and delete buttons for the author of the comment', () => {
        render(<CommentItem review={mockReview} user={mockUser} productId={1} />);
        
        // Find buttons by aria-label or text. The component uses icons usually
        // The component has "Eliminar comentario" and "Editar comentario" in titles
        expect(screen.getByTitle('Editar comentario')).toBeInTheDocument();
        expect(screen.getByTitle('Eliminar comentario')).toBeInTheDocument();
    });

    it('hides edit and delete buttons for non-authors', () => {
        render(<CommentItem review={mockOtherUserReview} user={mockUser} productId={1} />);
        
        // Buttons should not exist
        expect(screen.queryByTitle('Editar comentario')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Eliminar comentario')).not.toBeInTheDocument();
    });

    it('renders 100 replies without crashing (Edge Case)', () => {
        // Create 100 replies
        const replies = Array.from({ length: 100 }).map((_, i) => ({
            id: 1000 + i,
            user_name: `Sub User ${i}`,
            user_id: 3,
            comment: `This is reply number ${i}`,
            date_created: new Date().toISOString(),
            is_edited: false
        }));

        const reviewWith100Replies = {
            ...mockReview,
            replies: replies,
            replies_count: 100
        };

        const { container } = render(
            <CommentItem review={reviewWith100Replies} user={mockUser} productId={1} handleGetReplies={jest.fn()} />
        );
        
        // Ensure "100 respuestas" button is rendered
        const viewRepliesBtn = screen.getByText(/100 respuestas/i);
        expect(viewRepliesBtn).toBeInTheDocument();
        
        // Click to expand
        fireEvent.click(viewRepliesBtn);

        // Check if all 100 replies are rendered
        expect(screen.getByText('This is reply number 0')).toBeInTheDocument();
        expect(screen.getByText('This is reply number 99')).toBeInTheDocument();

        // Ensure performance doesn't hard crash the test renderer
        // The fact that the assertions pass means it rendered successfully.
    });
});
