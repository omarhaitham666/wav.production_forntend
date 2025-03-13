import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TrendingAlbums = () => {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/trending-albums") 
            .then((response) => {
                console.log("Data received:", response.data);
                setAlbums(response.data);
            })
            .catch((error) => console.error("Error fetching albums", error));
    }, []);

    // const albums = {
    //     // name: "Albums",
    //     // AlbumList: [
    //     //     {
    //     //         id: 1,
    //     //         name: "Album 1",
    //     //         imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //     //         link: "",
    //     //         artist: "Artist1",
    //     //     },
    //     //     {
    //     //         id: 2,
    //     //         name: "Album 2",
    //     //         imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //     //         link: "",
    //     //         artist: "Artist2",
    //     //     },
    //     //     {
    //     //         id: 3,
    //     //         name: "Album 3",
    //     //         imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //     //         link: "",
    //     //         artist: "Artist3",
    //     //     },
    //     //     {
    //     //         id: 4,
    //     //         name: "Album 4",
    //     //         imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //     //         link: "",
    //     //         artist: "Artist4",
    //     //     },
    //     //     {
    //     //         id: 5,
    //     //         name: "Album 5",
    //     //         imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //     //         link: "",
    //     //         artist: "Artist5",
    //     //     },
    //     //     {
    //     //         id: 6,
    //     //         name: "Album 6",
    //     //         imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //     //         link: "",
    //     //         artist: "Artist6",
    //     //     },
    //     // ],
    // }

    return (
        <div>
            <h2 className='text-center font-bold text-4xl mb-6'>Trending Albums</h2>
            <div className="flex flex-wrap items-center justify-center gap-10">
                {albums.map(album  => (
                    <div key={album .id} className='flex flex-col relative ArtistsBox'>
                        <img className='w-46 h-46 rounded-xl' src={`http://127.0.0.1:8000/storage/${album.album_cover}`}  />
                        <div className='flex flex-col'>
                            <Link to={`/Albums/${album.id}`} className='text-start hover:text-[#30B797] transition-all text-2xl mt-2 font-bold'>{album.title}</Link>
                            <Link to={`/Artist/${album.artist}`} className='text-start hover:text-[#30B797] transition-all text-sm text-gray-400'>{album.artist.name}</Link>
                        </div>
                        {/* <span onClick={() => {
                            setCurrentAlbum(
                                album
                            )
                            setIsPlaying(true)
                        }}
                            className='playbtn cursor-pointer opacity-0 transition-all absolute bottom-12 right-0 bg-[#30B797] text-white hover:bg-[1f8d73] text-xl p-4 rounded-full'>
                            <FaPlay />
                        </span> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrendingAlbums;
