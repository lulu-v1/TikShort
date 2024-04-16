// Header.js
import React, { useState } from 'react';
import FilterCarousel from "./FilterCarousel";
import SearchBar from './SearchBar';

const Header = () => {
    const [isSearchExpanded, setSearchExpanded] = useState(false);
    const toggleSearch = () => setSearchExpanded(!isSearchExpanded);

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'black',
            color: 'white',
            height: '100px',
            padding: '0 15px',
        }}>
            <h1 style={{ fontSize: '3rem' }}>TikShort</h1>

            {/* Contenedor para los filtros y la barra de búsqueda */}
            <div style={{
                gap: '50px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <SearchBar isExpanded={isSearchExpanded} toggleSearch={toggleSearch} />
                <FilterCarousel isVisible={!isSearchExpanded} />
            </div>

            {/* Botón de perfil en el lado derecho */}
            <button aria-label="Profile settings"  style={{
                border: 'none',
                backgroundColor: 'lightsteelblue',
                color: 'black',
                padding: '10px',
                borderRadius: '40px',
                width: '7%',
                cursor: 'pointer',
                marginLeft: '10px', // Espacio entre el botón de búsqueda y perfil
            }}>
                Profile
                <i className="fas fa-user" aria-hidden="true"></i> {/* Icono de perfil */}
            </button>
        </header>
    );
}

export default Header;
