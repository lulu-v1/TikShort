import React from 'react';

const SearchBar = ({ isExpanded, toggleSearch }) => {
    return (
        <div style={{
            gap: isExpanded ? '20px' : '300px',
            display: 'flex',
            width: isExpanded ? '100%' : '11%',
            transition: 'step-start, width 0.5s ease', // Añade una transición para el cambio de ancho
        }}>
            <button
                title={isExpanded ? 'Close searchBar' : 'Open searchBar'}
                onClick={toggleSearch}
                style={{
                    border: 'none',
                    boxShadow: 'grey 0px 0px 14px 0px',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    color: 'black',
                    cursor: 'pointer',
                }}
                aria-expanded={isExpanded}  // Indica si la búsqueda está expandida
                aria-controls="searchInput"  // Señala al ID del elemento controlado
            >
                <img style={{ height: '25px', padding: '8px' }} src={'https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png'} />
                <i className="fas fa-search" aria-hidden="true"></i>
            </button>
            <input
                type="text"
                id="searchInput"  // ID referenciado por aria-controls en el botón
                placeholder="Search..."
                style={{
                    margin: '10px',
                    width: isExpanded ? '550px' : '0',  // Cambia el ancho basado en isExpanded
                    visibility: isExpanded ? 'visible' : 'hidden',  // Cambia la visibilidad
                    height: '21px',
                    padding: isExpanded ? '5px' : '0',  // Cambia el padding
                    borderRadius: '15px',
                    border: 'none',
                    transition: 'width 0.5s ease, visibility 0.5s ease, padding 0.5s ease',  // Añade transiciones adicionales
                }}
                aria-hidden={!isExpanded}  // Oculta de lectores de pantalla cuando no está expandido
                tabIndex={isExpanded ? 0 : -1}  // Hace que el input sea enfocable solo cuando está expandido
            />
        </div>
    );
};

export default SearchBar;
