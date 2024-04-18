import React from 'react';

const DropdownMenu = ({ show }) => {
    if (!show) {
        return null;
    }

    return (
       <div className={'profile-menu'} style={{
           display: 'flex',
              flexDirection: 'column',
           justifyContent: 'space-evenly',
           alignItems: 'center',
           width: '183px',
           borderRadius: '27px',
           position: 'absolute',
           height: '200px',
              top: '100px', // Adjust based on the size of your header
                right: '20px',
                backgroundColor: 'lightpink',
                boxShadow: '0px 8px 12px 5px rgba(0,0,0,0.2)',
                transition: 'width 1.5s ease',
                transformOrigin: 'right',
       }}>Profile
            <div className={'button-login'} style={{
                top: '100px', // Adjust based on the size of your header
                right: '20px',
                backgroundColor: 'white',
                boxShadow: '0px 8px 12px 5px rgba(0,0,0,0.2)',
                borderRadius: '5px',
                width: '140px',
                padding: '10px 0',
            }}>
                <button style={{
                    boxShadow: 'none',
                    width: '100%',
                    padding: '10px',
                    textAlign: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    outline: 'none'
                }}>
                    Login
                </button>
                {/* Add more buttons here if needed */}
            </div>
       </div>
    );
};

export default DropdownMenu;
