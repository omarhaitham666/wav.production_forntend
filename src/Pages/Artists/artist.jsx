import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtist } from '../../actions/getArtists';
import { FaChevronLeft, FaChevronRight, FaPlay, FaSearch } from 'react-icons/fa';
import { AppContext } from '../../Context/AppContext';

const Artist = () => {
    const { artistId } = useParams();
    const { token, setToken } = useContext(AppContext);
    const [artist, setArtist] = useState();
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

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


    const artistData = {
        id: 1,
        name: "John Doe",
        genre: "Rock",
        image: "https://i.imgur.com/6Q6Zz4B.jpg",
        bio: "John Doe is a rock musician from New York City."
    }

    const handleFollow = async () => {
        setLoading(true); // تفعيل التحميل أثناء الطلب
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
    



    return (
        <div className='py-26'>
            <div className="container m-auto">
                <div className='w-full px-4 py-3 rounded-sm mb-4 bg-[#F4F5F7] flex flex-row gap-2 items-center text-gray-500 '>
                    <FaSearch />
                    <input
                        type="text"
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-sm border-0 outline-0 bg-[#F4F5F7]" />
                </div>
                <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8 mt-12">
                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        <div className='flex flex-col items-center gap-4'>
                            <img src={artistData.image} alt={artistData.name} className='object-cover w-52 h-52 rounded-full' />
                            <h2 className='text-2xl font-bold first-letter:uppercase'>{artistData.name}</h2>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4 font-bold">
                            <button className='flex flex-row items-center gap-1.5 text-lg py-2 px-4 rounded-full bg-[#30B797] text-white border border-[#30B797] hover:text-[#30B797] hover:bg-white transition-all'>
                                <span>Play</span>
                                <FaPlay />
                            </button>
                            <button
                                onClick={handleFollow}
                                disabled={loading}
                                className={`px-4 py-2 rounded-full text-lg transition-all 
                                ${isFollowing ? "bg-[#777777] text-white" : "bg-[#30B797] text-white"} 
                                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {loading ? "Processing..." : isFollowing ? "Following" : "Follow"}
                            </button>

                        </div>
                    </div>
                    <div className="w-full lg:w-2/3"></div>
                </div>
            </div>
        </div>
    );
}

export default Artist;
