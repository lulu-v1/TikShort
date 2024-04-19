import React from 'react';
import '../style/CloseButton.css';
const CloseButton = ({onClick}) => {

    return (
        <div className="close-btn"  onClick={onClick} title={'Close panel'}>
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png" alt="close-button"/>
        </div>
    );
}
export default CloseButton;