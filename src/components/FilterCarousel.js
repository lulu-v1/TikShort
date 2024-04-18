// FilterCarousel.js
import React from 'react';

const FilterCarousel = ({ isVisible }) => {
    return (
        <div style={{
            alignItems: 'center',
            display: isVisible ? 'flex' : 'none', // Cambia display basado en isVisible
            height: '50px',
        }}>
            <ul style={{
                display: 'flex',
                overflowY: 'hidden',
                overflowX: 'auto',
                maxWidth: '525px',
                alignItems: 'center',
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',
            }}>
                {Array.from({ length: 100 }).map((_, i) => (
                    <li key={i} style={{
                        boxShadow: 'grey 0px 2px 14px 0px',
                        cursor: 'pointer',
                        marginRight: '5px',
                        backgroundColor: 'lightpink',
                        borderRadius: '50px',
                        fontSize: '1.2rem',
                        width: '100px',
                        height: '35px',
                        flexShrink: 0,
                        color: 'black',
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
