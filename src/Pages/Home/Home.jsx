import React, { useState, useEffect } from 'react'
import { FaChevronRight } from "react-icons/fa";
import HeroBg from "../../assets/Img/Rectangle1.png";
import JoinUs from '../../section/JoinUs';
import Services from '../../section/Services';
import Videos from '../../section/videos';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const Home = () => {
  const { t } = useTranslation();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      <Helmet>
        <title>Home | Could.wav</title>
      </Helmet>
      <Header isScrolled={isScrolled} />
      <div className={`py-60 bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${HeroBg})` }}>
        <div className="container m-auto">
          <div className="flex items-center flex-col justify-center content-center">
            <h2 className='text-white lg:text-5xl sm:text-4xl text-3xl font-black mb-8 text-center w-1/3'>{t("intro")}</h2>
            <Link to='/Playing' className="flex flex-row items-center lg:text-2xl md:text-xl text-lg gap-4 px-6 md:px-8 py-4 rounded-full font-bold bg-white text-black hover:bg-[#2F00AC] hover:text-white transition">
              <span>{t("playing")}</span>
              <FaChevronRight />
            </Link>
          </div>
        </div>
      </div>
      <JoinUs />
      <Services />
      <Videos />
      <Footer />
    </>
  )
}

export default Home