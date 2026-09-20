import React, { useState } from 'react';
import { StarIcon as StarSolid } from '@heroicons/react/solid';
import { StarIcon as StarOutline } from '@heroicons/react/outline';

const InteractiveStars = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex items-center space-x-1 cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
                <div
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform transform hover:scale-110"
                >
                    {star <= (hoverRating || rating) ? (
                        <StarSolid className="h-6 w-6 text-yellow-400" />
                    ) : (
                        <StarOutline className="h-6 w-6 text-gray-300 hover:text-yellow-400" />
                    )}
                </div>
            ))}
            <span className="ml-2 text-sm text-gray-500 font-medium">
                {hoverRating || rating} / 5
            </span>
        </div>
    );
};

export default InteractiveStars;
