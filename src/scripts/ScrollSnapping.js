import React, {useEffect, useState} from 'react';

function ScrollSnapping({handleFocusedIndexChange}) {
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const snapInterval = 770;

    useEffect(() => {
        // Define snap interval size

        // Listen for scroll events
        const handleScroll = () => {
            document.getElementById('share-panel').style.display = 'none';
            const currentScrollY = window.scrollY;

            const scrollDirection = currentScrollY > prevScrollY ? 'down' : 'up';

            let focusedElementIndex;
            if (scrollDirection === 'down') {
                focusedElementIndex = Math.ceil(currentScrollY / snapInterval);
            } else {
                focusedElementIndex = Math.floor(currentScrollY / snapInterval);
            }

            setPrevScrollY(currentScrollY);
            handleFocusedIndexChange(focusedElementIndex);
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

    return (<></>);
}

export default ScrollSnapping;
