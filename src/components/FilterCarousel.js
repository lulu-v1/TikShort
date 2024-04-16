// FilterCarousel.js
import React from 'react';

const FilterCarousel = ({ isVisible }) => {
    return (
        <div style={{
            display: isVisible ? 'flex' : 'none', // Cambia display basado en isVisible
            height: '50px',
        }}>
            <ul style={{
                display: 'flex',
                marginTop: '10px',
                overflowY: 'hidden',
                overflowX: 'auto',
                maxWidth: '525px',
                alignItems: 'center',
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',
            }}>
                {Array.from({ length: 100 }).map((_, i) => (
                    <li key={i} style={{
                        marginRight: '5px',
                        backgroundColor: 'dimgrey',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        width: '80px',
                        height: '35px',
                        flexShrink: 0,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        Button {i}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterCarousel;
