import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { FaDownload, FaPause, FaPlay, FaRedo } from "react-icons/fa";
import { MdCloseFullscreen, MdOpenInFull } from "react-icons/md";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import WaveSurfer from "wavesurfer.js";
import { downloadSong } from "../actions/songsActions";
import logo from "../assets/Img/logo.png"

const AudioPlayerContext = createContext();

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

export const AudioPlayerProvider = ({ children }) => {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playlist, setPlaylist] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState(null);
    const [isInFullScreen, setIsInFullScreen] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#575757",
            progressColor: "#30B797",
            cursorColor: "#EEB440",
            barWidth: 3,
            barGap: 10,
            barRadius: 3,
            responsive: true,
            height: 100,
            normalize: true,
            partialRender: true,
            backend: "WebAudio",
        });

        wavesurfer.current.on("ready", () => {
            setDuration(wavesurfer.current.getDuration());
        });

        wavesurfer.current.on("audioprocess", () => {
            if (wavesurfer.current?.isPlaying()) {
                setCurrentTime(wavesurfer.current.getCurrentTime());
            }
        });

        wavesurfer.current.on("finish", () => {
            setPlaying(false);
            nextSong();
        });

        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
                wavesurfer.current = null;
            }
        };
    }, [currentIndex, playlist]);

    useEffect(() => {
        if (playlist.length > 0 && currentIndex >= 0 && wavesurfer.current) {
            loadSong(playlist[currentIndex]?.url);
        }
    }, [currentIndex, playlist]);


    const loadSong = (url) => {
        setIsLoading(true);
        console.log("Loading song:")
        if (!url || !wavesurfer.current) return;
        wavesurfer.current.stop();
        wavesurfer.current.load(url);

        setPlaying(false);
        setCurrentTime(0);

        wavesurfer.current.once("ready", () => {
            setDuration(wavesurfer.current.getDuration());
            setCurrentSong(playlist[currentIndex]);

            wavesurfer.current.play();
            setPlaying(true);
            setIsLoading(false);
        });
        wavesurfer.current.on("error", (error) => {
            
        });
    };


    const playSong = (song) => {
        setPlaylist([song]);
        setCurrentIndex(0);
        setCurrentSong(song); // تحديث الأغنية الحالية فورًا
        loadSong(song.song_url);

    };

    const playPlaylist = (songs) => {
        setPlaylist(songs);
        setCurrentIndex(0);
        loadSong(songs[0].url);
    };

    useEffect(() => {
        if (currentSong) {
            loadSong(currentSong.song_url);
        }
    }, [currentSong]);

    const togglePlayPause = () => {
        if (!wavesurfer.current) return;
        wavesurfer.current.playPause();
        setPlaying(wavesurfer.current.isPlaying());
    };

    const nextSong = () => {
        if (playlist.length === 0) return;
        wavesurfer.current.stop();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    const prevSong = () => {
        if (playlist.length === 0) return;
        wavesurfer.current.stop();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    };

    const handleRestart = () => {
        if (!wavesurfer.current) return;
        wavesurfer.current.seekTo(0);
        setPlaying(true);
    };

    const openInFullScreen = () => {
        setIsInFullScreen(!isInFullScreen)
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (wavesurfer.current) {
            wavesurfer.current.setVolume(newVolume);
        }
    };

    return (
        <AudioPlayerContext.Provider value={{
            waveformRef,
            playing,
            currentTime,
            duration,
            currentSong,
            togglePlayPause,
            playSong, // ✅ متاح للاستخدام في أي مكون
            playPlaylist, // ✅ متاح للاستخدام في أي مكون
        }}>
            {children}
            <div className={`${isInFullScreen ? "flex top-0 h-screen z-50 flex-col justify-end pt-44 pb-56" : "flex-row bg-[#1D212E]"} fixed bottom-0 left-0 w-full shadow-lg p-4 flex  gap-8 text-white `}
            style={{
                background : currentSong? currentSong.imgScr :"#1D212E"
            }}
            >
                <>
                    <div className={` ${isInFullScreen ? "absolute bottom-40 right-1/2 translate-x-[50%]" : ""} flex-row items-center gap-2.5 hidden lg:flex text-xl`}>
                        <button onClick={prevSong} className="p-3">
                            <TbPlayerTrackPrevFilled />
                        </button>
                        <button onClick={togglePlayPause} className={`p-3 transition-all duration-300 ${playing ? "text-green-500 scale-110" : "text-gray-500"}`}>
                            {playing ? <FaPause /> : <FaPlay />}
                        </button>
                        <button onClick={nextSong} className="p-3">
                            <TbPlayerTrackNextFilled />
                        </button>
                    </div>

                    <div className={`${isInFullScreen ? "-order-1" : ""} transition-opacity duration-500 ease-in-out opacity-100 flex flex-row items-center gap-3`}>
                        <img src={currentSong? currentSong.imgScr : logo} className={`${isInFullScreen ? 'w-48 h-48' : "w-32 h-32"} rounded-2xl shadow-lg`} alt="song Img" />
                        <div className="flex flex-col gap-2">
                            <h1 className={`${isInFullScreen ? "text-3xl" : "text-xl"} font-bold mt-2`}>{currentSong? currentSong.name : "لا يحتوي المشغل علي اي اغنية"}</h1>
                            <p className={`${isInFullScreen ? "text-1xl" : "text-sm"} text-gray-500`}>{currentSong? currentSong.artist : "هنا اسم الفنان"}</p>
                        </div>
                    </div>

                    <div className={`${isInFullScreen ? "w-full mt-6" : "w-[70%]"} flex flex-row items-center gap-4`}>
                        <span>{formatTime(currentTime)}</span>
                        {isLoading && <p className="text-center w-full animate-bounce text-gray-500">جارِ تحميل الأغنية...</p>}
                        <div ref={waveformRef} className="w-fitAv" />
                        <span>{formatTime(duration)}</span>
                    </div>
                    <div className={` ${isInFullScreen ? "w-1/6 absolute bottom-40 right-16" : ""} flex flex-row items-center`}>
                        {isInFullScreen &&
                            <input
                                type="range"
                                id="volume"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-full h-2 rounded-lg bg-gray-300 transition-all hover:bg-green-500 focus:bg-green-500"
                            />
                        }
                        <button onClick={handleRestart} className="p-3 hover:text-[#30B797] transition-all cursor-pointer">
                            <FaRedo />
                        </button>
                        <button onClick={() => {
                            downloadSong(currentSong.link)
                        }} className="p-3 hover:text-[#30B797] transition-all cursor-pointer">
                            <FaDownload />
                        </button>
                        <button onClick={openInFullScreen} className="p-3 hover:text-[#30B797] transition-all cursor-pointer">
                            {isInFullScreen ? <MdCloseFullscreen /> : <MdOpenInFull />}
                        </button>
                    </div>
                    <img src={logo} className={isInFullScreen? "absolute top-40 left-20":"hidden"} alt="" />
                </>
            </div>
        </AudioPlayerContext.Provider>
    );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
