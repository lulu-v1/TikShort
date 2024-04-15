import React, {useEffect, useState} from 'react';
import ScrollSnapping from "../scripts/ScrollSnapping";

const VideoCarousel = () => {
    const [videos, setVideos] = useState([]); // State to store video elements
    const [focusedIndex, setFocusedIndex] = useState(0); // State to store the index of the focused element
    const [currentTime, setCurrentTime] = useState(0); // State to store the current time of the video
    // Define video URLs
    const videoURLs = [
        '/static/vids/28707-371213524_tiny.mp4',
        '/static/vids/198358-907598215_tiny.mp4',
        '/static/vids/199294-909903183_small.mp4',
        '/static/vids/202560-918431383_tiny.mp4',
    ];
    const handleTimeUpdate = (event) => {
        const video = event.target;
        setCurrentTime(video.currentTime);
    };

    function PlayFocusedVideo() {
        const videos = document.querySelectorAll('video');

        videos.forEach((video, index) => {
            if (video.key !== focusedIndex)
            {
                video.pause();
            }
        });

        // Play the focused video if it exists
        if (videos.length > focusedIndex) {
            videos[focusedIndex].play();
        } else {
            console.error('Invalid focused index:', focusedIndex);
        }
    }


    useEffect(() => {
        const videoElements = videoURLs.map((url, i) => {
            return (
                <video
                    key={i}
                    src={url}
                    // autoPlay={i === focusedIndex}
                    loop
                    style={{
                        height: '100%',
                    }}
                    onTimeUpdate={handleTimeUpdate}
                />
            );
        });
        setVideos(videoElements);

        window.addEventListener('scroll', PlayFocusedVideo);


    }, [focusedIndex]);

    const handleFocusedIndexChange = (index) => {
        setFocusedIndex(index);
        setCurrentTime(0);
    };
    return (
        <div style={{overflow: 'hidden'}}>
            <ul
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {videos.map((video, i) => (
                    <li
                        key={i}
                        style={{
                            outline: 'solid black 3px',
                            borderRadius: '10px',
                            width: '420px',
                            height: '750px',
                            marginTop: '20px',
                            flexShrink: 0,
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflowX: 'hidden',
                        }}
                    >
                        {video}
                        <p
                        style={{fontSize: '3rem', position: 'absolute' }}
                        >{currentTime}</p>
                    </li>
                ))}
            </ul>
            <ScrollSnapping handleFocusedIndexChange={handleFocusedIndexChange}/>
            {/*<div style={{position: 'fixed', top: '150px'}}>index : {focusedIndex}</div>*/}
        </div>
    );
};

export default VideoCarousel;
