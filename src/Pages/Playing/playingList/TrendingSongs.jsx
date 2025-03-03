import React, { useEffect, useState } from 'react';
import { getTrendingSongs } from '../../../actions/getSongs';
import { FaRegHeart } from 'react-icons/fa';
import { LuDownload } from 'react-icons/lu';
import { MdOutlineReplay } from 'react-icons/md';
import { IoPlayCircleOutline } from 'react-icons/io5';
import Waveform from '../../../Components/Waveform';
import { addFavorite, downloadSong } from '../../../actions/songsActions';
import { Link } from 'react-router-dom';

const TrendingSongs = () => {
    // Fetch trending songs from API
    // const [trendingSongs, setTrendingSongs] = useState([]);
    // const [currentSlide, setCurrentSlide] = useState(0);

    // useEffect(() => {
    //     getTrendingSongs()
    //         .then(data => setTrendingSongs(data))
    // }, []);

    const [currentWaveSurfer, setCurrentWaveSurfer] = useState(null);

    const songs = {
        name: "Songs",
        SongList: [
            {
                id: 1,
                name: "Song 1",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist1",
                album: "Album 1",
                url: "./1.mp3",
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
            },
            {
                id: 4,
                name: "Song 4",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist4",
                album: "Album 4",
            },
            {
                id: 5,
                name: "Song 5",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist5",
                album: "Album 5",
            },
            {
                id: 6,
                name: "Song 6",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist6",
                album: "Album 6",
            },
        ]
    }


    return (
        <>{
            songs?.SongList.map((song) => (
                <div className='flex flex-col' key={song.id}>
                    <div className='flex flex-row gap-4'>
                        <img src={song.imgScr} className='rounded-xl w-48 h-48' alt="song" />
                        <div className='flex flex-col justify-around'>
                            <div>
                                <h3 className='font-bold text-2xl mb-2'>{song.name}</h3>
                                <Link to={`/Artists/${song.artist}`} className='text-xl hover:text-[#30B797] transition-all'>{song.artist}</Link>
                            </div>
                            <Link to={`/Albums/${song.album}`} className='text-xl hover:text-[#30B797] transition-all'>{song.album}</Link>
                            <div className='flex flex-row gap-2 mt-4'>
                                <MdOutlineReplay size={24}
                                    className='text-2xl text-black hover:text-[#30B797] transition-all'
                                />
                                <LuDownload size={24}
                                    className='text-2xl text-black hover:text-[#30B797] transition-all'
                                    onClick={() => {
                                        downloadSong(song.url)
                                    }
                                    }
                                />
                                <FaRegHeart size={24}
                                    className='text-2xl text-black hover:text-[#30B797] transition-all'
                                    onClick={
                                        () => {
                                            addFavorite(song)
                                        }
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <Waveform url={song.url} song={song} setCurrentWaveSurfer={setCurrentWaveSurfer} currentWaveSurfer={currentWaveSurfer} />
                </div>
            ))
        }
        </>
    );
}

export default TrendingSongs;
