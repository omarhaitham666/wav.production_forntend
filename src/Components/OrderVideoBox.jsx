import React, { useState } from 'react';
import { FaAngleRight, FaAngleUp, FaInstagram, FaSnapchat, FaTiktok } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const OrderVideoBox = (props) => {
    const { t } = useTranslation();
    const [openPopUp, setOpenPopUp] = useState(false);

    return (
        <div key={props.key} className='p-4 bg-white border border-[#00000026] shadow-2xl rounded-2xl'>
            <div className='flex justify-between items-start mb-4 relative'>
                <Link to={`/artists/${props.artistName}`}>
                    <img src={props.image} className='rounded-full w-16 h-16' alt="" />
                </Link>
                
                <div className='relative'
                    onMouseEnter={() => setOpenPopUp(true)}
                    onMouseLeave={() => setOpenPopUp(false)}
                >
                    <button
                        className={`${openPopUp ? 'text-[#30B797] bg-white' : "text-white"} bg-[#30B797] font-bold p-2 rounded-full border border-[#30B797] hover:text-[#30B797] hover:bg-white transition-all flex flex-row items-center gap-2 text-lg`}>
                        {t("order_now")}
                        {openPopUp ? <FaAngleUp /> : <FaAngleRight />}
                    </button>
                    {openPopUp && (
                        <div className='rounded-sm bg-white shadow-sm absolute top-10 right-0 w-max'>
                            <button
                                onClick={() => {
                                    props.handleVideoClick({
                                        artistName: props.artistName,
                                        videoType: "Personal"
                                    })
                                }}
                                className='order-popupBtn flex flex-row gap-2 items-center py-4 font-bold px-2 text-lg hover:bg-[#4D39CF] hover:text-white'>
                                {t("personal_video")}
                                <span className='text-[#30B797]'>60 EGP</span>
                                <span className='text-[#4D39CF]'><FaAngleRight /></span>
                            </button>
                            <button
                                onClick={() => {
                                    props.handleVideoClick({
                                        artistName: props.artistName,
                                        videoType: "Business"
                                    })
                                }}
                                className='order-popupBtn flex flex-row gap-2 items-center py-4 font-bold px-2 text-lg hover:bg-[#4D39CF] hover:text-white'>
                                {t("business_video")}
                                <span className='text-[#30B797]'>40 EGP</span>
                                <span className='text-[#4D39CF]'><FaAngleRight /></span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Link to={`/Stars/${props.artistName}`} className='font-bold text-xl cursor-pointer'>{props.artistName}</Link>
            <Link to={`/OrderVideo/${props.position}`} className='text-[#30B797] text-lg block'>{props.position}</Link>
            <div className='my-6 flex flex-row gap-2 items-center'>
                <div className='text-[#43625B] text-lg flex flex-row items-center gap-1'>
                    <FaTiktok />
                    <span>50M</span>
                </div>
                <div className='text-[#43625B] text-lg flex flex-row items-center gap-1'>
                    <FaSnapchat />
                    <span>100M</span>
                </div>
                <div className='text-[#43625B] text-lg flex flex-row items-center gap-1'>
                    <FaInstagram />
                    <span>10M</span>
                </div>
            </div>
            <p className='text-[#43625B] text-lg'>{t("average_video_price")} /
                <span className='font-bold'>{props.price}</span>
            </p>
        </div>
    );
}

export default OrderVideoBox;
