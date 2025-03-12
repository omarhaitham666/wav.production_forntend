import React from 'react';
import Subtract from '../assets/Img/Subtract.png'
import { FiArrowDownRight } from "react-icons/fi";
import joinImg from '../assets/Img/joinImg.png'
import Vector from '../assets/Img/Vector.png'
import Vector2 from '../assets/Img/Vector2.png'
import Vector3 from '../assets/Img/Vector3.png'
import Vector4 from '../assets/Img/Vector4.png'
import Aos from 'aos';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const JoinUs = () => {
    const { t } = useTranslation();

    return (
        <div  data-aos="fade-up" className={`py-8 bg-cover bg-white`}>
            <div className="container m-auto">
                <div className="flex lg:flex-row flex-col gap-14">
                    <div className="lg:w-1/2 w-full flex flex-col lg:items-start items-center lg:mr-8 text-center lg:text-start">
                        <h2 className="text-4xl font-bold text-black mb-4">{t("joinush")}</h2>
                        <p className="text-2xl mb-8 text-gray-600">{t("joinusp")}</p>
                        <div className='relative py-12'>
                            <Link to='Contact' className='cursor-pointer'>
                                <button className="relative lg:text-2xl md:text-xl text-lg  z-10 lg:px-10 py-4 px-6 md:px-8 rounded-full joinusBtn transition text-white font-bold flex -flex0-row gap-2 items-center">
                                    <span>{t("joinNow")}</span>
                                    <FiArrowDownRight />
                                </button>
                            </Link>
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
                        <h3 className="text-xl font-bold my-4 text-gray-800">{t("joinus1")}</h3>
                        <p className="text-sm text-gray-600">{t("joinus1p")}</p>
                    </div>
                    <div className="flex flex-col items-start bg-white shadow-2xl rounded-2xl p-6">
                        <img src={Vector2} className='' alt="" />
                        <h3 className="text-xl font-bold my-4 text-gray-800">{t("joinus2")}</h3>
                        <p className="text-sm text-gray-600">{t("joinus2p")}</p>
                    </div>
                    <div className="flex flex-col items-start bg-white shadow-2xl rounded-2xl p-6">
                        <img src={Vector3} className='' alt="" />
                        <h3 className="text-xl font-bold my-4 text-gray-800">{t("joinus3")}</h3>
                        <p className="text-sm text-gray-600">{t("joinus3p")}</p>
                    </div>
                    <div className="flex flex-col items-start bg-white shadow-2xl rounded-2xl p-6">
                        <img src={Vector4} className='' alt="" />
                        <h3 className="text-xl font-bold my-4 text-gray-800">{t("joinus4")}</h3>
                        <p className="text-sm text-gray-600">{t("joinus4")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinUs;

