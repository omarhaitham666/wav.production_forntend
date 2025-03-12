import React, { useContext, useEffect, useState } from 'react'
import logo from '../../public/logo.svg'
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { useTranslation } from 'react-i18next';
import LinksData from './LinksData';
import useLinksData from './LinksData';

function Header({ isScrolled }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { token, user } = useContext(AppContext);

  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const links = useLinksData();
  const { t } = useTranslation();



  return (
    <header>
      <nav className={`${isScrolled === false ? 'bg-transparent' : ''}bg-white shadow-2xl transition-all duration-500 z-50 fixed top-0 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 w-full`}>
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="flex items-center gap-12">
            <Link to={"/"} className="">
              <img src={logo} alt="Cloud.wav" className="max-w-[150px]" />
            </Link>
            <ul className={`lg:flex flex-wrap list-none ml-auto hidden ${isNavOpen ? "showMenuNav" : "hideMenuNav"}`}>
              {links?.map((link) => {
                return (
                  <li key={link.id} className="nav-item relative">
                    <Link to={link.to} className={`px-3 py-2 text-lg font-medium leading-5 ${isScrolled === false ? "text-white" : "text-black"} hover:text-gray-300 ${link.current ? 'text-gray-300' : ''}`}>
                      {link.title}
                    </Link>
                  </li>
                )
              })}

              {user ?
                <li className="nav-item relative">
                  <Link to={"/Profile"} className="w-14 h-14 rounded-full">
                    <img src={user.img} alt="user" />
                  </Link>
                </li>
                : <>
                  <div className={`flex flex-row gap-4 ${isNavOpen ? "block" : "hidden"}`}>
                    <Link to={'/Login'} className="text-[#2F00AC] bg-[#E6F6F2] font-bold border border-[#E6F6F2] hover:bg-transparent hover:text-[#E6F6F2] py-3 rounded-xl px-6">
                      {t("login")}
                    </Link>
                    <Link to={'/Register'} className="text-[#E6F6F2] bg-[#2F00AC] font-bold border border-[#2F00AC] hover:bg-transparent py-3 rounded-xl px-6">
                    {t("SignUp")}
                    </Link>
                  </div>
                </>}
            </ul>
            {isNavOpen ?
              <span className='absolute top-[80px] right-20 font-bold text-4xl cursor-pointer text-white z-10' onClick={() => setIsNavOpen(false)}><MdClose /></span> : ""}
          </div>
          <div className={`flex flex-row gap-8`}>
            <div className={`hidden flex-row gap-4 lg:flex`}>
              <Link to={'/Login'} className={`${isScrolled ? "hover:bg-[#2F00AC] hover:text-[#E6F6F2]" : "hover:bg-transparent hover:text-[#2F00AC]"} text-[#2F00AC] bg-[#E6F6F2] font-bold border border-[#E6F6F2]  py-3 rounded-xl px-6`}>
                {t("login")}
              </Link>
              <Link to={'/Register'} className={`${isScrolled ? "hover:text-[#2F00AC]" : ""} hover:bg-transparent text-[#E6F6F2] bg-[#2F00AC] font-bold border border-[#2F00AC] py-3 rounded-xl px-6`}>
              {t("SignUp")}
              </Link>
            </div>
            <button className="lg:hidden text-[#2F00AC] text-3xl font-bold border border-[#2F00AC] hover:bg-transparent hover:text-[#E6F6F2] py-2 px-4 rounded-xl"
              onClick={
                () => setIsNavOpen(!isNavOpen)
              }
            >
              {
                isNavOpen ? <MdClose /> : <MdMenu />
              }
            </button>
          </div>
          <button
                onClick={toggleLanguage}
                className="text-[#E6F6F2] bg-[#2F00AC] font-bold border border-[#2F00AC] py-2 rounded-xl px-6"
              >
                {i18n.language === "en" ? "Ar" : "EN"}
              </button>
        </div>
      </nav>
    </header>
  )
}

export default Header