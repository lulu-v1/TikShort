import React, {startTransition, useState} from 'react';
import FilterCarousel from "./FilterCarousel";

const SearchBar = ({ isExpanded, toggleSearch }) => {
    return (
        <div style={{
            gap:  isExpanded ? '20px': '0',
            display: 'flex',
            width: isExpanded ? '100%' : '11%',
        }}>
            <button onClick={toggleSearch} style={{
                boxShadow: 'grey 0px 2px 14px 0px',
                backgroundColor: 'white',
                borderRadius: '15px',
                color: 'black',
                cursor: 'pointer',
            }}>Search
                {/* Icono de búsqueda, puede ser una imagen o un ícono de una librería */}
                <i className="fas fa-search"></i>
            </button>
            <input type="text" placeholder="Search..." style={{
                margin: ' 10px',
                width: isExpanded ? '500px' : '0', // Cambia el ancho basado en isExpanded
                visibility: isExpanded ? 'visible' : 'hidden', // Cambia la visibilidad
                height: '21px',
                padding: isExpanded ? '5px' : '0', // Cambia el padding
                borderRadius: '15px',
                border: 'none',
                transition:  'width 1.5s ease', // Agrega una transición
                transformOrigin: 'left',
            }}/>
        </div>
    );
};

export default SearchBar;
