// FeedbackButtons.js

import React, {useState} from 'react';
import '../style/FeedbackButtons.css'; // Import CSS file for styling
const FeedbackButtons = () => {
    // State to manage the toggle state of buttons 1 and 2
    const [button1Active, setButton1Active] = useState(false);
    const [button2Active, setButton2Active] = useState(false);

    // Function to handle click on button 1
    const handleButton1Click = () => {
        setButton1Active(!button1Active);
        // If button 1 is clicked, deactivate button 2
        if (button2Active) {
            setButton2Active(false);
        }
    };

    // Function to handle click on button 2
    const handleButton2Click = () => {
        setButton2Active(!button2Active);
        // If button 2 is clicked, deactivate button 1
        if (button1Active) {
            setButton1Active(false);
        }
    };

    return (
        <div className="feedback-container">
            <button
                className={`feedback-button ${button1Active ? 'active' : 'inactive'}`}
                onClick={handleButton1Click}
            >
                <img className={'like-btn'}
                     src={'https://icons.veryicon.com/png/o/miscellaneous/yuanql/icon-like.png'}/>
            </button>
            <button
                className={`feedback-button ${button2Active ? 'active' : 'inactive'}`}
                onClick={handleButton2Click}
            >
                <img className={'like-btn'} src={'https://cdn-icons-png.flaticon.com/512/880/880613.png'}/>
            </button>
            <button className="feedback-button">
                <img className={'like-btn'} src={'https://cdn-icons-png.flaticon.com/512/2497/2497827.png'}/>
            </button>
            <button className="feedback-button">
                <img className={'like-btn'} src={'https://static-00.iconduck.com/assets.00/share-icon-256x238-1v6dh0eg.png'}/>
            </button>
        </div>
    );
}

export default FeedbackButtons;
