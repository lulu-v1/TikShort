import VideoCarousel from './components/VideoCarousel'; // Import the AdvancedCarousel component
import SharePanel from "./components/SharePanel";
import Header from './components/Header'; // Import the Header component
import React, { useState } from 'react';
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
    const [isDarkMode, setDarkMode] = useState(false);
    const [isAutoPlay, setAutoPlay] = useState(false);

    return (
        <div>
            <Header setDarkMode={setDarkMode} setAutoPlay={setAutoPlay} />
            <VideoCarousel isDarkMode={isDarkMode} isAutoPlay={isAutoPlay} />
            <SharePanel />
            <MusicPlayer />
        </div>
    );
};

export default App;
