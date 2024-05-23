import React, {useState} from 'react';
import FilterCarousel from "./FilterCarousel";
import SearchBar from './SearchBar';
import DropdownMenu from './DropdownMenu'; // Ensure correct import path

const Header = ({setDarkMode, setAutoPlay}) => {
    const [isSearchExpanded, setSearchExpanded] = useState(false);
    const [buttonStates, setButtonStates] = useState({
        autoplay: false,
        dark: false,
        profile: false
    });

    // Toggle button state and manage dark mode toggle
    const handleButtonClick = (buttonName) => {
        setButtonStates(prevStates => ({
            ...prevStates,
            [buttonName]: !prevStates[buttonName]
        }));
        if (buttonName === 'dark') {
            setDarkMode(prev => !prev); // Toggle dark mode
        }
        if (buttonName === 'autoplay') {
            setAutoPlay(prev => !prev); // Toggle autoplay
        }
    };

    const buttonIcons = {
        autoplay: 'https://imgs.search.brave.com/IaPB3_IsvTafCj387jUXMHgBUzir8ok_fjAxnu97Ivg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNTMzNi8xNTMz/NjE5Ny5wbmc_c2Vt/dD1haXNfaHlicmlk',
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
                <h1 title={'Title'} style={{
                    cursor: 'pointer',
                    color: 'lightpink',
                    fontSize: '3rem',
                    margin: 0 // Ensuring no unexpected spacing
                }}>TikShort</h1>
            </div>
            <div style={{
                display: 'flex',
                minWidth: '300px',
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
                position: 'relative', // For absolute positioning of dropdown
            }}>
                {Object.entries(buttonIcons).map(([key, icon]) => (
                    <button
                        key={key}
                        aria-label={`${key} button`}
                        aria-expanded={key === 'profile' ? buttonStates[key] : undefined}
                        onClick={() => handleButtonClick(key)}
                        title={'Button ' + key}
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
                            alt={`${key} icon`}
                            style={{
                                height: '42px',
                                verticalAlign: 'middle'
                            }}
                        />
                    </button>
                ))}
                <DropdownMenu show={buttonStates.profile}/>
            </div>
        </header>
    );
}

export default Header;
