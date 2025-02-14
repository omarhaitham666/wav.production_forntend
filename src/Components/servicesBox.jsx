import React from 'react';

const ServicesBox = (props) => {
    return (
            <div className={`services-box rounded-3xl p-6 flex flex-col items-start bg-[${props.bgColor}] text-white`}>
                <h2 className='mb-2'>{props.title}</h2>
                <p className='mb-6'>{props.discrption}</p>
                <a href="#" className="rounded-full py-3 px-4 bg-white text-black font-bold">Read More</a>
                <img src={props.img} alt="" />
            </div>
    );
}

export default ServicesBox;
