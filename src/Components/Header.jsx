import React, { useContext, useEffect, useState } from 'react'
import logo from '/logo.svg'
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { useTranslation } from 'react-i18next';
import LinksData from './LinksData';
import useLinksData from './LinksData';
import { FaAngleRight } from 'react-icons/fa';

function Header({ isScrolled }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { token, user } = useContext(AppContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openUserDrop, setOpenUserDrop] = useState(false);




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
            <ul className={`lg:flex flex-wrap items-center list-none ml-auto hidden ${isNavOpen ? "showMenuNav" : "hideMenuNav"}`}>
              {links?.map((link) => {
                return (
                  <li key={link.id} className={`nav-item relative ${isScrolled === false ? "lg:text-white" : "lg:text-black"} text-white`}>
                    {link.menu ? (
                      <div
                        onMouseEnter={() => setMenuOpen(true)}
                        onMouseLeave={() => setMenuOpen(false)}
                        className="relative"
                      >
                        <button className={`px-3 py-2 text-lg font-medium leading-5 hover:text-gray-300 ${link.current ? 'text-gray-300' : ''}`}>
                          {link.title}
                        </button>
                        {isMenuOpen && (
                          <div className="lg:absolute top-full left-0 mt-2 lg:bg-white shadow-lg rounded-lg w-72 text-lg">
                            <ul className="flex flex-col pt-2">
                              {link.menu.map((submenu) => (
                                <li
                                  key={submenu.id}
                                  className="relative lg:text-black text-white"
                                  onMouseEnter={() => setOpenSubMenu(submenu.id)}
                                  onMouseLeave={() => setOpenSubMenu(null)}
                                >
                                  {submenu.comingSoon ? (
                                    <span className="block px-4 py-2 text-gray-400 cursor-not-allowed">
                                      {submenu.title} (Coming Soon)
                                    </span>
                                  ) : (
                                    submenu.SocialLnks ?
                                      <div
                                        className="flex flex-row justify-between items-center px-4 py-2  lg:hover:bg-gray-100"
                                      >
                                        {submenu.title}
                                        {submenu.SocialLnks &&
                                          <FaAngleRight />
                                        }
                                      </div>
                                      :
                                      <Link
                                        to={submenu.to}
                                        className="flex flex-row justify-between px-4 py-2 lg:hover:bg-gray-100"
                                      >
                                        {submenu.title}
                                      </Link>
                                  )}

                                  {submenu.SocialLnks && openSubMenu === submenu.id && (
                                    <div className="lg:absolute left-full w-full top-0 bg-white shadow-lg rounded-lg lg:w-48">
                                      <ul className="flex flex-col pt-2">
                                        {submenu.SocialLnks.map((social, index) => (
                                          <li key={index} className="p-2 lg:hover:bg-gray-100">
                                            <a href={social.iconLink} className="text-lg flex flex-row justify-between text-gray-500 hover:text-[#30B797]">
                                              {social.icon}
                                              {social.title}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>

                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link to={link.to} className={`px-3 py-2 text-lg font-medium leading-5 ${link.current ? 'text-gray-300' : ''}`}>
                        {link.title}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
            {isNavOpen ?
              <span className='absolute top-[80px] right-20 font-bold text-4xl cursor-pointer text-white z-10' onClick={() => setIsNavOpen(false)}><MdClose /></span> : ""}
          </div>
          <div className={`flex flex-row gap-8`}>

            {token ?
              <li className="nav-item relative p-2 w-10 h-10 border bg-white border-black flex items-center justify-center rounded-full"
                onClick={
                  () => {
                    setOpenUserDrop(!openUserDrop)
                  }
                }>
                <img src={logo} className='' alt="user" />
                {openUserDrop ?
                  <div id="dropdown" class="z-10 absolute top-10 flex flex-col bg-white divide-y divide-gray-100 rounded-lg shadow-sm px-4">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                      <li>
                        <h2 className='font-bold mb-4 text-2xl'>
                          {t("Hello")} {user?.username}
                        </h2>
                      </li>
                      <li>
                        <button
                          onClick={
                            () => {
                              localStorage.removeItem('token');
                              window.location.href = "/";
                            }
                          }
                          class="text-[#E6F6F2] bg-[#2F00AC] font-bold border border-[#2F00AC] py-2 rounded-xl px-6">{t("Signout")}</button>
                      </li>
                    </ul>
                  </div>
                  :
                  ""}

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
            <button
              onClick={toggleLanguage}
              className="text-[#E6F6F2] bg-[#2F00AC] font-bold border border-[#2F00AC] py-2 rounded-xl px-6"
            >
              {i18n.language === "en" ? "Ar" : "EN"}
            </button>
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
        </div>
      </nav>
    </header>
  )
}

export default Header