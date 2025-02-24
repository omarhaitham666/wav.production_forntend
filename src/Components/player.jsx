// import { useState, useRef, useEffect } from "react";
// import { FaDownload, FaPause, FaPlay, FaRedo } from "react-icons/fa";
// import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
// import WaveSurfer from "wavesurfer.js";

// import music1 from "../assets/11.mp3";
// import AudioWaveform from "./AudioWaveform";
// import Waveform from "./AudioWaveform";
// import Swal from "sweetalert2";
// import { MdOpenInFull } from "react-icons/md";
// import { BiVolume, BiVolumeFull, BiVolumeMute } from "react-icons/bi";

// const songs = [
//     {
//         title: "Song 1",
//         src: music1,
//         img: "https://i.imgur.com/6Q6Zz4B.jpg"
//     },
//     {
//         title: "Song 2",
//         src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
//         img: "https://i.imgur.com/6Q6Zz4B.jpg"
//     },
//     {
//         title: "Song 3",
//         src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
//         img: "https://i.imgur.com/6Q6Zz4B.jpg"
//     },

// ];

// export default function Player() {
//     const [currentSongIndex, setCurrentSongIndex] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [progress, setProgress] = useState(0);
//     const [isInFullScreen, setIsInFullScreen] = useState(false);
//     const [volume, setVolume] = useState(0.5);


//     const audioRef = useRef(new Audio(songs[currentSongIndex].src));

//     useEffect(() => {
//         const audio = audioRef.current;
//         audio.src = songs[currentSongIndex].src;

//         if (isPlaying) {
//             audio.play();
//         }

//         const updateProgress = () => {
//             setCurrentTime(audio.currentTime);
//             setProgress((audio.currentTime / audio.duration) * 100);
//         };

//         const setAudioDuration = () => {
//             setDuration(audio.duration);
//         };

//         audio.addEventListener("timeupdate", updateProgress);
//         audio.addEventListener("loadedmetadata", setAudioDuration);

//         return () => {
//             audio.removeEventListener("timeupdate", updateProgress);
//             audio.removeEventListener("loadedmetadata", setAudioDuration);
//         };
//     }, [currentSongIndex]);

//     const togglePlayPause = () => {
//         if (isPlaying) {
//             audioRef.current.pause();
//         } else {
//             audioRef.current.play();
//         }
//         setIsPlaying(!isPlaying);
//     };

//     const nextSong = () => {
//         setCurrentSongIndex((prev) => (prev + 1) % songs.length);
//         setIsPlaying(true);
//     };

//     const prevSong = () => {
//         setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
//         setIsPlaying(true);
//     };

//     const handleVolumeChange = (event) => {
//         const newVolume = parseFloat(event.target.value);
//         setVolume(newVolume);
//         if (audioRef.current) {
//             audioRef.current.volume = newVolume;
//         }
//     };

//     const formatTime = (time) => {
//         if (!time || isNaN(time)) return "00:00";
//         const minutes = Math.floor(time / 60);
//         const seconds = Math.floor(time % 60);
//         return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//     };

//     const handleRestart = () => {
//         if (audioRef.current) {
//             audioRef.current.currentTime = 0;
//             audioRef.current.play();
//         }
//     };


//     const downloadSong = async () => {
//         try {
//             const response = await fetch(audioRef.current.src);
//             const blob = await response.blob();
//             const blobUrl = URL.createObjectURL(blob); 

//             const link = document.createElement("a");
//             link.href = blobUrl;
//             link.download = "CouldWav.mp3";
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);

//             // 🔹 تحرير الذاكرة
//             URL.revokeObjectURL(blobUrl);
//         } catch (error) {
//             Swal.fire({
//                 title: 'خطأ',
//                 text: "حدث خطا في التنزيل",
//                 icon: 'error',
//                 confirmButtonText: 'قم باعاده المحاولة لاحقا',
//             });
//         }
//     };

//     const openInFullScreen = () => {
//         setIsInFullScreen(!isInFullScreen)
//     };



//     return (
//         <>
//             <div className="mx-auto fixed bottom-0 h-44 w-full p-6 z-50 bg-[#1D212E] text-white shadow-lg flex flex-row items-center justify-between">
//                 {/* أزرار التحكم */}
//                 <div className="flex flex-row gap-4">
//                     <div className="flex-row items-center gap-2.5 hidden lg:flex text-xl">
//                         <button onClick={prevSong} className="p-3">
//                             <TbPlayerTrackPrevFilled />
//                         </button>

//                         <button onClick={togglePlayPause} className="p-3">
//                             {isPlaying ? <FaPause /> : <FaPlay />}
//                         </button>

//                         <button onClick={nextSong} className="p-3">
//                             <TbPlayerTrackNextFilled />
//                         </button>
//                     </div>
//                     <div className="flex flex-row items-center">
//                         <img src={songs[currentSongIndex].img} className="w-32 h-32 rounded-2xl" alt="song Img" />
//                         <div className="xl:flex flex-col hidden ml-3">
//                             <h2 className="text-xl font-bold mb-2">{songs[currentSongIndex].title}</h2>
//                             <p className="text-sm">Artist Name</p>
//                         </div>
//                     </div>
//                 </div>
//                 {/* شريط التقدم */}
//                 <div className="flex ml-8 flex-row items-center gap-4">
//                     <span>{formatTime(currentTime)}</span>
//                     <AudioWaveform audioElement={audioRef.current} />
//                     <span>{formatTime(duration)}</span>
//                 </div>
//                 <div className="flex flex-row items-end">
//                     <button onClick={handleRestart} className="p-3 hover:text-[#30B797] transition-all cursor-pointer">
//                         <FaRedo />
//                     </button>
//                     <button onClick={downloadSong} className="p-3 hover:text-[#30B797] transition-all cursor-pointer">
//                         <FaDownload />
//                     </button>
//                     <button onClick={openInFullScreen} className="p-3 hover:text-[#30B797] transition-all cursor-pointer">
//                         <MdOpenInFull />
//                     </button>
//                 </div>
//             </div>
//             {/* ألوج بالتحكم في الشاشه الكاملة */}
//             <div className={`${isInFullScreen ? "flex" : "hidden"} fixed top-0 left-0 w-full h-screen z-50 bg-[#1D212E] items-end py-44`}>
//                 <span className="absolute w-full h-screen top-0 bottom-0 right-0 left-0 opacity-50">
//                     <img src={songs[currentSongIndex].img} className="w-full h-full" alt="SongImg" />
//                 </span>
//                 <div className="relative flex flex-col gap-4 w-full text-white z-40 container mx-auto">
//                     <div className="flex flex-row items-center">
//                         <img src={songs[currentSongIndex].img} className="w-64 h-64 rounded-2xl" alt="song Img" />
//                         <div className="flex flex-col ml-3">
//                             <h2 className="text-2xl font-bold mb-2">{songs[currentSongIndex].title}</h2>
//                             <p className="text-xl">Artist Name</p>
//                         </div>
//                     </div>
//                     <div className="w-full flex flex-row items-center h-48 gap-4">
//                         <span>{formatTime(currentTime)}</span>
//                         <AudioWaveform audioElement={audioRef.current} />
//                         <span>{formatTime(duration)}</span>
//                     </div>
//                     <div className="grid grid-cols-4 items-center">
//                         <div className="flex flex-row items-center justify-center gap-2.5 text-4xl col-end-4">
//                             <button onClick={prevSong} className="p-3">
//                                 <TbPlayerTrackPrevFilled />
//                             </button>
//                             <button onClick={togglePlayPause} className="p-3">
//                                 {isPlaying ? <FaPause /> : <FaPlay />}
//                             </button>
//                             <button onClick={nextSong} className="p-3">
//                                 <TbPlayerTrackNextFilled />
//                             </button>
//                         </div>
//                         <div className="flex flex-row items-center gap-4 col-end-6 text-3xl">
//                                 <input
//                                     type="range"
//                                     id="volume"
//                                     min="0"
//                                     max="1"
//                                     step="0.01"
//                                     value={volume}
//                                     onChange={handleVolumeChange}
//                                     className="w-full h-2 rounded-lg bg-[#30B797] text-white"
//                                 />
//                             <button onClick={handleRestart} className="p-3 hover:text-[#30B797] transition-all cursor-pointer">
//                                 <FaRedo />
//                             </button>
//                             <button onClick={downloadSong} className="p-3 hover:text-[#30B797] transition-all cursor-pointer">
//                                 <FaDownload />
//                             </button>
//                             <button onClick={openInFullScreen} className="p-3 hover:text-[#30B797] transition-all cursor-pointer">
//                                 <MdOpenInFull />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

