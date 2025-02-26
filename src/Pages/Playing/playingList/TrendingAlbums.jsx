import React from 'react';
import { FaPlay } from 'react-icons/fa';

const TrendingAlbums = () => {

    const albums = {
        name: "Albums",
        AlbumList: [
            {
                id: 1,
                name: "Album 1",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                link: "",
                artist: "Artist 1",
            },
            {
                id: 2,
                name: "Album 2",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                link: "",
                artist: "Artist 2",
            },
            {
                id: 3,
                name: "Album 3",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                link: "",
                artist: "Artist 3",
            },
            {
                id: 4,
                name: "Album 4",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                link: "",
                artist: "Artist 4",
            },
            {
                id: 5,
                name: "Album 5",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                link: "",
                artist: "Artist 5",
            },
            {
                id: 6,
                name: "Album 6",
                imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
                link: "",
                artist: "Artist 6",
            },
        ],
    }

    return (
        <div>
            <h2 className='text-center font-bold text-4xl mb-6'>Trending Albums</h2>
            <div className="flex flex-wrap items-center justify-center gap-10">
                {albums.AlbumList.map(i => (
                    <div key={i.id} className='flex flex-col relative ArtistsBox'>
                        <img className='w-46 h-46 rounded-xl' src={i.imgScr} />
                        <div className='flex flex-col'>
                            <a href={`/albums/${i.name}`} className='text-start hover:text-[#30B797] transition-all text-2xl mt-2 font-bold'>{i.name}</a>
                            <a href={`/artist/${i.artist}`} className='text-start hover:text-[#30B797] transition-all text-sm text-gray-400'>{i.artist}</a>
                        </div>
                        <span onClick={() => {
                            setCurrentAlbum(
                                i
                            )
                            setIsPlaying(true)
                        }}
                            className='playbtn cursor-pointer opacity-0 transition-all absolute bottom-12 right-0 bg-[#30B797] text-white hover:bg-[1f8d73] text-xl p-4 rounded-full'>
                            <FaPlay />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrendingAlbums;
