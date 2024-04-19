import React, {useState} from 'react';

const FilterCarousel = ({isVisible}) => {
    const [activeButtons, setActiveButtons] = useState([]);

    const categories = [
        'Art', 'Books', 'Business', 'Comedy',
        'Education', 'Entertainment', 'Fashion',
        'Food', 'Gaming', 'Health', 'History',
        'Home', 'How-to', 'Music',
        'News', 'Politics', 'Science',
        'Sports', 'Tech', 'Travel'];

const handleButtonClick = (index) => {
    const updatedActiveButtons = activeButtons.includes(index)
        ? activeButtons.filter(item => item !== index)
        : [...activeButtons, index];
    setActiveButtons(updatedActiveButtons);
};

return (
    <div style={{
        display: isVisible ? 'flex' : 'none',
        alignItems: 'center',
        height: '50px',
        overflow: 'hidden', // Ensure overflow doesn't trap keyboard focus
    }} aria-label="Filter options" role="navigation">
        <ul style={{
            display: 'flex',
            listStyleType: 'none', // Remove default list style
            overflowX: 'auto', // Allow scrollable content
            maxWidth: '525px',
            padding: 0, // Remove default padding
            margin: 0, // Align properly within container
            alignItems: 'center',
        }}>
            {Array.from({length: 20}).map((_, i) => (
                <li key={i} style={{
                    cursor: 'pointer',
                    marginRight: '5px',
                    backgroundColor: activeButtons.includes(i) ? 'lightpink' : '#dedede',
                    borderRadius: '50px',
                    fontSize: '1.2rem',
                    width: '100px',
                    height: '35px',
                    flexShrink: 0,
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: 'none' // For focus styles, avoid default outlines
                }}
                    onClick={() => handleButtonClick(i)}
                    tabIndex={0} // Make each button focusable
                    aria-pressed={activeButtons.includes(i)} // Communicate toggle state
                    role="button" // Explicitly set the role for each item
                >
                    {categories[i]}
                </li>
            ))}
        </ul>
    </div>
);
}
;

export default FilterCarousel;
