import React, { useState } from 'react';
import '../style/SharePanel.css';
import CloseButton from "./CloseButton";

const SharePanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSharePanelToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleSharePanelClose = () => {
        setIsOpen(false);
    }

    return (
        <div className="share-panel" aria-expanded={isOpen}>
            <button
                className="toggle-btn"
                onClick={handleSharePanelToggle}
                aria-label={isOpen ? "Close share panel" : "Open share panel"}
            >
                {isOpen ? <CloseButton onClick={handleSharePanelClose} /> : "Share"}
            </button>
            {isOpen && (
                <div className="share-buttons">
                    <ShareButton
                        title="Share on Facebook"
                        iconUrl="https://cdn-icons-png.flaticon.com/512/59/59439.png"
                        altText="Facebook"
                    />
                    <ShareButton
                        title="Share on Twitter"
                        iconUrl="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/twitter-icon.png"
                        altText="Twitter"
                    />
                    <ShareButton
                        title="Share on Instagram"
                        iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
                        altText="Instagram"
                    />
                    <ShareButton
                        title="Share on Reddit"
                        iconUrl="https://seeklogo.com/images/R/reddit-logo-23F13F6A6A-seeklogo.com.png"
                        altText="Reddit"
                    />
                </div>
            )}
        </div>
    );
}

const ShareButton = ({ title, iconUrl, altText }) => {
    return (
        <button className="share-btn" title={title}>
            <img src={iconUrl} alt={altText} />
        </button>
    );
}

export default SharePanel;
