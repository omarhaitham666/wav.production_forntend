import React, { lazy, Suspense, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight, FaDownload, FaHeart, FaPlay } from 'react-icons/fa';
import logo from '/logo.svg'
import { useAudioPlayer } from '../../../Context/AudioPlayerContext';
import { addFavorite, downloadSong } from '../../../actions/songsActions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getArtists } from '../../../actions/getArtists';
import { getTrendingAlbums } from '../../../actions/getSongs';
const PlayingList = ({ filters }) => {
    const { loadSong, togglePlayPause, playing, currentSong, playSong, PlayingList } = useAudioPlayer();

    const [currentSlide, setCurrentSlide] = useState(0);
    // const [artists ,setArtists] = useState([])
    // const [albums ,setAlbums] = useState([])
    // const [songs ,setSongs] = useState([])

    const [currentAlbum, setCurrentAlbum] = useState({})
    const [currentArtist, setCurrentArtist] = useState({})
    const [currentPlaylist, setCurrentPlaylist] = useState({})
    const [songs, setSongs] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState("");
    const [artists, setArtists] = useState([])
    const [Albums, setAlbums] = useState([]);

    const TrendingSongs = lazy(() => import("./TrendingSongs"));
    const TrendingAlbums = lazy(() => import("./TrendingAlbums"));

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/Songs")
            .then(response => {
                const formattedSongs = response.data.map(song => ({
                    id: song.id,
                    title: song.title,
                    artist: song.artist_name,
                    cover_url: song.cover_url,
                    song_url: song.song_url,
                }));

                setSongs(formattedSongs);
            })
            .catch(error => console.error("حدث خطأ أثناء جلب الأغاني:", error));
    }, []);



    // useEffect(() => {
    //     const Artists = getArtists()
    //     setArtists(Artists);
    // }, []);


    // useEffect(() => {
    //     const Albums = getTrendingAlbums()
    //     setAlbums(Albums);
    // }, []);

    

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/Artists")
            .then((response) => {
                setArtists(response.data);
            })
            .catch((error) => console.error("Error fetching artists", error));
    }, []);


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/albums")
            .then(response => {
                console.log("Fetched albums:", response.data);
                setAlbums(response.data);
            })
            .catch(error => console.error("Error fetching albums:", error));
    }, []);


    const settings = {
        dots: false,
        arrows: true,
        nextArrow:
            <div>
                <FaChevronRight />
            </div>
        ,
        prevArrow:
            <div>
                <FaChevronLeft />
            </div>
        ,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: false,
        infinite: true,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    console.log(filters)


    useEffect(() => {
        setLoading(true)
        switch (filters?.browseFilter) {
            case "Trending songs":
                setFiltered("Trending songs");
                break;
            case "Trending Albums":
                setFiltered("Trending Albums");
                break;
            case "Recently Supported":
                setFiltered("Recently Supported");
                break;
            case "Recently Added":
                setFiltered("Recently Added");
                break;
            case "Accounts for You":
                setFiltered("Accounts for You");
                break;
            default:
                setFiltered("All");
        }

        setLoading(false)
    }, [filters])


    useEffect(() => {

        const filteredSongs = songs.filter((song) => song.division.includes(genresFilter));
        setSongs(filteredSongs);

    }, []);


    return (
        <div className='flex flex-col gap-4 w-full lg:w-3/4'>
            {loading ?
                <div className="flex flex-col items-center justify-center py-14" role="status">
                    <img src={logo} className='w-64 mb-10 animate-pulse' alt="" />
                    <span className="
                text-center text-3xl font-bold animate-pulse
                ">Loading...</span>
                </div>
                : filtered === "All" ?
                    <>
                        <div className='slider-container relative'>
                            <h2 className='text-start text-3xl font-bold mb-12'>artists</h2>
                            <Slider {...settings}>
                                {
                                    artists?.map((artist) => {
                                        return (
                                            <div key={artist.id} data-current-slide={currentSlide}>
                                                <div className='flex flex-col items-center justify-center relative ArtistsBox'>
                                                    <img className='w-36 h-36 rounded-full' src={`http://127.0.0.1:8000/storage/${artist.profile_image}`} alt={artist.name} />
                                                    <Link to={`/Artists/${artist.name}`} className='text-2xl mt-2 font-bold'>{artist.name}</Link>
                                                    <span onClick={() => {
                                                        setCurrentArtist(
                                                            artist
                                                        )
                                                        setIsPlaying(true)
                                                    }}
                                                        className='playbtn cursor-pointer opacity-0 transition-all absolute bottom-10 right-0 bg-[#30B797] text-white hover:bg-[1f8d73] text-xl p-4 rounded-full'>
                                                        <FaPlay />
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                        <div className='slider-container relative mt-16'>
                            <h2 className='text-start text-3xl font-bold mb-12'>Albums</h2>
                            {/* <Slider {...settings}>
                                {
                                    albums?.AlbumList?.map((i) => {
                                        return (
                                            <div key={i.id}>
                                                <div className='flex flex-col relative ArtistsBox'>
                                                    <img className='w-36 h-36 rounded-xl' src={i.imgScr} />
                                                    <div className='flex flex-col'>
                                                        <Link to={`/albums/${i.name}`} className='text-start hover:text-[#30B797] transition-all text-2xl mt-2 font-bold'>{i.name}</Link>
                                                        <Link to={`/artist/${i.artist}`} className='text-start hover:text-[#30B797] transition-all text-sm text-gray-400'>{i.artist}</Link>
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
                                            </div>

                                        )
                                    })
                                }
                            </Slider> */}
                            <Slider {...settings}>
                                {Albums.map((album) => (
                                    <div key={album.id}>
                                        <div className='flex flex-col relative ArtistsBox'>

                                            <img className='w-36 h-36 rounded-xl' src={`http://127.0.0.1:8000/storage/${album.album_cover}`} alt={album.title} />
                                            <div className='flex flex-col'>
                                                <Link to={`/albums/${album.id}`} className='text-start hover:text-[#30B797] transition-all text-2xl mt-2 font-bold'>
                                                    {album.title}
                                                </Link>

                                                <Link to={`/artist/${album.artist}`} className='text-start hover:text-[#30B797] transition-all text-sm text-gray-400'>

                                                    {album.artist.name}
                                                </Link>
                                            </div>
                                            <span onClick={() => {
                                                console.log(`Playing album: ${album.title}`);
                                            }}
                                                className='playbtn cursor-pointer opacity-0 transition-all absolute bottom-12 right-0 bg-[#30B797] text-white hover:bg-[1f8d73] text-xl p-4 rounded-full'>
                                                <FaPlay />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className='slider-container relative mt-16'>
                            <h2 className='text-start text-3xl font-bold mb-12'>songs</h2>
                            <Slider {...settings}>
                                {songs?.map((song) => (
                                    <div key={song.id}>
                                        <div className='flex flex-col max-w-36'>
                                            <div className='relative ArtistsBox'>
                                                <img className='w-36 h-36 rounded-xl' src={song.cover_url} alt={song.title} />
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        if (currentSong?.song_url !== song.song_url) {
                                                            playSong(song);
                                                        } else {
                                                            togglePlayPause();
                                                        }
                                                    }}
                                                    className='playbtn cursor-pointer opacity-0 transition-all absolute bottom-2 right-2 bg-[#30B797] text-white hover:bg-[1f8d73] text-sm p-2 rounded-full'>
                                                    <FaPlay />
                                                </span>
                                                <div className='flex flex-row items-center gap-2.5 playbtn cursor-pointer opacity-0 transition-all absolute bottom-2 left-2 text-white text-lg'>
                                                    <FaDownload onClick={() => downloadSong(song.song_url)} />
                                                    <FaHeart onClick={() => addFavorite(song.song_url)} />
                                                </div>
                                            </div>
                                            <div className='flex flex-col'>
                                                <h3 className='text-start text-2xl mt-2 font-bold'>{song.title}</h3>
                                                <Link to={`/${song.artist}`} className='text-start text-sm hover:text-[#30B797] transition-all text-gray-400'>{song.artist}</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </>
                    : filtered === "Trending songs" ?
                        <Suspense fallback={
                            <div className="flex flex-col items-center justify-center py-14" role="status">
                                <img src={logo} className='w-64 mb-10 animate-pulse' alt="" />
                                <span className="text-center text-3xl font-bold animate-pulse">Loading...</span>
                            </div>
                        }>
                            <TrendingSongs />
                        </Suspense>
                        : filtered === "Trending Albums" ?
                            <Suspense fallback={
                                <div className="flex flex-col items-center justify-center py-14" role="status">
                                    <img src={logo} className='w-64 mb-10 animate-pulse' alt="" />
                                    <span className="text-center text-3xl font-bold animate-pulse">Loading...</span>
                                </div>
                            }>
                                <TrendingAlbums />
                            </Suspense>
                            : <div className='flex flex-col items-center justify-center text-xl text-gray-400'>
                                <p>No content found.</p>
                            </div>
            }
        </div >
    );
}

export default PlayingList;
