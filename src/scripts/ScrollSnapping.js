import React, { useEffect, useState } from 'react';

function ScrollSnapping() {
    const [focusedIndex, setFocusedIndex] = useState(0); // State to store the index of the focused element
    const [prevScrollY, setPrevScrollY] = useState(0); // State to store the previous scroll position

    useEffect(() => {
        // Define snap interval size
        const snapInterval = 770; // Updated snap interval size

        // Listen for scroll events
        const handleScroll = () => {
                // Get current scroll position
                const currentScrollY = window.scrollY;

                // Determine scroll direction
                const scrollDirection = currentScrollY > prevScrollY ? 'down' : 'up';

                // Calculate the index of the focused element based on scroll position and direction
                let focusedElementIndex;
                if (scrollDirection === 'down') {
                    focusedElementIndex = Math.ceil(currentScrollY / snapInterval);
                } else {
                    focusedElementIndex = Math.floor(currentScrollY / snapInterval);
                }

                // Update previous scroll position
                setPrevScrollY(currentScrollY);

                // Set the focused element index
                setFocusedIndex(focusedElementIndex);
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollY]);

    // Function to scroll to the focused element
    const scrollToFocusedElement = () => {
        const snapInterval = 770; // Updated snap interval size
        const targetScroll = focusedIndex * snapInterval;
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth' // Optional: Add smooth scrolling behavior
        });
    };
    // Scroll to the focused element whenever focusedIndex changes
    useEffect(() => {
        scrollToFocusedElement();
    }, [focusedIndex]);

    return (<div style={{position:'fixed',top:'150px'}}>index{focusedIndex}<br/>prevY{prevScrollY}</div>);
}

export default ScrollSnapping;
