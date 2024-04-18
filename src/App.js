import VideoCarousel from './components/VideoCarousel'; // Import the AdvancedCarousel component
import Header from './components/Header'; // Import the Header component
import React, { useState } from 'react';

const App = () => {
    const [isDarkMode, setDarkMode] = useState(false);

    return (
        <div>
            <Header setDarkMode={setDarkMode} />
            <VideoCarousel isDarkMode={isDarkMode} />
        </div>
    );
};

export default App;
