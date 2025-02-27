// import React, { useEffect, useState } from 'react';
// import { getTrendingSongs } from '../../../actions/getSongs';
// import { FaRegHeart } from 'react-icons/fa';
// import { LuDownload } from 'react-icons/lu';
// import { MdOutlineReplay } from 'react-icons/md';
// import { IoPlayCircleOutline } from 'react-icons/io5';
// import Waveform from '../../../Components/Waveform';
// import { addFavorite, downloadSong } from '../../../actions/songsActions';
// import axios from 'axios';

// const TrendingSongs = () => {
    // Fetch trending songs from API
    // const [trendingSongs, setTrendingSongs] = useState([]);
    // const [currentSlide, setCurrentSlide] = useState(0);

    // useEffect(() => {
    //     getTrendingSongs()
    //         .then(data => setTrendingSongs(data))
    // }, []);

    // const songs = {
    //     name: "Songs",
    //     SongList: [
    //         {
    //             id: 1,
    //             name: "Song 1",
    //             imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //             artist: "Artist 1",
    //             album: "Album 1",
    //             url: "./1.mp3",
    //         },
    //         {
    //             id: 2,
    //             name: "Song 2",
    //             imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //             artist: "Artist 2",
    //             album: "Album 2",
    //         },
    //         {
    //             id: 3,
    //             name: "Song 3",
    //             imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //             artist: "Artist 3",
    //             album: "Album 3",
    //         },
    //         {
    //             id: 4,
    //             name: "Song 4",
    //             imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //             artist: "Artist 4",
    //             album: "Album 4",
    //         },
    //         {
    //             id: 5,
    //             name: "Song 5",
    //             imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //             artist: "Artist 5",
    //             album: "Album 5",
    //         },
    //         {
    //             id: 6,
    //             name: "Song 6",
    //             imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
    //             artist: "Artist 6",
    //             album: "Album 6",
    //         },
    //     ]
    // }
//     useEffect(() => {
//         axios
//             .get("http://127.0.0.1:8000/api/Songs")
//             .then(response => {
//                 // تحويل بيانات API إلى الأسماء التي تستخدمها React
//                 const formattedSongs = response.data.map(song => ({
//                     id: song.id,
//                     name: song.title,  // تغيير title إلى name
//                     artist: song.artist_name,  // تغيير artist_name إلى artist
//                     imgScr: song.cover_url,  // تغيير cover_url إلى imgScr
//                     url: song.song_url,  // تغيير song_url إلى url
//                 }));
//                 setSongs(formattedSongs);
//             })
//             .catch(error => console.error("حدث خطأ أثناء جلب الأغاني:", error));
//     }, []);



//     return (

//         <>
//         {
//             songs?.SongList.map((song) => (
//                 <div className='flex flex-col' key={song.id}>
//                     <div className='flex flex-row gap-4'>
//                         <img src={song.imgScr} className='rounded-xl w-48 h-48' alt="song" />
//                         <div className='flex flex-col justify-around'>
//                             <div>
//                                 <h3 className='font-bold text-2xl mb-2'>{song.name}</h3>
//                                 <p className='text-xl'>{song.artist}</p>
//                             </div>
//                             <p className='text-xl'>{song.album}</p>
//                             <div className='flex flex-row gap-2 mt-4'>
//                                 <MdOutlineReplay size={24}
//                                     className='text-2xl text-black hover:text-[#30B797] transition-all'
//                                 />
//                                 <LuDownload size={24}
//                                     className='text-2xl text-black hover:text-[#30B797] transition-all'
//                                     onClick={() => {
//                                         downloadSong(song.url)
//                                     }
//                                     }
//                                 />
//                                 <FaRegHeart size={24}
//                                     className='text-2xl text-black hover:text-[#30B797] transition-all'
//                                     onClick={
//                                         () => {
//                                             addFavorite(song)
//                                         }
//                                     }
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <Waveform url={song.url} />
//                 </div>
//             ))
//         }

// {
//     songs?.SongList.map((song) => (
//         <div className='flex flex-col' key={song.id}>
//             <div className='flex flex-row gap-4'>
//                 <img src={song.imgScr} className='rounded-xl w-48 h-48' alt="song" />
//                 <div className='flex flex-col justify-around'>
//                     <div>
//                         <h3 className='font-bold text-2xl mb-2'>{song.name}</h3>
//                         <p className='text-xl'>{song.artist}</p>
//                     </div>
//                     <p className='text-xl'>{song.album}</p>
//                     <div className='flex flex-row gap-2 mt-4'>
//                         <MdOutlineReplay size={24}
//                             className='text-2xl text-black hover:text-[#30B797] transition-all'
//                         />
//                         <LuDownload size={24}
//                             className='text-2xl text-black hover:text-[#30B797] transition-all'
//                             onClick={() => downloadSong(song.url)}
//                         />
//                         <FaRegHeart size={24}
//                             className='text-2xl text-black hover:text-[#30B797] transition-all'
//                             onClick={() => addFavorite(song)}
//                         />
//                     </div>
//                 </div>
//             </div>
//             <Waveform url={song.url} />
//         </div>
//     ))
// }

//         </>
//     );
// {

//  }

// export default TrendingSongs; 


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegHeart } from 'react-icons/fa';
import { LuDownload } from 'react-icons/lu';
import { MdOutlineReplay } from 'react-icons/md';
import Waveform from '../../../Components/Waveform';
import { addFavorite, downloadSong } from '../../../actions/songsActions';

const TrendingSongs = () => {
    const [songs, setSongs] = useState([]); // ✅ تعريف `songs` كمصفوفة

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/Songs")
            .then(response => {
                console.log("البيانات المستلمة من API:", response.data); // ✅ طباعة البيانات المستلمة

                // تحويل بيانات API إلى الأسماء المناسبة
                const formattedSongs = response.data.map(song => ({
                    id: song.id,
                    title: song.title,       // ✅ تغيير title إلى name
                    artist: song.artist_name, // ✅ تغيير artist_name إلى artist
                    cover_url: song.cover_url,   // ✅ تغيير cover_url إلى imgScr
                    song_url: song.song_url,       // ✅ تغيير song_url إلى url
                }));
                setSongs(formattedSongs); // ✅ تحديث الحالة بالبيانات الجديدة
            })
            .catch(error => console.error("حدث خطأ أثناء جلب الأغاني:", error));
    }, []);

    return (
        <>
            {songs.map((song) => ( // ✅ استخدام `songs` مباشرة
                <div className='flex flex-col' key={song.id}>
                    <div className='flex flex-row gap-4'>
                        <img src={song.cover_url} className='rounded-xl w-48 h-48' alt="song" />
                        <div className='flex flex-col justify-around'>
                            <div>
                                <h3 className='font-bold text-2xl mb-2'>{song.title}</h3>
                                <p className='text-xl'>{song.artist_name}</p>
                            </div>
                            <div className='flex flex-row gap-2 mt-4'>
                                <MdOutlineReplay size={24}
                                    className='text-2xl text-black hover:text-[#30B797] transition-all'
                                />
                                <LuDownload size={24}
                                    className='text-2xl text-black hover:text-[#30B797] transition-all'
                                    onClick={() => downloadSong(song.song_url)}
                                />
                                <FaRegHeart size={24}
                                    className='text-2xl text-black hover:text-[#30B797] transition-all'
                                    onClick={() => addFavorite(song)}
                                />
                            </div>
                        </div>
                    </div>
                    <Waveform url={song.song_url} />
                </div>
            ))}
        </>
    );
}

export default TrendingSongs;

