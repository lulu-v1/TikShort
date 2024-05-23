import React, { useState } from 'react';
import '../style/SharePanel.css';
import CloseButton from './CloseButton';

const SharePanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSharePanelToggle = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleSharePanelClose = () => {
        document.getElementById('share-panel').style.display === 'flex' ? document.getElementById('share-panel').style.display = 'none' : document.getElementById('share-panel').style.display = 'flex';
    };

    return (
        <div id="share-panel" aria-expanded={isOpen}>
            <CloseButton onClick={handleSharePanelClose} />
            <ShareButton
                title="Share on Facebook"
                iconUrl="https://cdn-icons-png.flaticon.com/512/59/59439.png"
                altText="Facebook"
                onClick={handleSharePanelClose}
            />
            <ShareButton
                title="Share on Twitter"
                iconUrl="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/twitter-icon.png"
                altText="Twitter"
                onClick={handleSharePanelClose}
            />
            <ShareButton
                title="Share on Instagram"
                iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
                altText="Instagram"
                onClick={handleSharePanelClose}
            />
            <ShareButton
                title="Share on Reddit"
                iconUrl="https://seeklogo.com/images/R/reddit-logo-23F13F6A6A-seeklogo.com.png"
                altText="Reddit"
                onClick={handleSharePanelClose}
            />
        </div>
    );
};

const ShareButton = ({ title, iconUrl, altText, onClick }) => {
    return (
        <button className="share-btn" title={title} onClick={onClick}>
            <img src={iconUrl} alt={altText} />
        </button>
    );
};

export default SharePanel;
