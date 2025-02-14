import React from 'react';
import Subtract from '../assets/Img/Subtract.png'
import { FiArrowDownRight } from "react-icons/fi";
import joinImg from '../assets/Img/joinImg.png'
import Vector from '../assets/Img/Vector.png'
import Vector2 from '../assets/Img/Vector2.png'
import Vector3 from '../assets/Img/Vector3.png'
import Vector4 from '../assets/Img/Vector4.png'

const JoinUs = () => {
    return (
        <div className={`py-8 bg-cover bg-white`}>
            <div className="container m-auto">
                <div className="flex flex-row gap-14">
                    <div className="lg:w-1/2 w-full flex flex-col lg:items-start items-center mr-8 text-center lg:text-start">
                        <h2 className="text-4xl font-bold text-black mb-4">Join Us and Take Your Music Career to the Next Level! 🎵</h2>
                        <p className="text-2xl mb-8 text-gray-600">Are you an aspiring artist or an established star looking for a platform to support your journey and expand your reach? We are here to be your trusted partner and agent for success!</p>
                        <div className='relative py-12'>
                            <a href='/' className='cursor-pointer'>
                                <button className="relative z-10 px-10 py-4 text-xl rounded-full joinusBtn transition text-white font-bold flex -flex0-row gap-2 items-center">
                                    <span>Join Us Now</span>
                                    <FiArrowDownRight />
                                </button>
                            </a>
                            <img src={Subtract} alt="subtract" className="absolute -right-8 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-0 relative">
                        <div className='absolute h-[650px] w-full overflow-hidden'>
                            <span className='MainbgGradient rounded-t-[132px] w-full h-full absolute top-28'></span>
                            <img src={joinImg} className='absolute top-0 right-0 z-10 w-full h-full' alt="Soinger" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 mx-8 pt-32 relative z-10">
                    <div className="flex flex-col items-start bg-white shadow-2xl rounded-2xl p-6">
                        <img src={Vector} className='' alt="" />
                        <h3 className="text-xl font-bold my-4 text-gray-800">Good Exclusive Features</h3>
                        <p className="text-sm text-gray-600">We provide cutting-edge advertising solutions and exclusive tools, including AI-driven strategies and modern promotional </p>
                    </div>
                    <div className="flex flex-col items-start bg-white shadow-2xl rounded-2xl p-6">
                        <img src={Vector2} className='' alt="" />
                        <h3 className="text-xl font-bold my-4 text-gray-800">Artist Support</h3>
                        <p className="text-sm text-gray-600">Our 24/7 support ensures you're never alone. We provide multiple channels for assistance, including email and WhatsApp, to address all your needs. </p>
                    </div>
                    <div className="flex flex-col items-start bg-white shadow-2xl rounded-2xl p-6">
                        <img src={Vector3} className='' alt="" />
                        <h3 className="text-xl font-bold my-4 text-gray-800">Platforms Management</h3>
                        <p className="text-sm text-gray-600">We professionally manage your platforms, ensuring seamless operations and growth throughout the contract period. </p>
                    </div>
                    <div className="flex flex-col items-start bg-white shadow-2xl rounded-2xl p-6">
                        <img src={Vector4} className='' alt="" />
                        <h3 className="text-xl font-bold my-4 text-gray-800">Earnings and Copyright Protection</h3>
                        <p className="text-sm text-gray-600">We protect your content, secure your rights, and ensure you receive your earnings.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinUs;

