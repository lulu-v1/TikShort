import React, {useEffect, useState, useRef} from 'react';
import ScrollSnapping from "../scripts/ScrollSnapping";
import FeedbackButtons from "./FeedBackButtons";
import '../style/VideoCarousel.css';
import CommentPanel from "./CommentPanel";

const VideoCarousel = ({isDarkMode, isAutoPlay, videoUrls, user}) => {
    const [videos, setVideos] = useState([]);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const startTimeRef = useRef(null);
    const animationFrameIdRef = useRef(null);

    const voiceAudioRef = useRef(null);

    const chunkSize = 6;
    const wordDelay = 4;

    const speech = [
        '/static/voices/ttsMP3.com_VoiceText_2024-5-22_19-22-50.mp3',
        '/static/voices/ttsMP3.com_VoiceText_2024-5-22_19-25-4.mp3',
        '/static/voices/ttsMP3.com_VoiceText_2024-5-23_19-26-21.mp3',
        '/static/voices/ttsMP3.com_VoiceText_2024-5-22_19-26-10.mp3',
        '/static/voices/ttsMP3.com_VoiceText_2024-5-23_19-26-30.mp3',
        '/static/voices/ttsMP3.com_VoiceText_2024-5-22_19-27-54.mp3'
    ];


    const facts = [
        'Le cerveau humain consomme de l\'électricité : Le cerveau humain utilise environ 20 watts d\'électricité, assez pour alimenter une ampoule faible. Il constitue environ 2% du poids corporel total mais consomme 20% de l\'énergie de notre corps.',
        'Les poulpes ont trois cœurs : Deux pompent le sang aux branchies, tandis que le troisième le pompe vers le reste du corps. Leur sang est riche en cuivre, ce qui leur donne une couleur bleue.',
        'Le cri ultrasonique des chauves-souris : Les chauves-souris émettent des ultrasons à des fréquences si élevées que certains peuvent atteindre 200 000 Hz, ce qui leur permet de naviguer et de chasser dans l\'obscurité totale.',
        'L’ADN humain est à 98% identique à celui des chimpanzés : Cette proximité génétique démontre l\'évolution et l\'ascendance commune entre les espèces humaines et les primates.',
        'Les étoiles naines brunes : Les étoiles naines brunes sont des objets stellaires intermédiaires entre les planètes géantes gazeuses et les étoiles, car elles n\'ont pas assez de masse pour déclencher des réactions de fusion nucléaire.',
        'Les bananes sont légèrement radioactives : Elles contiennent du potassium-40, un isotope radioactif naturel, mais elles ne sont pas dangereuses pour la santé.',
    ];

    const durations = [];

    const loadDurations = async () => {
        const durationPromises = speech.map((src, index) => {
            return new Promise((resolve) => {
                const audio = new Audio(src);
                audio.addEventListener('loadedmetadata', () => {
                    durations[index] = audio.duration;
                    resolve();
                });
            });
        });
        await Promise.all(durationPromises);
    };

    function splitSentence(sentence, chunkSize) {
        sentence = sentence.replace(/:/g, '');
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();

        const words = sentence.split(' ');
        const chunks = [];
        for (let i = 0; i < words.length; i += chunkSize) {
            chunks.push(words.slice(i, i + chunkSize).join(' '));
        }
        const ghostWords = ' '.repeat(wordDelay);
        chunks[0] = '  ' + chunks[0];
        return chunks.map(chunk => chunk + ghostWords);
    }

    const handleTextUpdate = () => {
        const fullText = facts[focusedIndex];
        const factDuration = durations[focusedIndex];
        const chunks = splitSentence(fullText, chunkSize);

        const durationPerChunk = factDuration / chunks.length;
        const durationPerWord = durationPerChunk / (chunkSize + wordDelay);

        let elapsed = (Date.now() - startTimeRef.current) / 1000; // Elapsed time in seconds

        // Reset startTimeRef and scroll if AutoPlay is active when the full text has been displayed
        if (elapsed > (factDuration - 0.1)) {
            startTimeRef.current = Date.now();
            elapsed = 0;
            if (isAutoPlay && focusedIndex < videoUrls.length - 1) {
                setFocusedIndex(prevState => (prevState + 1));
                const targetScroll = (focusedIndex + 1) * 770;
                window.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth' // Optional: Add smooth scrolling behavior
                });
            }
        }

        const chunkToDisplay = Math.floor(elapsed / durationPerChunk);
        const endIndex = Math.floor((elapsed % durationPerChunk) / durationPerWord);
        if (chunks[chunkToDisplay]) {
            const wordsToDisplay = chunks[chunkToDisplay].split(' ').slice(0, endIndex + 1) || [];
            setCurrentText(wordsToDisplay.join(' '));
        }
    };

    const startAnimation = () => {
        startTimeRef.current = Date.now();
        const tick = () => {
            handleTextUpdate();
            animationFrameIdRef.current = requestAnimationFrame(tick);
        };
        tick();
    };

    const stopAnimation = () => {
        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
        }
    };

    const playFocusedMedia = () => {
        stopAnimation();
        startAnimation();
        const videos = document.querySelectorAll('video');
        videos.forEach((video, index) => {
            if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
                video.currentTime = 0;
                if (index !== focusedIndex && !video.paused && !video.playingFlag) {
                    video.currentTime = 0;
                    video.pause();
                }
                if (index === focusedIndex) {
                    video.playingFlag = true;
                    video.play().then(() => {
                        video.playingFlag = false;
                    }).catch((error) => {
                        video.playingFlag = false;
                        console.error('Error occurred while playing video:', error);
                    });
                }
            }
        });

        if (voiceAudioRef.current) {
            voiceAudioRef.current.pause();
            voiceAudioRef.current.loop = true;
            voiceAudioRef.current.currentTime = 0;
            setTimeout(() => {
                voiceAudioRef.current.src = speech[focusedIndex];
                voiceAudioRef.current.play().catch((error) => {
                    console.error('Error occurred while playing voice:', error);
                });
            }, 800); // Delay of 0.5 seconds
        }
    };

    useEffect(() => {
        playFocusedMedia();
    }, [focusedIndex]);

    useEffect(() => {
        loadDurations().then(() => {
        });
    });
    useEffect(() => {
        const videoElements = videoUrls.map((url, i) => (
            <video
                key={i}
                src={url}
                loop
                style={{height: '100%'}}
            />
        ));
        setVideos(videoElements);
        playFocusedMedia();
    }, [videoUrls]);
    const handleFocusedIndexChange = (index) => {
        setFocusedIndex(index);
        // Update the URL with the index
        const newUrl = `${window.location.pathname}?focusedIndex=${index}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    };

    useEffect(() => {
        // Listen for changes in the URL
        const handlePopstate = () => {
            const params = new URLSearchParams(window.location.search);
            const newIndex = parseInt(params.get('focusedIndex')) || 0;
            setFocusedIndex(newIndex);
        };
        window.addEventListener('popstate', handlePopstate);

        // Clean up the event listener
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    useEffect(() => {
        voiceAudioRef.current = new Audio();

        return () => {
            if (voiceAudioRef.current) voiceAudioRef.current.pause();
        };
    }, []);

    return (
        <main style={{overflow: 'hidden', backgroundColor: isDarkMode ? '#454546' : 'white'}}>
            <ul className="video-carousel">
                {videos.map((video, i) => (
                    <li key={i} className="content">
                        <CommentPanel index={i} user={user}/>
                        <div className="video-container">
                            {video}
                            <p className="video-text">{currentText}</p>
                        </div>
                        <FeedbackButtons index={i} isDarkMode={isDarkMode}/>
                    </li>
                ))}
            </ul>
            {/*<div style={{position: 'fixed', top: '150px'}}>Url : {JSON.stringify(videoUrls)}</div>*/}
            {/*<div style={{position:'fixed',top:'180px'}}>{isAutoPlay.toString()}</div>*/}
            <ScrollSnapping handleFocusedIndexChange={handleFocusedIndexChange}/>
        </main>
    );
};

export default VideoCarousel;
