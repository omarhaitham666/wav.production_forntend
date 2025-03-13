import React from 'react';
import comingSoon from '../assets/Img/comming Soon.png'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

const ServicesBox = (props) => {

    return (
        <div key={props.key} className={`services-box overflow-hidden relative rounded-3xl p-8 min-h-[300px]`} style={{
            backgroundColor: props.bgColor,
            color: props.textColor
        }
        }>
            <div className='flex flex-col sm:items-start items-center text-center sm:text-start sm:w-2/3'>
                <h2 className='mb-2 whitespace-pre-line text-3xl'>{props.title}</h2>
                <p className='mb-6 text-lg'>{props.description}</p>
                {!props.link ?
                    <div className="flex flex-row items-center gap-3 mt-6 text-2xl text-gray-700 transition-all">
                        <a className='hover:text-[#6017DC] transition-all' href={props.facebook_Link}>
                            <FaFacebook />
                        </a>
                        <a className='hover:text-[#6017DC] transition-all' href={props.instagram_Link}>
                            <FaInstagram />
                        </a>
                        <a className='hover:text-[#6017DC] transition-all' href={props.tiktok_Link}>
                            <FaTiktok />
                        </a>
                    </div>
                    :
                    !props.comingSoon ?
                        <a href={`Services${props.link}`} className="rounded-full py-3 px-6 bg-white text-black font-bold border border-white hover:bg-transparent hover:text-white transition">Read More</a>
                        : <span className="rounded-full py-3 px-6 bg-white text-black font-bold border border-white cursor-default">Coming Soon..</span>
                }
            </div>
            <img src={props.img} className='absolute bottom-0 right-0 hidden sm:block' alt="service Img" />
            {props.comingSoon ?
                <img src={comingSoon} className='absolute top-4 right-0 hidden sm:block' alt="comingSoon" />
                :
                null
            }
        </div>
    );
}

export default ServicesBox;
