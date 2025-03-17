import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaAngleRight, FaAngleUp } from 'react-icons/fa';
import OrderVideoModal from '../OrderVideo/OrderVideoModal';

const Star = () => {
    const { name } = useParams();
    const { t } = useTranslation();
    const [openPopUp, setOpenPopUp] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [orderInfo, setOrderInfo] = useState({});

    const starInfo = {
        id: 1,
        name: "John Doe",
        birthdate: "1975-12-25",
        image: "https://i.imgur.com/6Q6Zz4B.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        genres: ["Rock", "Pop", "Hip-Hop"],
        movies: ["Movie 1", "Movie 2", "Movie 3"],
        albums: ["Album 1", "Album 2", "Album 3"],
        similarStars: ["Star 1", "Star 2", "Star 3"]
    };

    const handleVideoClick = (videoType) => {
        setOrderInfo({
            videoType: videoType,
            artistName: starInfo.name
        });
        setOpenModel(true);
    };

    return (
        <div className='py-24'>
            <div className="container m-auto">
                <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8 mt-12">
                    <div className="w-full lg:w-1/3 lg:mr-20 flex flex-col gap-4">
                        <div className='flex flex-col items-center gap-4'>
                            <img src={starInfo.image} alt={starInfo.name} className='object-cover w-52 h-52 rounded-full' />
                            <h2 className='text-2xl font-bold first-letter:uppercase'>{starInfo.name}</h2>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4 font-bold">
                            <div className='relative'
                                onMouseEnter={() => setOpenPopUp(true)}
                                onMouseLeave={() => setOpenPopUp(false)}>
                                <button className={`${openPopUp ? 'text-[#30B797] bg-white' : "text-white"} bg-[#30B797] font-bold p-2 rounded-full border border-[#30B797] hover:text-[#30B797] hover:bg-white transition-all flex flex-row items-center gap-2 text-lg`}>
                                    {t('order_now')}
                                    {openPopUp ? <FaAngleUp /> : <FaAngleRight />}
                                </button>
                                {openPopUp && (
                                    <div className='rounded-sm bg-white shadow-sm absolute top-10 right-0 w-max'>
                                        <button
                                            onClick={() => handleVideoClick("Personal")}
                                            className='order-popupBtn flex flex-row gap-2 items-center py-4 font-bold px-2 text-lg hover:bg-[#4D39CF] hover:text-white'>
                                            {t('personal_video')}
                                            <span className='text-[#30B797]'>60 EGP</span>
                                            <span className='text-[#4D39CF]'><FaAngleRight /></span>
                                        </button>
                                        <button
                                            onClick={() => handleVideoClick("Business")}
                                            className='order-popupBtn flex flex-row gap-2 items-center py-4 font-bold px-2 text-lg hover:bg-[#4D39CF] hover:text-white'>
                                            {t('business_work')}
                                            <span className='text-[#30B797]'>40 EGP</span>
                                            <span className='text-[#4D39CF]'><FaAngleRight /></span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3">
                        <div className="flex flex-col gap-4">
                            <h2 className='font-bold text-3xl'>{t('star.about')} {starInfo.name}</h2>
                            <p className='text-[#30B797] text-xl'>{starInfo.description}</p>
                            <div className="flex flex-row gap-4 items-center font-bold mt-6">
                                {starInfo.genres.map((genre, index) => (
                                    <span key={index} className='text-[#4D39CF] px-4 py-2 rounded-2xl bg-[#cbc8da] text-lg'>{t(genre)}</span>
                                ))}
                            </div>
                            <div className="flex items-center justify-center mt-6 w-full bg-black rounded-3xl h-60">
                                {t('video')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openModel && (
                <OrderVideoModal
                    handleClose={() => setOpenModel(false)}
                    orderInfo={orderInfo}
                />
            )}
        </div>
    );
}

export default Star;
