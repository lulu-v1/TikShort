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
            zIndex: 10,
            color: 'white',
            height: '100px',
            padding: '0 15px',
        }}>
            <div className={'App-title'} style={{
                display: 'flex',
                width: '20%',
                alignItems: 'center',
            }}>
                <h1 style={{
                    color: 'lightpink',
                    fontSize: '3rem'
                }}>TikShort</h1>
            </div>
            {/* Contenedor para los filtros y la barra de búsqueda */}
            <div style={{
                display: 'flex',
                minWidth: '425px',
                justifyContent: 'center'
            }}>
                <SearchBar isExpanded={isSearchExpanded} toggleSearch={toggleSearch}/>
                <FilterCarousel isVisible={!isSearchExpanded}/>
            </div>

            {/* Botón de perfil en el lado derecho */}

            <div className={'button-header'} style={{
                display: 'flex',
                width: '20%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <button className={'autoplay-button'}  aria-label="Autoplay button" style={{
                    padding: '8px',
                    backgroundColor: 'white',
                    borderRadius: '40px',
                    boxShadow: 'grey 0px 2px 14px 0px',
                    cursor: 'pointer',
                    marginLeft: '10px', // Espacio entre el botón de búsqueda y perfil
                }}>
                    <img className={'autoplay-icon'}  src='https://www.djoser.nl/images/uploads/cms_visual_39735.png' alt="Autoplay"
                         style={{
                             height: '42px',
                             verticalAlign: 'middle'
                    }}/>
                </button>

                <button className={'button-dark'} aria-label="Dark button" style={{
                    border: 'none',
                    backgroundColor: 'white',
                    padding: '5px',
                    borderRadius: '40px',
                    boxShadow: 'grey 0px 2px 15px 3px',
                    cursor: 'pointer',
                }}>
                    <img className={'dark-icon'}src={'https://www.svgrepo.com/show/445061/dark-mode-solid.svg'} alt="Dark mode"
                         style={{
                             height: '50px',
                             verticalAlign: 'middle'
                         }}/>
                </button>


                <button aria-label="Profile settings" style={{
                    border: 'none',
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '5px',
                    borderRadius: '40px',
                    cursor: 'pointer',
                }}>
                    <img className={'profile-icon'} src={'https://www.citypng.com/public/uploads/small/116395943260tji5ordfujy44njydzhlidv8reqpmtun7ggx1oszpz1dcistzxnmag7do6vxkjxphlsgueuurkg9pkpbwgorvv9lratpxm38rp5.png'}
                         alt="profile icon"
                         style={{
                             height: '50px',
                             verticalAlign: 'middle'
                         }}/>
                </button>
            </div>
        </header>
    );
}

export default Header;
