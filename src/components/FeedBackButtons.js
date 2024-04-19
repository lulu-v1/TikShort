import React, {useState} from 'react';
import '../style/FeedbackButtons.css'; // Import CSS file for styling
const FeedbackButtons = ({index},{isDarkMode}) => {
    // State to manage the toggle state of buttons 1 and 2
    const [likeButton, setLikeButton] = useState(false);
    const [dislikeButton, setDislikeButton] = useState(false);

    // Function to handle click on button 1
    const handleLikeClick = () => {
        setLikeButton(!likeButton);
        // If button 1 is clicked, deactivate button 2
        if (dislikeButton) {
            setDislikeButton(false);
        }
    };

    // Function to handle click on button 2
    const handleDislikeClick = () => {
        setDislikeButton(!dislikeButton);
        // If button 2 is clicked, deactivate button 1
        if (likeButton) {
            setLikeButton(false);
        }
    };

    const handleShareClick = () => {
        document.getElementById('share-panel').style.display === 'flex' ? document.getElementById('share-panel').style.display = 'none' : document.getElementById('share-panel').style.display = 'flex';
    }
    const handleCommentClick = () => {
        const commentPanels = document.getElementsByClassName('comment-panel');
        const commentPanel = commentPanels[index]; // Get the comment panel corresponding to the index
        const feedbackContainers = document.getElementsByClassName(`feedback-container`);
        const feedbackContainer = feedbackContainers[index]; // Get the feedback container corresponding to the index
        if (commentPanel.classList.contains('open')) {
            commentPanel.classList.remove('open');
            commentPanel.classList.add('close');
            feedbackContainer.classList.remove('comment-open');
        } else {
            commentPanel.classList.add('open');
            commentPanel.classList.remove('close');
            feedbackContainer.classList.add('comment-open');
        }
    };

    return (
        <div className="feedback-container"
        key={index}
        >
            <button
                title={'Like'}
                className={`feedback-button ${likeButton ? 'active' : 'inactive'}`}
                onClick={handleLikeClick}
            >
                <img className={'like-btn'}
                     src={'https://icons.veryicon.com/png/o/miscellaneous/yuanql/icon-like.png'}/>
            </button>
            <p className={'counter ' + (isDarkMode ? 'dark' : 'light')}>
                15K</p>
            <button
                title={'Dislike'}
                className={`feedback-button ${dislikeButton ? 'active' : 'inactive'}`}
                onClick={handleDislikeClick}
            >
                <img className={'like-btn'} src={'https://cdn-icons-png.flaticon.com/512/880/880613.png'}/>
            </button>
            <p className={'counter ' + (isDarkMode ? 'dark' : 'light')}>
                358</p>
            <button
                title={'Comment'}
                className="feedback-button"
                onClick={handleCommentClick}
            >
                <img className={'like-btn'} src={'https://cdn-icons-png.flaticon.com/512/2497/2497827.png'}/>
            </button>
            <p className={'counter ' + (isDarkMode ? 'dark' : 'light')}>
            152</p>
            <button
                title={'Share'}
                className="feedback-button"
                onClick={handleShareClick}
            >
                <img className={'like-btn'}
                     src={'https://static-00.iconduck.com/assets.00/share-icon-256x238-1v6dh0eg.png'}/>
            </button>
        </div>
    );
}

export default FeedbackButtons;
