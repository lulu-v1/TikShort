import React from 'react';
import '../style/SharePanel.css';
import CloseButton from "./CloseButton";

const SharePanel = () => {
    const handleSharePanelClose = () => {
        document.getElementById('share-panel').style.display = 'none';
    }

    return (
        <div id={'share-panel'} style={{display:'none'}}>
            {/* Ensure that CloseButton receives the onClick prop */}
            {/* Make sure CloseButton component is properly implemented */}
            <CloseButton onClick={handleSharePanelClose} />
            <button className={'share-btn'}
            title={'Share on Facebook'}>
                <img src={'https://cdn-icons-png.flaticon.com/512/59/59439.png'} alt="Share on Facebook" />
            </button>
            <button className={'share-btn'}
            title={'Share on Twitter'}>
                <img src={'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/twitter-icon.png'} alt="Share on Twitter" />
            </button>
            <button className={'share-btn'}
            title={'Share on Instagram'}
            >
                <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png'} alt="Share on Instagram" />
            </button>
            <button className={'share-btn'}
            title={'Share on Reddit'}
            >
                <img src={'https://seeklogo.com/images/R/reddit-logo-23F13F6A6A-seeklogo.com.png'} alt="Share on Reddit" />
            </button>
        </div>
    );
}

export default SharePanel;
