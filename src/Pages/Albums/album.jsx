import React, { useEffect, useState } from 'react';
import PlayingHero from '../../Components/PlayingHero';
import { Link, useParams } from "react-router-dom";
import { getSongsFromAlbum } from '../../actions/getSongs';
import { addFavorite, downloadSong } from '../../actions/songsActions';
import { LuDownload } from 'react-icons/lu';
import { FaPause, FaPlay, FaRegHeart } from 'react-icons/fa';
import { MdOutlineReplay } from 'react-icons/md';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';
import { Helmet } from 'react-helmet-async';

const Album = () => {
    const { loadSong, togglePlayPause, playing, currentSong, playSong, PlayingList } = useAudioPlayer();
    const { albumId } = useParams();
    const [album, setAlbum] = useState(null);
    // const [albumData, setAlbumData] = useState(null);
    const [tracks, setTracks] = useState(null);

    const albumData = {
        name: "album 1",
        artist: "artist 1",
        artistId:"1",
        imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
        year: 2021,
        songs: 5,
        link: "",
        SongList: [
            {
                id: 1,
                name: "Song 1",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist 1",
                album: "Album 1",
                url: "./1.mp3",
                duration: "3:45",
            },
            {
                id: 2,
                name: "Song 2",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist 2",
                album: "Album 2",
                url: "./2.mp3",
                duration: "4:15",
            },
            {
                id: 3,
                name: "Song 3",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist 3",
                album: "Album 3",
                url: "./3.mp3",
                duration: "5:00",
            },
            {
                id: 4,
                name: "Song 4",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist 4",
                album: "Album 4",
                url: "./4.mp3",
                duration: "3:20",
            },
            {
                id: 5,
                name: "Song 5",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist 5",
                album: "Album 5",
                url: "./5.mp3",
                duration: "2:45",
            },
            {
                id: 6,
                name: "Song 6",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                artist: "Artist 6",
                album: "Album 6",
                url: "./6.mp3",
                duration: "4:00",
            },
        ]
    }


    // useEffect(() => {
    //     setAlbum(albumId)
    //     const AlbumData = getSongsFromAlbum(albumId)

    //     setAlbumData(AlbumData)

    // }, [albumId]);

    return (
        <>
                    <Helmet>
                        <title>Albums | Could.wav</title>
                    </Helmet>
            <PlayingHero />
            <div className="py-12">
                <div className="container mx-auto">
                    <div className='flex flex-row gap-4'>
                        <img src={albumData.imgScr} className='rounded-xl w-48 h-48' alt="song" />
                        <div className='flex flex-col justify-around'>
                            <div className='first-letter:uppercase'>
                                <h3 className='font-bold text-2xl mb-1'>{albumData.name}</h3>
                                <Link to={`/Artists/${albumData.artist}`} className='text-xl first-letter:uppercase hover:text-[#30B797] transition-all'>{albumData.artist}</Link>
                            </div>
                            <p className='text-xl'>{albumData.year}</p>
                            <div className='flex flex-row gap-2 mt-4'>
                                <MdOutlineReplay
                                    className='text-3xl text-black hover:text-[#30B797] transition-all'
                                />
                                <LuDownload
                                    className='text-3xl text-black hover:text-[#30B797] transition-all'
                                    onClick={() => {
                                        downloadSong(albumData.link)
                                    }
                                    }
                                />
                                <FaRegHeart
                                    className='text-3xl text-black hover:text-[#30B797] transition-all'
                                    onClick={
                                        () => {
                                            addFavorite(track)
                                        }
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        {
                            albumData.SongList.map((song) => (
                                <div key={song.id} className="flex flex-row gap-4 justify-between py-4 border-b border-[#DDDDDD]">
                                    <div className='flex flex-row gap-2 items-center'>
                                        <span className='text-xl font-bold'>
                                            {song.id}.
                                        </span>
                                        <span
                                            onClick={() => {
                                                if (currentSong?.song_url !== song.url) {
                                                    playSong(song);
                                                } else {
                                                    togglePlayPause();
                                                }
                                            }}
                                            className='cursor-pointer transition-all text-black hover:text-[#30B797] text-2xl'>
                                            {currentSong?.song_url === song.url && playing ? <FaPause /> : <FaPlay />}
                                        </span>
                                        <div className="flex flex-col">
                                            <h3 className="font-bold text-xl mb-1">{song.name}</h3>
                                            <Link to={`/Artists/${albumData.artistId}`} className="text-sm text-gray-400 hover:text-[#30B797] transition-all">{song.artist}</Link>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                    <div className='flex flex-row gap-2'>
                                        <MdOutlineReplay
                                            className='text-3xl text-black hover:text-[#30B797] transition-all'
                                            onClick={
                                                () => {
                                                    playSong(song);
                                                }
                                            }
                                        />
                                        <LuDownload
                                            className='text-3xl text-black hover:text-[#30B797] transition-all'
                                            onClick={() => {
                                                downloadSong(song.url)
                                            }
                                            }
                                        />
                                        <FaRegHeart
                                            className='text-3xl text-black hover:text-[#30B797] transition-all'
                                            onClick={
                                                () => {
                                                    addFavorite(song)
                                                }
                                            }
                                        />
                                    </div>
                                    <span className='font-bold'>{song.duration}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Album;
