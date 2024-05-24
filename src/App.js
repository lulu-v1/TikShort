import VideoCarousel from './components/VideoCarousel'; // Import the AdvancedCarousel component
import SharePanel from "./components/SharePanel";
import axios from 'axios';

import Header from './components/Header'; // Import the Header component
import React, {useEffect, useState} from 'react';
import MusicPlayer from "./components/MusicPlayer";

const App = () => {


    const [isDarkMode, setDarkMode] = useState(false);
    const [isAutoPlay, setAutoPlay] = useState(false);
    const [videoUrls, setVideoUrls] = useState([]);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/user/1');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };


        fetchUser().then(r => {
            console.log("User fetched : ",r);

        });
    }, []); // Empty dependency array ensures this runs once after the initial render
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // Fetch video data from your database
                const response = await axios.get('http://localhost:3001/api/videos');
                setVideoUrls(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos().then(r => {
            console.log("Videos fetched : ", r);
        });
    }, []);
    return (
        <div>
            <Header setDarkMode={setDarkMode} setAutoPlay={setAutoPlay} user={user} />
            <VideoCarousel isDarkMode={isDarkMode} isAutoPlay={isAutoPlay} videoUrls={videoUrls} user={user}/>
            <SharePanel />
            <MusicPlayer />
        </div>
    );
};

export default App;
