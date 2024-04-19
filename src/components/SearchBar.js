import React from 'react';

const SearchBar = ({ isExpanded, toggleSearch }) => {
    return (
        <div style={{
            gap: isExpanded ? '20px' : '300px',
            display: 'flex',
            width: isExpanded ? '100%' : '11%',
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
                aria-expanded={isExpanded}  // Indicates whether the search is expanded
                aria-controls="searchInput"  // Points to the ID of the controlled element
            >
                <img style={{height:'25px', padding:'8px'}} src={'https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png'} />
                 <i className="fas fa-search" aria-hidden="true"></i>
            </button>
            <input
                type="text"
                id="searchInput"  // ID referenced by aria-controls in the button
                placeholder="Search..."
                style={{
                    margin: '10px',
                    width: isExpanded ? '550px' : '0',  // Changes width based on isExpanded
                    visibility: isExpanded ? 'visible' : 'hidden',  // Changes visibility
                    height: '21px',
                    padding: isExpanded ? '5px' : '0',  // Changes padding
                    borderRadius: '15px',
                    border: 'none',
                    transition: 'width 0.5s ease',  // Adds a transition
                    transformOrigin: 'left',
                }}
                aria-hidden={!isExpanded}  // Hides from screen readers when not expanded
                tabIndex={isExpanded ? 0 : -1}  // Makes input focusable only when expanded
            />
        </div>
    );
};

export default SearchBar;
