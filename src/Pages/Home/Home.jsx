import React from 'react'
import { FaChevronRight } from "react-icons/fa";
import HeroBg from "../../assets/Img/Rectangle1.png";
import JoinUs from '../../section/JoinUs';
import Services from '../../section/Services';
import Videos from '../../section/videos';


function Home() {
  return (
    <>
    <div className={`py-60 bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${HeroBg})` }}>
      <div className="container m-auto">
        <div className="flex items-center flex-col justify-center content-center">
          <h2 className='text-white text-5xl font-black mb-8 text-center w-1/3'>Unleash your sound, the world is tuned in</h2>
          <a href='/Playing' className="flex flex-row items-center text-2xl gap-4 px-10 py-4 rounded-full font-bold bg-white text-black hover:bg-[#2F00AC] hover:text-white transition">
            <span>Start Playing</span>
            <FaChevronRight />
          </a>
        </div>
      </div>
    </div>
    <JoinUs />
    <Services />
    <Videos />

    </>
  )
}

export default Home