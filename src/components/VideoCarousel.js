import React, {useEffect, useState, useRef} from 'react';
import ScrollSnapping from "../scripts/ScrollSnapping";
import FeedbackButtons from "./FeedBackButtons";
import '../style/VideoCarousel.css';
import CommentPanel from "./CommentPanel";

const VideoCarousel = ({isDarkMode}) => {
    const [videos, setVideos] = useState([]);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const startTimeRef = useRef(null);
    const animationFrameIdRef = useRef(null);

    const chunkSize = 5;
    const wordDelay = 4;

    const videoURLs = [
        '/static/vids/28707-371213524_tiny.mp4',
        '/static/vids/198358-907598215_tiny.mp4',
        '/static/vids/11856385-uhd_2160_3840_25fps.mp4',
        '/static/vids/18724815-hd_1080_1920_40fps.mp4',
        '/static/vids/20770858-hd_1080_1920_30fps.mp4',
        '/static/vids/6060027-uhd_2160_3840_25fps.mp4'
    ];

    const speech = [
        '/static/voices/ttsMP3.com_VoiceText_2024-5-22_19-27-54.mp3',
        '/static/voices/ttsMP3.com_VoiceText_2024-5-22_19-27-17.mp3',
        '/static/voices/ttsMP3.com_VoiceText_2024-5-22_19-26-10.mp3',
        '/static/voices/ttsMP3.com_VoiceText_2024-5-22_19-25-49.mp3',
        '/static/voices/ttsMP3.com_VoiceText_2024-5-22_19-25-4.mp3',
        '/static/voices/ttsMP3.com_VoiceText_2024-5-22_19-22-50.mp3'
    ]
    const facts = [
        'Le cerveau humain consomme de l\'électricité : Le cerveau humain utilise environ 20 watts d\'électricité, assez pour alimenter une ampoule faible. Il constitue environ 2% du poids corporel total mais consomme 20% de l\'énergie de notre corps.',
        'Les poulpes ont trois cœurs : Deux pompent le sang aux branchies, tandis que le troisième le pompe vers le reste du corps. Leur sang est riche en cuivre, ce qui leur donne une couleur bleue.',
        'La vitesse de la lumière dans le vide est de 299 792 458 mètres par seconde : Cette constante universelle est utilisée dans de nombreux domaines scientifiques, y compris la physique et l\'astronomie.',
        'L’ADN humain est à 98% identique à celui des chimpanzés : Cette proximité génétique démontre l\'évolution et l\'ascendance commune entre les espèces humaines et les primates.',
        'La tomate est un fruit : Botaniquement parlant, les tomates sont des fruits car elles se développent à partir de l\'ovaire d\'une fleur et contiennent des graines.',
        'Les bananes sont légèrement radioactives : Elles contiennent du potassium-40, un isotope radioactif naturel, mais elles ne sont pas dangereuses pour la santé.',
        // 'Le miel ne se périme jamais : Des pots de miel vieux de 3000 ans ont été trouvés dans des tombes égyptiennes, toujours comestibles grâce à ses propriétés antibactériennes naturelles.',
        // 'La gravité n\'est pas uniforme partout sur Terre : En raison de la rotation de la Terre et de sa forme géoïde, la force de gravité varie légèrement selon les endroits.',
        // 'Le son se déplace plus rapidement dans l\'eau que dans l\'air : Il se propage environ quatre fois plus vite dans l\'eau, à cause de la densité et de l\'élasticité de l\'eau.',
        // 'Le mont Everest grandit chaque année : En raison des plaques tectoniques, le mont Everest gagne environ 4 millimètres de hauteur chaque année.',
        // 'Les cellules du corps humain se régénèrent constamment : Par exemple, les cellules de la peau se régénèrent environ toutes les 27 jours, tandis que les cellules de l\'estomac se renouvellent tous les 5 jours.',
        // 'L’Univers est composé à 68% d’énergie noire : Cette forme mystérieuse d\'énergie est responsable de l\'expansion accélérée de l\'Univers.',
        // 'La plus grande structure vivante sur Terre est la Grande Barrière de corail : S\'étendant sur plus de 2 300 kilomètres, elle est visible depuis l\'espace et abrite une biodiversité immense.',
        // 'Les oiseaux sont des descendants des dinosaures : Les preuves fossiles montrent que les oiseaux modernes ont évolué à partir de petits dinosaures théropodes.',
        // 'Le téflon a été découvert accidentellement : En 1938, le chimiste Roy Plunkett a découvert le téflon alors qu\'il travaillait sur des réfrigérants, réalisant qu\'il avait créé un polymère aux propriétés antiadhésives.'
    ];

    const durations = [];

    const loadDurations = async () => {
        const durationPromises = speech.map((src, index) => {
            return new Promise((resolve) => {
                const audio = new Audio(src);
                audio.addEventListener('loadedmetadata', () => {
                    console.log('Duration:', audio.duration);
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

        // Reset startTimeRef when the full text has been displayed
        if (elapsed > (factDuration - 0.5)) {
            startTimeRef.current = Date.now();
            elapsed = 0;
        }

        const chunkToDisplay = Math.floor(elapsed / durationPerChunk);
        const endIndex = Math.floor((elapsed % durationPerChunk) / durationPerWord);
        if (chunks[chunkToDisplay]){

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

    const playFocusedVideo = () => {
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
    };

    useEffect(() => {
        const videoElements = videoURLs.map((url, i) => (
            <video
                key={i}
                src={url}
                loop
                style={{height: '100%'}}
            />
        ));
        setVideos(videoElements);
     playFocusedVideo()
    },[focusedIndex]);
    useEffect(() => {
        loadDurations().then(r => { });
    });
    const handleFocusedIndexChange = (index) => {
        setFocusedIndex(index);
    };

    return (
        <main style={{overflow: 'hidden', backgroundColor: isDarkMode ? '#454546' : 'white'}}>
            <ul className="video-carousel">
                {videos.map((video, i) => (
                    <li key={i} className="content">
                        <CommentPanel index={i}/>
                        <div className="video-container">
                            {video}
                            <p className="video-text">{currentText}</p>
                        </div>
                        <FeedbackButtons index={i} isDarkMode={isDarkMode}/>
                    </li>
                ))}
            </ul>
            <ScrollSnapping handleFocusedIndexChange={handleFocusedIndexChange}/>
            <div style={{position: 'fixed', top: '150px'}}>index : {focusedIndex}</div>
        </main>
    );
};

export default VideoCarousel;
