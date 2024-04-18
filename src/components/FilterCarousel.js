import React, { useState } from 'react';

const FilterCarousel = ({ isVisible }) => {
    // State para manejar los botones activos como un arreglo
    const [activeButtons, setActiveButtons] = useState([]);

    // Función para manejar el click en cada botón
    const handleButtonClick = (index) => {
        // Verificar si el botón ya está activo
        if (activeButtons.includes(index)) {
            // Si está activo, lo removemos del arreglo
            setActiveButtons(activeButtons.filter(item => item !== index));
        } else {
            // Si no está activo, lo agregamos al arreglo
            setActiveButtons([...activeButtons, index]);
        }
    };

    return (
        <div style={{
            alignItems: 'center',
            display: isVisible ? 'flex' : 'none',
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
                    }} onClick={() => handleButtonClick(i)}>
                        Button
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterCarousel;
