import React, { useEffect, useRef, useState } from 'react';
import '../style/MusicPlayer.css';

const MusicPlayer = () => {
    const musicAudioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const musics = [
        '/static/musics/Lofi Hip Hop Chillhop Music Mix  GEMN Chill Lo fi Hip Hop Beats FREE 2022.mp3',
        '/static/musics/Djo - End of Beginning (Official Lyric Video).mp3',
        '/static/musics/Gym Class Heroes - Cupid s Chokehold (Lyrics) ft.Patrick Stump u201cTake a look at my girlfriend sheu2019s .mp3',
        '/static/musics/Larry June, Cardo & Alemán -  Big Fish (Official Video) (320).mp3',
        '/static/musics/Lay Bankz - Tell Ur Girlfriend (Lyrics) (320).mp3',
        '/static/musics/Sabrina Carpenter - Espresso (Official Audio) (320).mp3'
    ];

    useEffect(() => {
        musicAudioRef.current = new Audio(musics[0]);
        musicAudioRef.current.volume = volume;

        return () => {
            if (musicAudioRef.current) musicAudioRef.current.pause();
        };
    }, []);

    const togglePlayPause = () => {
        if (isPlaying) {
            musicAudioRef.current.pause();
        } else {
            musicAudioRef.current.play().catch((error) => {
                console.error('Error occurred while playing music audio:', error);
            });
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        musicAudioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    return (
        <div className="music-player">
            Musique d'ambiance
            <div className="music-buttons">
            <button className="play-pause-button" onClick={togglePlayPause}>
                <img src={isPlaying ? 'https://imgs.search.brave.com/UNSNN5ivUbaXy88LAz1GAjyYZG1EgSxdilCDkwBpa0c/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuZHJ5aWNvbnMu/Y29tL3VwbG9hZHMv/aWNvbi9wcmV2aWV3/Lzk4OTMvc21hbGxf/MXhfYjZkZDJhYTYt/M2RmOS00YTVmLWEw/OGEtNmIzYjEzYjE0/YzhhLnBuZw'
                    : 'https://imgs.search.brave.com/R9ZDABEUQNCOMLnmey8Yg9sO05JcRIY5HhiopC0fIlw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4w/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZ2x5cGhwYWNr/LzI5L3BsYXktMTI4/LnBuZw'} alt={"play-pause music"}/>
            </button>
            <input
                className="volume-slider"
                type="range"
                min="0"
                max=".8"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
            />
            </div>
        </div>
    );
};

export default MusicPlayer;
