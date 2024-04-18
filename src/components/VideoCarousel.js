import React, {useEffect, useState} from 'react';
import ScrollSnapping from "../scripts/ScrollSnapping";

const VideoCarousel = () => {
    const [videos, setVideos] = useState([]); // State to store video elements
    const [focusedIndex, setFocusedIndex] = useState(0); // State to store the index of the focused element
    const [startIndex, setStartIndex] = useState(0); // State to store the amount of words to display
    const [currentText, setCurrentText] = useState(''); // State to store the current text of the video
    const chunkSize = 7;
    const wordDelay = 4;
    // Define video URLs
    const videoURLs = [
        '/static/vids/28707-371213524_tiny.mp4',
        '/static/vids/198358-907598215_tiny.mp4',
        '/static/vids/199294-909903183_small.mp4',
        '/static/vids/202560-918431383_tiny.mp4',
    ];

    function splitSentence(sentence, chunkSize) {
        const words = sentence.split(' ');
        const chunks = [];
        for (let i = 0; i < words.length; i += chunkSize) {
            chunks.push(words.slice(i, i + chunkSize).join(' '));
        }
        const ghostWords = ' '.repeat(wordDelay);
        chunks[0] = '  ' + chunks[0];
        return chunks.map(chunk => chunk + ghostWords);
    }

    const handleTextUpdate = (event) => {
        const fullText = 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Wesh aussi on rajoute ca';
        const video = event.target;
        const chunks =  splitSentence(fullText, chunkSize);



        const durationPerTrunk = video.duration / chunks.length;
        const durationPerWord = durationPerTrunk / (chunkSize+wordDelay);

        const trunkToDisplay = Math.floor(video.currentTime / durationPerTrunk);
        const endIndex = Math.floor((video.currentTime % durationPerTrunk) / durationPerWord);
        const wordsToDisplay = chunks[trunkToDisplay].split(' ').slice(0, endIndex + 1);
        setCurrentText(wordsToDisplay.join(' '));
    };


    function PlayFocusedVideo() {
        setStartIndex(0);
        const videos = document.querySelectorAll('video');
        videos.forEach((video, index) => {
            if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
                video.currentTime = 0;
                if (index !== focusedIndex && !video.paused) {
                    video.pause();
                }
                videos[focusedIndex].play();
            }
        });

    }

    useEffect(() => {
        const videoElements = videoURLs.map((url, i) => {
            return (
                <video
                    key={i}
                    src={url}
                    loop
                    style={{
                        height: '100%',
                    }}
                    onTimeUpdate={handleTextUpdate}
                />
            );
        });
        setVideos(videoElements);

        window.addEventListener('scroll', PlayFocusedVideo);

        return () => {
            window.removeEventListener('scroll', PlayFocusedVideo);
        }
    }, [focusedIndex]);

    const handleFocusedIndexChange = (index) => {
        setFocusedIndex(index);
    };

    return (
        <main style={{overflow: 'hidden'}}>
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
                            borderRadius: '10px',
                            width: '450px',
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
                            style={{fontSize: '2.5rem',fontWeight:'bold', position: 'absolute', width: '250px'}}
                        >{currentText}</p>
                    </li>
                ))}
            </ul>
            <ScrollSnapping handleFocusedIndexChange={handleFocusedIndexChange}/>
            <div style={{position: 'fixed', top: '150px'}}>index : {focusedIndex}</div>
        </main>
    );
};

export default VideoCarousel;
