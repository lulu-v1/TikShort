import React, { useEffect, useState } from 'react';

function ScrollSnapping() {
    const [focusedIndex, setFocusedIndex] = useState(0); // State to store the index of the focused element
    const [prevScrollY, setPrevScrollY] = useState(0); // State to store the previous scroll position
    const [scrollingActive, setScrollingActive] = useState(false); // Flag to track if scrolling is active

    useEffect(() => {
        // Define snap interval size
        const snapInterval = 800; // Updated snap interval size

        // Listen for scroll events
        const handleScroll = () => {
            if (!scrollingActive) {
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
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollY, scrollingActive]);

    // Function to scroll to the focused element
    const scrollToFocusedElement = () => {
        const snapInterval = 800; // Updated snap interval size
        const targetScroll = focusedIndex * snapInterval;
        setScrollingActive(true); // Set scrolling active flag
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth' // Optional: Add smooth scrolling behavior
        });

        // After scroll animation ends, deactivate scrolling
        setTimeout(() => {
            setScrollingActive(false);
        }, 350); // Adjust timeout duration as needed to match the duration of the scroll animation
    };

    // Scroll to the focused element whenever focusedIndex changes
    useEffect(() => {
        scrollToFocusedElement();
    }, [focusedIndex]);

    return <></>;
}

export default ScrollSnapping;
