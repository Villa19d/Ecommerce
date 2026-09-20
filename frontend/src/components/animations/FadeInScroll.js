import React, { useEffect, useRef, useState } from 'react';

const FadeInScroll = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Opcional: Desconectar después de que se vuelva visible si solo quieres que anime una vez
                    observer.unobserve(domRef.current);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% is visible
            rootMargin: '0px 0px -50px 0px' // Slightly trigger before it fully hits the viewport
        });
        
        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-[1000ms] ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
        >
            {children}
        </div>
    );
};

export default FadeInScroll;
