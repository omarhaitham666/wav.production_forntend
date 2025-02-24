import React, { useEffect, useState } from 'react';
import OrderVideoBox from '../../Components/OrderVideoBox';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { FaSearch } from 'react-icons/fa';
import { getVideosOrder } from '../../actions/getVideosOrder';

const ITEMS_PER_PAGE = 12;
const OrderVideo = () => {
    const [currentPage, setCurrentPage] = useState(1);
    // const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [openModel, setOpenModel] = useState(false);


    const orders = [
        {
            id: 1,
            artist: 'Mohamed gamal',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/100/200/300'
        },
        {
            id: 2,
            artist: 'Mohamed fthey',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/101/200/300'
        },
        {
            id: 3,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/102/200/300'
        },
        {
            id: 4,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/103/200/300'
        },
        {
            id: 5,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/104/200/300'
        },
        {
            id: 6,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/105/200/300'
        },
        {
            id: 7,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/106/200/300'
        },
        {
            id: 8,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/107/200/300'
        },
        {
            id: 9,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/108/200/300'
        },
        {
            id: 10,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/109/200/300'
        },
        {
            id: 11,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/110/200/300'
        },
        {
            id: 12,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/111/200/300'
        },
        {
            id: 13,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/112/200/300'
        },
        {
            id: 14,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/113/200/300'
        },
        {
            id: 15,
            artist: 'Mohamed medo',
            position: "TikToker",
            price: 50,
            image: 'https://picsum.photos/id/114/200/300'
        }
    ]


    // useEffect(() => {
    //     const order = getVideosOrder()
    //     setOrders(order);
    // }, []);


    useEffect(() => {
        const filteredProducts = orders.filter((order) =>
            order.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.position.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredProducts(filteredProducts);
        setCurrentPage(1);

    }, [searchTerm]);


    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);


    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedorders = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // وظائف التنقل بين الصفحات
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    const handleVideoClick = (orderd) => {
        console.log(orderd)
        setOpenModel(true);
    }



    return (
        <div className={`py-40 bg-white`}>
            <div className="container mx-auto">
                <div className='w-full px-4 py-3 rounded-sm mb-4 bg-[#F4F5F7] flex flex-row gap-2 items-center text-gray-500 '>
                    <FaSearch />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-sm border-0 outline-0 bg-[#F4F5F7]"
                    />
                </div>
                {displayedorders.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-8">
                        {displayedorders.map(order => (
                            <OrderVideoBox key={order.id}
                            artistName={order.artist}
                            position={order.position}
                            price={order.price}
                            image={order.image}
                            handleVideoClick={handleVideoClick}
                            />
                        ))}
                    </div>
                    : (
                        <div className="text-center text-gray-400 mt-10 text-3xl">لا توجد منتجات مطابقة للبحث</div>
                    )
                }
                <div className="flex justify-center mt-8 gap-2">
                    <button onClick={prevPage} disabled={currentPage === 1}
                        className="p-2 text-xl cursor-pointer border border-[#30B797] hover:bg-white hover:text-[#30B797] bg-gray-300 text-white rounded-full">
                        <FcPrevious />
                    </button>
                    <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
                    <button onClick={nextPage} disabled={currentPage === totalPages}
                        className="p-2 text-xl cursor-pointer border border-[#30B797] hover:bg-white hover:text-[#30B797] bg-[#30B797] text-white rounded-full">
                        <FcNext />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderVideo;
