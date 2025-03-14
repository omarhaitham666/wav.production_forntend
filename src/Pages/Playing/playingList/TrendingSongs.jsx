import React, { useEffect, useState } from 'react';
import { getTrendingSongs } from '../../../actions/getSongs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LuDownload } from 'react-icons/lu';
import { MdOutlineReplay } from 'react-icons/md';
import Waveform from '../../../Components/Waveform';
import { addFavorite, downloadSong } from '../../../actions/songsActions';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TrendingSongs = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentWaveSurfer, setCurrentWaveSurfer] = useState(null);
    const [likedSongs, setLikedSongs] = useState({});

    // const songs = {
    //     name: "Songs",
    //     SongList: [
    //         {
    //             id: 1,
    //             name: "Song 1",
    //             imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //             artist: "Artist1",
    //             album: "Album 1",
    //             url: "./1.mp3",
    //         },
    //         {
    //             id: 2,
    //             name: "Song 2",
    //             imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //             artist: "Artist2",
    //             album: "Album 2",
    //             url: "./2.mp3",
    //         },
    //         {
    //             id: 3,
    //             name: "Song 3",
    //             imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //             artist: "Artist3",
    //             album: "Album 3",
    //             url: "./3.mp3",
    //         },
    //         {
    //             id: 4,
    //             name: "Song 4",
    //             imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //             artist: "Artist4",
    //             album: "Album 4",
    //         },
    //         {
    //             id: 5,
    //             name: "Song 5",
    //             imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //             artist: "Artist5",
    //             album: "Album 5",
    //         },
    //         {
    //             id: 6,
    //             name: "Song 6",
    //             imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //             artist: "Artist6",
    //             album: "Album 6",
    //         },
    //     ]
    // }
    
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/trendingSongs")
            .then((response) => {
                console.log("Trending Songs:", response.data);
                setSongs(response.data);
                setLoading(false);
                const initialLikes = {};
                response.data.forEach(song => {
                    initialLikes[song.id] = song.isLiked || false; 
                });
                setLikedSongs(initialLikes);
            })
            .catch((error) => {
                console.error("Error fetching trending songs", error);
                setLoading(false);
            });
    }, []);

    const handleLike = (id) => {
        axios.post(`http://127.0.0.1:8000/api/songs/${id}/like`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then((response) => {
            setLikedSongs((prevLikes) => ({
                ...prevLikes,
                [id]: response.data.isLiked, 
            }));
        })
        .catch((error) => {
            console.error("Error liking the song", error);
        });
    };



    return (
        <>{
            // songs?.SongList.map((song) => (
            //     <div className='flex flex-col' key={song.id}>
            //         <div className='flex flex-row gap-4'>
            //             <img src={song.imgScr} className='rounded-xl w-48 h-48' alt="song" />
            //             <div className='flex flex-col justify-around'>
            //                 <div>
            //                     <h3 className='font-bold text-2xl mb-2'>{song.name}</h3>
            //                     <Link to={`/Artists/${song.artist}`} className='text-xl hover:text-[#30B797] transition-all'>{song.artist}</Link>
            //                 </div>
            //                 <Link to={`/Albums/${song.album}`} className='text-xl hover:text-[#30B797] transition-all'>{song.album}</Link>
            //                 <div className='flex flex-row gap-2 mt-4'>
            //                     <MdOutlineReplay size={24}
            //                         className='text-2xl text-black hover:text-[#30B797] transition-all'
            //                     />
            //                     <LuDownload size={24}
            //                         className='text-2xl text-black hover:text-[#30B797] transition-all'
            //                         onClick={() => {
            //                             if (song.url) {
            //                                 downloadSong(song.url);
            //                             } else {
            //                                 console.error("No URL available for this song");
            //                             }
            //                         }
            //                         }
            //                     />
            //                     <FaRegHeart size={24}
            //                         className='text-2xl text-black hover:text-[#30B797] transition-all'
            //                         onClick={
            //                             () => {
            //                                 addFavorite(song)
            //                             }
            //                         }
            //                     />
            //                 </div>
            //             </div>
            //         </div>
            //         <Waveform url={song.url} song={song} setCurrentWaveSurfer={setCurrentWaveSurfer} currentWaveSurfer={currentWaveSurfer} />
            //     </div>
            // ))
            <div>
            <h2 className='text-center font-bold text-4xl mb-6'>Trending Songs</h2>
            {songs.length === 0 ? (
                <p className="text-center text-gray-500">No trending songs found.</p>
            ) : (
                songs.map((song) => (
                    <div key={song.id} className='flex flex-col mb-8'>
                        <div className='flex flex-row gap-4 items-center'>
                            <img className='w-36 h-36 rounded-xl' src={song.cover_url} alt={song.title} />
                            <div className='flex flex-col justify-around'>
                                <div>
                                    <h3 className='font-bold text-2xl mb-2'>{song.title}</h3>
                                    {/* إذا كان لديك صفحة تفاصيل للفنان */}
                                    <Link to={`/Artists/${song.artist}`} className='text-xl hover:text-[#30B797] transition-all'>
                                        {song.artist}
                                    </Link>
                                </div>
                                <div className='flex flex-row gap-2 mt-4'>
                                    <MdOutlineReplay size={24}
                                        className='text-2xl text-black hover:text-[#30B797] transition-all'
                                    />
                                  


<LuDownload size={24}
    className='text-2xl text-black hover:text-[#30B797] transition-all'
    onClick={() => downloadSong(song.id)}
/>
                                     <button onClick={() => handleLike(song.id)}>
                                        {likedSongs[song.id] ? (
                                            <FaHeart size={24} className='text-2xl text-red-500 transition-all' />
                                        ) : (
                                            <FaRegHeart size={24} className='text-2xl text-black hover:text-[#30B797] transition-all' />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* عرض الموجة الصوتية باستخدام مكون Waveform */}
                        {/* <Waveform 
                            url={song.audio_url} 
                            song={song} 
                            setCurrentWaveSurfer={setCurrentWaveSurfer} 
                            currentWaveSurfer={currentWaveSurfer} 
                        /> */}
                         <Waveform url={song.url} song={song} setCurrentWaveSurfer={setCurrentWaveSurfer} currentWaveSurfer={currentWaveSurfer} />
                    </div>
                ))
            )}
        </div>
        }
        </>
    );
}

export default TrendingSongs;
