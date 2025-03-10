import React from 'react';
import playingImg from '../assets/Img/Playing.png'
import { Link } from 'react-router-dom';
const PlayingHero = () => {
    return (
        <div className='pt-24 bg-[#1D212E]'>
            <div className='container m-auto'>
                <div className='flex flex-row items-center justify-center'>
                    <div className='flex flex-col items-end justify-end w-0 lg:w-1/3'>
                        <img src={playingImg} alt='Playing' className='object-cover' />
                    </div>

                    <div className='lg:w-2/3 w-full flex items-center text-center flex-col gap-4 pb-5'>
                        <h2 className='text-4xl font-bold text-white mb-2'>The music platform <span className='text-[#30B797]'>Join Our Platform!</span></h2>
                        <p className='text-xl lg:w-1/2 text-white mb-8'>Our platform helps singers create profiles, share their songs, and connect with fans worldwide to elevate their careers.</p>
                        <Link to="/join us" className='bg-[#30B797] py-4 px-6 text-white font-bold text-2xl border border-[#30B797] rounded-full hover:bg-transparent transition-all hover:text-[#30B797]'>
                            Join us now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayingHero;
