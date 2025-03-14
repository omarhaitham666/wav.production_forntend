import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getArtist } from '../../actions/getArtists';
import { FaChevronLeft, FaChevronRight, FaDownload, FaHeart, FaPlay, FaSearch, FaUpload } from 'react-icons/fa';
import { AppContext } from '../../Context/AppContext';
import { getRecentlyAddedByArtist, getTrendingByAlbumArtist, getTrendingByArtist } from '../../actions/getSongs';
import Slider from 'react-slick';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';
import { addFavorite, downloadSong } from '../../actions/songsActions';
import { swap } from 'formik';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Artist = () => {
    const { t } = useTranslation();
    const { loadSong, togglePlayPause, playing, currentSong, playSong, PlayingList } = useAudioPlayer();

    const { artistId } = useParams();
    const { token, setToken } = useContext(AppContext);
    const [artist, setArtist] = useState();
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [lastesSongs, setLastesSongs] = useState([]);
    const [trendingSongs, setTrendingSongs] = useState([]);
    const [trendingAlbums, setTrendingAlbums] = useState([]);

    const user = {
        id: '123',
        main: false,
        username: 'testUser',
        email: 'test@test.com',
        followers: 1000,
        following: 500,
        isAdmin: false,
        isPremium: false,
        avatar: 'https://example.com/avatar.jpg',
        bio: 'Hello, I am a test user.',
        created_at: '2021-01-01T12:00:00Z',
        updated_at: '2021-01-01T12:00:00Z',
    }

    // const [artistData, setArtistData] = useState([]);



    //     useEffect(() => {
    //         setArtist(artistId)
    //         const artistData = getArtist(artistId)
    //         setArtistData(artistData)
    // }, [artistId]);


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
        slidesToShow: 5,
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


    const artistData = {
        id: 1,
        name: "John Doe",
        genre: "Rock",
        image: "https://i.imgur.com/6Q6Zz4B.jpg",
        bio: "John Doe is a rock musician from New York City."
    }

    const handleFollow = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://your-api.com/follow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, follow: !isFollowing }),
            });

            if (!response.ok) throw new Error("حدث خطأ!");

            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error("Error:", error);
        }
        setLoading(false);
    };

    // useEffect(() => {
    //     const filteredProducts = orders.filter((order) =>
    //         order.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         order.position.toLowerCase().includes(searchTerm.toLowerCase())
    //     );

    //     setFilteredProducts(filteredProducts);

    // }, [searchTerm]);

    useEffect(() => {

        const LastesSongs = getRecentlyAddedByArtist(artistId)
        setLastesSongs(LastesSongs)

        const TrendingSongs = getTrendingByArtist(artistId)
        setTrendingSongs(TrendingSongs)

        const TrendingAlbums = getTrendingByAlbumArtist(artistId)
        setTrendingAlbums(TrendingAlbums)
    }, [artistId]);




    return (
        <>
            <Helmet>
                <title>Artist | Could.wav</title>
            </Helmet>

            <div className='py-26'>
                <div className="container m-auto">
                    <div className='w-full px-4 py-3 rounded-sm mb-4 bg-[#F4F5F7] flex flex-row gap-2 items-center text-gray-500 '>
                        <FaSearch />
                        <input
                            type="text"
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            className="rounded-sm border-0 w-full outline-0 bg-[#F4F5F7]" />
                    </div>
                    <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8 mt-12">
                        <div className="w-full lg:w-1/3 lg:mr-20 flex flex-col gap-4">
                            <div className='flex flex-col items-center gap-4'>
                                <img src={artistData.image} alt={artistData.name} className='object-cover w-52 h-52 rounded-full' />
                                <h2 className='text-2xl font-bold first-letter:uppercase'>{artistData.name}</h2>
                            </div>
                            {user?.role === "artist" ? (
                                <Link to={"/upload"} className='flex flex-row items-center justify-center gap-1.5 text-lg py-2 px-4 rounded-full bg-[#30B797] text-white border border-[#30B797] hover:text-[#30B797] hover:bg-white transition-all'>
                                    <span>{t("Upload")}</span>
                                    <FaUpload />
                                </Link>
                            ) : (
                                <div className="flex flex-row items-center justify-center gap-4 font-bold">
                                    <button className='flex flex-row items-center gap-1.5 text-lg py-2 px-4 rounded-full bg-[#30B797] text-white border border-[#30B797] hover:text-[#30B797] hover:bg-white transition-all'>
                                        <span>{t("Play")}</span>
                                        <FaPlay />
                                    </button>
                                    <button
                                        onClick={handleFollow}
                                        disabled={loading}
                                        className={`px-4 py-2 rounded-full text-lg transition-all 
            ${isFollowing ? "bg-[#777777] text-white" : "bg-[#30B797] text-white"} 
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        {loading ? t("Processing...") : isFollowing ? t("Following") : t("Follow")}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="w-full lg:w-2/3">
                            <div className='slider-container relative'>
                                <h2 className='text-start text-3xl font-bold mb-12'>Lastest Songs</h2>
                                <Slider {...settings}>
                                    {lastesSongs?.map((song) => (
                                        <div key={song.id}>
                                            <div className='flex flex-col max-w-36'>
                                                <div className='relative ArtistsBox'>
                                                    <img className='w-36 h-36 rounded-xl' src={song.cover_url} alt={song.title} />
                                                    <span
                                                        onClick={() => {
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
                            <div className='slider-container relative mt-16'>
                                <h2 className='text-start text-3xl font-bold mb-12'>Trending Songs</h2>
                                <Slider {...settings}>
                                    {
                                        trendingSongs?.map((song) => {
                                            return (
                                                <div key={song.id}>
                                                    <div className='flex flex-col max-w-36'>
                                                        <div className='relative ArtistsBox'>
                                                            <img className='w-36 h-36 rounded-xl' src={song.cover_url} alt={song.title} />
                                                            <span
                                                                onClick={() => {
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
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                            <div className='slider-container relative mt-16'>
                                <h2 className='text-start text-3xl font-bold mb-12'>Trending Albums</h2>
                                <Slider {...settings}>
                                    {trendingAlbums.map((album) => (
                                        <div key={album.id}>
                                            <div className='flex flex-col relative ArtistsBox'>
                                                <img className='w-36 h-36 rounded-xl' src={`http://127.0.0.1:8000/storage/${album.album_cover}`} alt={album.title} />
                                                <div className='flex flex-col'>
                                                    <Link to={`/albums/${album.name}`} className='text-start hover:text-[#30B797] transition-all text-2xl mt-2 font-bold'>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Artist;
