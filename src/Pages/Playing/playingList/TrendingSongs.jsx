import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LuDownload } from 'react-icons/lu';
import { MdOutlineReplay } from 'react-icons/md';
import Waveform from '../../../Components/Waveform';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TrendingSongs = () => {
    const [likedSongs, setLikedSongs] = useState({});

    const songs = {
        name: "Songs",
        SongList: [
            {
                id: 1,
                name: "Song 1",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist1",
                album: "Album 1",
                url: "/song1.mp3",
            },
            {
                id: 2,
                name: "Song 2",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist2",
                album: "Album 2",
                url: "./2.mp3",
            },
            {
                id: 3,
                name: "Song 3",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist3",
                album: "Album 3",
                url: "./3.mp3",
            }
        ]
    };

    const handleLike = async (id) => {
        if (likedSongs[id]) return; // ✅ تجنب الإرسال المتكرر

        try {
            const response = await axios.post(`https://api.cloudwavproduction.com/api/songs/${id}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setLikedSongs((prevLikes) => ({
                ...prevLikes,
                [id]: response.data.isLiked,
            }));
        } catch (error) {
            console.error("Error liking the song", error);
        }
    };

    return (
        <div>
            <h2 className="text-center font-bold text-4xl mb-6">Trending Songs</h2>
            {songs.SongList.length === 0 ? (
                <p className="text-center text-gray-500">No trending songs found.</p>
            ) : (
                songs.SongList.map((song) => (
                    <div key={song.id} className="flex flex-col mb-8">
                        <div className="flex flex-row gap-4 items-center">
                            <img className="w-36 h-36 rounded-xl" src={song.imgScr} alt={song.name} />
                            <div className="flex flex-col justify-around">
                                <div>
                                    <h3 className="font-bold text-2xl mb-2">{song.name}</h3>
                                    <Link to={`/Artists/${song.artist}`} className="text-xl hover:text-[#30B797] transition-all">
                                        {song.artist}
                                    </Link>
                                </div>
                                <div className="flex flex-row gap-2 mt-4">
                                    <MdOutlineReplay size={24} className="text-2xl text-black hover:text-[#30B797] transition-all" />
                                    <LuDownload size={24}
                                        className="text-2xl text-black hover:text-[#30B797] transition-all"
                                        onClick={() => song.url && window.open(song.url, "_blank")}
                                    />
                                    <button onClick={() => handleLike(song.id)}>
                                        {likedSongs[song.id] ? (
                                            <FaHeart size={24} className="text-2xl text-red-500 transition-all" />
                                        ) : (
                                            <FaRegHeart size={24} className="text-2xl text-black hover:text-[#30B797] transition-all" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* ✅ مكون Waveform الآن مستقل ويمكن تشغيله بشكل متزامن */}
                        {/* <Waveform url={song.url} song={song} /> */}
                    </div>
                ))
            )}
        </div>
    );
};

export default TrendingSongs;
