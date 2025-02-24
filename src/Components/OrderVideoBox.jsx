import React, { useState } from 'react';
import art1 from "../assets/Img/art.png"
import { FaAngleDown, FaAngleRight, FaAngleUp, FaInstagram, FaSnapchat, FaTiktok } from 'react-icons/fa';

const OrderVideoBox = (props) => {
    const [openPopUp, setOpenPopUp] = useState(false);
    return (
        <div kay={props.kay} className='p-4 bg-white border border-[#00000026] shadow-2xl rounded-2xl'>
            <div className='flex justify-between items-start mb-4 relative'>
                <img src={props.image} className='rounded-full w-16 h-16' alt="" />
                <button onClick={
                    () => {
                        setOpenPopUp(!openPopUp)
                    }
                }
                    className={`${openPopUp ? 'text-[#30B797] bg-white' : "text-white"} bg-[#30B797]  font-bold p-2 rounded-full border border-[#30B797] hover:text-[#30B797] hover:bg-white transition-all flex flex-row items-center gap-2 text-lg`}>
                    Order Now
                    {openPopUp ?
                        <FaAngleUp /> :
                        <FaAngleRight />}
                </button>
                {openPopUp ?
                    <div className='rounded-sm bg-white shadow-sm absolute top-12 right-0'>
                        <button
                        onClick={() => {
                            props.handleVideoClick("Personal",props.kay)
                        }}
                        className='order-popupBtn flex flex-row gap-2 items-center py-4 font-bold px-2 text-lg hover:bg-[#4D39CF] hover:text-white'>
                            Personal video
                            <span className='text-[#30B797]'>60 EGP</span>
                            <span className='text-[#4D39CF]'><FaAngleRight /></span>
                        </button>
                        <button
                        onClick={() => {
                            props.handleVideoClick("Business",props.kay)
                        }}
                        className='order-popupBtn flex flex-row gap-2 items-center py-4 font-bold px-2 text-lg hover:bg-[#4D39CF] hover:text-white'>
                            Business Work
                            <span className='text-[#30B797]'>40 EGP</span>
                            <span className='text-[#4D39CF]'><FaAngleRight /></span>
                        </button>
                    </div> :
                    ""}
            </div>
            <h2 className='font-bold text-xl'>{props.artistName}</h2>
            <p className='text-[#30B797] text-lg'>{props.position}</p>
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
            <p className='text-[#43625B] text-lg'>Average video price/
                <span className='font-bold'>{props.price}</span>
            </p>
        </div>
    );
}

export default OrderVideoBox;
