import React, { useState } from 'react';
import FilterCarousel from "./FilterCarousel";
import SearchBar from './SearchBar';
import DropdownMenu from './DropdownMenu'; // Make sure the import path is correct

const Header = ({ setDarkMode }) => {
    const [isSearchExpanded, setSearchExpanded] = useState(false);
    const [buttonStates, setButtonStates] = useState({
        autoplay: false,
        dark: false,
        profile: false
    });

    const handleButtonClick = (buttonName) => {
        setButtonStates(prevStates => ({
            ...prevStates,
            [buttonName]: !prevStates[buttonName]
        }));
        if (buttonName === 'dark') {
            setDarkMode(prev => !prev); // Toggle dark mode
        }
    };

    const buttonIcons = {
        autoplay: 'https://www.djoser.nl/images/uploads/cms_visual_39735.png',
        dark: 'https://www.svgrepo.com/show/445061/dark-mode-solid.svg',
        profile: 'https://www.citypng.com/public/uploads/small/116395943260tji5ordfujy44njydzhlidv8reqpmtun7ggx1oszpz1dcistzxnmag7do6vxkjxphlsgueuurkg9pkpbwgorvv9lratpxm38rp5.png'
    };

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
            <div style={{
                display: 'flex',
                minWidth: '425px',
                justifyContent: 'center'
            }}>
                <SearchBar isExpanded={isSearchExpanded} toggleSearch={() => setSearchExpanded(!isSearchExpanded)}/>
                <FilterCarousel isVisible={!isSearchExpanded}/>
            </div>
            <div className={'button-header'} style={{
                display: 'flex',
                width: '20%',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative', // Needed for absolute positioning of dropdown
            }}>
                {Object.entries(buttonIcons).map(([key, icon]) => (
                    <button
                        key={key}
                        aria-label={`${key} button`}
                        onClick={() => handleButtonClick(key)}
                        style={{
                            backgroundColor: buttonStates[key] ? 'lightpink' : 'white',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '40px',
                            boxShadow: 'grey 0px 2px 14px 0px',
                            cursor: 'pointer',
                            marginLeft: '10px',
                        }}>
                        <img
                            className={`${key}-icon`}
                            src={icon}
                            alt={`${key}`}
                            style={{
                                height: '42px',
                                verticalAlign: 'middle'
                            }}
                        />
                    </button>
                ))}
                <DropdownMenu className={'animacion-click'} show={buttonStates.profile} style={{
                    transition: 'width 1.5s ease',
                    transformOrigin: 'right',
                }}/>
            </div>
        </header>
    );
}

export default Header;
