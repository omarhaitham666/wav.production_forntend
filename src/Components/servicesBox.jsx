import React from 'react';
import comingSoon from '../assets/Img/comming Soon.png'

const ServicesBox = (props) => {
    return (
        <div id={props.key} className={`services-box overflow-hidden relative rounded-3xl p-8 bg-amber-600 bg-[${props.bgColor}] text-white`}>
            <div className='flex flex-col sm:items-start items-center text-center sm:text-start sm:w-2/3'>
                <h2 className='mb-2 text-3xl'>{props.title}</h2>
                <p className='mb-6 text-lg'>{props.description}</p>
                <a href={props.link} className="rounded-full py-3 px-6 bg-white text-black font-bold border border-white hover:bg-transparent hover:text-white transition">Read More</a>
            </div>
            <img src={props.img} className='absolute bottom-0 right-0 hidden sm:block' alt="service Img" />
            {props.comingSoon?
                <img src={comingSoon} className='absolute top-4 right-0 hidden sm:block' alt="comingSoon" />
                :
                null
                }
        </div>
    );
}

export default ServicesBox;
