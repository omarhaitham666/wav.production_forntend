import React, { useEffect, useState } from 'react';
import PlayingHero from '../../Components/PlayingHero';
import Sidebar from '../../Components/sidebar';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight, FaDownload, FaHeart, FaPlay } from 'react-icons/fa';
import { getArtists } from '../../actions/getArtists';
import logo from '../../assets/Img/logo.png'


const Playing = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    // const [artists ,setArtists] = useState([])
    // const [albums ,setAlbums] = useState([])
    // const [songs ,setSongs] = useState([])
    const [browseFilter, setBrowserFilter] = useState("")
    const [genresFilter, setGenresFilter] = useState("")
    const [currentSong, setCurrentSong] = useState({})
    const [currentAlbum, setCurrentAlbum] = useState({})
    const [currentArtist, setCurrentArtist] = useState({})
    const [currentPlaylist, setCurrentPlaylist] = useState({})
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // get filters from localStorage
        const browseFilter = localStorage.getItem('BrowseFilter') || "";
        const genresFilter = localStorage.getItem('GenresFilter') || "";
        setBrowserFilter(browseFilter);
        setGenresFilter(genresFilter);

    }, [browseFilter,genresFilter])

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "BrowseFilter") {
                setBrowserFilter(event.newValue || "");
            }
            if (event.key === "GenresFilter") {
                setGenresFilter(event.newValue || "");
            }
        };

        window.addEventListener("storage", handleStorageChange);
        console.log(browseFilter)
        console.log(genresFilter)

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);



    // useEffect(()=>{
    //     setLoading(true)

    //     // getArtists
    //     const getArtists = async () => {
    //         const artists = await getArtists();
    //     setArtists(artists)
    //     }

    //     // getAlbums
    //     const getAlbums = async () => {
    //         const albums = await getAlbums()
    //         setAlbums(albums)
    //     }

    //     // getSongs
    //     const getSongs = async () => {
    //         const songs = await getSongs()
    //         setSongs(songs)
    //     }

    //     setLoading(false)
    // },[])



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

    const Artists = [
        {
            id: 1,
            name: "Artist 1",
            imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
            link: "",
        },
        {
            id: 2,
            name: "Artist 2",
            imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
            link: "",
        },
        {
            id: 3,
            name: "Artist 3",
            imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
            link: "",
        },
        {
            id: 4,
            name: "Artist 4",
            imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
            link: "",
        },
        {
            id: 5,
            name: "Artist 5",
            imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
            link: "",
        },
        {
            id: 6,
            name: "Artist 6",
            imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
            link: "",
        },
    ]

    const albums = [
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
    ]

    const songs = [
        {
            id: 1,
            name: "Song 1",
            imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
            link: "",
            artist: "Artist 1",
            album: "Album 1",
        },
        {
            id: 2,
            name: "Song 2",
            imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
            link: "",
            artist: "Artist 2",
            album: "Album 2",
        },
        {
            id: 3,
            name: "Song 3",
            imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
            link: "",
            artist: "Artist 3",
            album: "Album 3",
        },
        {
            id: 4,
            name: "Song 4",
            imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
            link: "",
            artist: "Artist 4",
            album: "Album 4",
        },
        {
            id: 5,
            name: "Song 5",
            imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
            link: "",
            artist: "Artist 5",
            album: "Album 5",
        },
        {
            id: 6,
            name: "Song 6",
            imgScr: "https://i.imgur.com/6Q6Zz4B.jpg",
            link: "",
            artist: "Artist 6",
            album: "Album 6",
        },
    ]





    return (
        <>
            <PlayingHero />
            <div className="py-8">
                <div className="container mx-auto">
                    <div className='flex flex-col lg:flex-row gap-4'>
                        <Sidebar />
                        <div className='flex flex-col gap-4 w-full lg:w-3/4'>
                            {loading ?
                                <div className="flex flex-col items-center justify-center py-14" role="status">
                                    <img src={logo} className='w-64 mb-10 animate-pulse' alt="" />
                                    <span className="
                                    text-center text-3xl font-bold animate-pulse
                                    ">Loading...</span>
                                </div>
                                : browseFilter === "" ?
                                    <>
                                        <div className='slider-container relative mt-16'>
                                            <h2 className='text-start text-3xl font-bold mb-12'>Popular artists</h2>
                                            <Slider {...settings}>
                                                {
                                                    Artists?.map((i) => {
                                                        return (
                                                            <div key={i.id} data-current-slide={currentSlide}>
                                                                <div className='flex flex-col items-center justify-center relative ArtistsBox'>
                                                                    <img className='w-36 h-36 rounded-full' src={i.imgScr} />
                                                                    <a href={`/Artists/${i.name}`} className='text-2xl mt-2 font-bold'>{i.name}</a>
                                                                    <span onClick={() => {
                                                                        setCurrentArtist(
                                                                            i
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
                                            <h2 className='text-start text-3xl font-bold mb-12'>Popular Albums</h2>
                                            <Slider {...settings}>
                                                {
                                                    albums?.map((i) => {
                                                        return (
                                                            <div key={i.id}>
                                                                <div className='flex flex-col relative ArtistsBox'>
                                                                    <img className='w-36 h-36 rounded-xl' src={i.imgScr} />
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
                                                            </div>

                                                        )
                                                    })
                                                }
                                            </Slider>
                                        </div>
                                        <div className='slider-container relative mt-16'>
                                            <h2 className='text-start text-3xl font-bold mb-12'>Popular songs</h2>
                                            <Slider {...settings}>
                                                {
                                                    songs?.map((i) => {
                                                        return (
                                                            <div key={i.id}>
                                                                <div className='flex flex-col'>
                                                                    <div className='relative ArtistsBox'>
                                                                        <img className='w-36 h-36 rounded-xl' src={i.imgScr} />
                                                                        <span onClick={() => {
                                                                            setCurrentAlbum(
                                                                                i
                                                                            )
                                                                            setIsPlaying(true)
                                                                        }}
                                                                            className='playbtn cursor-pointer opacity-0 transition-all absolute bottom-2 right-2 bg-[#30B797] text-white hover:bg-[1f8d73] text-sm p-2 rounded-full'>
                                                                            <FaPlay />
                                                                        </span>
                                                                        <div className='flex flex-row items-center gap-2.5 playbtn cursor-pointer opacity-0 transition-all absolute bottom-2 left-2  text-white text-lg'>
                                                                            <FaDownload onClick={
                                                                                () => {
                                                                                    downloadFile(i.link)
                                                                                }
                                                                            } />
                                                                            <FaHeart onClick={
                                                                                () => {
                                                                                    addFavorite(i.id)
                                                                                }
                                                                            } />
                                                                        </div>
                                                                    </div>
                                                                    <div className='flex flex-col'>
                                                                        <h3 className='text-start text-2xl mt-2 font-bold'>{i.name}</h3>
                                                                        <a href={`/${i.artist}`} className='text-start text-sm hover:text-[#30B797] transition-all text-gray-400'>{i.artist}</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Slider>
                                        </div>
                                    </>
                                    :
                                    <div className='flex flex-col items-center justify-center text-xl text-gray-400'>
                                        <p>No content found.</p>
                                        {browseFilter}
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Playing;
