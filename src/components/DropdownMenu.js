import React, { useEffect, useRef } from 'react';

const DropdownMenu = ({ show, onClose, user }) => {
    const firstButtonRef = useRef(null);

    // Manage focus on open and close
    useEffect(() => {
        if (show) {
            firstButtonRef.current?.focus();  // Focus the first button when menu opens
        }
    }, [show]);

    if (!show) {
        return null;
    }

    return (
        <div className="profile-menu" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '183px',
            borderRadius: '27px',
            position: 'absolute',
            height: '200px',
            top: '100px',
            right: '20px',
            backgroundColor: 'lightpink',
            boxShadow: '0px 8px 12px 5px rgba(0,0,0,0.2)',
            transition: 'width 1.5s ease',
            transformOrigin: 'right',
            outline: 'none'
        }} aria-labelledby="profileButton"> Profile <br/> {user.username}
            <div className="button-login" style={{
                backgroundColor: 'white',
                boxShadow: '0px 8px 12px 5px rgba(0,0,0,0.2)',
                borderRadius: '5px',
                width: '140px',
                padding: '10px 0',
            }}>
                <button ref={firstButtonRef}
                        style={{
                            boxShadow: 'none',
                            width: '100%',
                            padding: '10px',
                            textAlign: 'center',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                        onClick={() => {/* Handle login functionality here */}}
                        aria-haspopup="true"
                        aria-expanded={show}
                >
                    Login
                </button>
                {/* Add more buttons here if needed */}
            </div>
        </div>
    );
};

export default DropdownMenu;
