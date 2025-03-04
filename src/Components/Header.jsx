import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/Img/logo.png'
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { token, user } = useContext(AppContext);

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
    <header>
      <nav className={`${isScrolled? 'bg-black shadow-2xl' :'bg-transparent'} transition-all duration-500 z-50 fixed top-0 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 w-full`}>
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="flex items-center gap-12">
            <Link to={"/"} className="">
              <img src={logo} alt="Cloud.wav" className="max-w-[150px]" />
            </Link>
            <ul className={`lg:flex flex-wrap list-none ml-auto hidden ${isNavOpen ? "showMenuNav" : "hideMenuNav"}`}>
              <li className="nav-item relative">
                <Link to={"/"} className="px-3 py-2 text-sm font-medium leading-5 text-white hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li className="nav-item relative">
                <Link to={"/Features"} className="px-3 py-2 text-sm font-medium leading-5 text-white hover:text-gray-300">
                  Features
                </Link>
              </li>
              <li className="nav-item relative">
                <Link to={"/Pricing"} className="px-3 py-2 text-sm font-medium leading-5 text-white hover:text-gray-300">
                  Pricing
                </Link>
              </li>
              <li className="nav-item relative">
                <Link to={"/FAQs"} className="px-3 py-2 text-sm font-medium leading-5 text-white hover:text-gray-300">
                  FAQs
                </Link>
              </li>
              <li className="nav-item relative">
                <Link to={"/Contact"} className="px-3 py-2 text-sm font-medium leading-5 text-white hover:text-gray-300">
                  Contact
                </Link>
              </li>
              {user?
              <li className="nav-item relative">
                <Link to={"/Profile"} className="w-14 h-14 rounded-full">
                <img src={user.img} alt="user" />
                </Link>
              </li>
              :<>
              <div className={`flex flex-row gap-4 ${isNavOpen ? "block" : "hidden"}`}>
              <Link to={'/Login'} className="text-[#2F00AC] bg-[#E6F6F2] font-bold border border-[#E6F6F2] hover:bg-transparent hover:text-[#E6F6F2] py-3 rounded-xl px-6">
                Login
              </Link>
              <Link to={'/Register'} className="text-[#E6F6F2] bg-[#2F00AC] font-bold border border-[#2F00AC] hover:bg-transparent py-3 rounded-xl px-6">
                Sign Up
              </Link>
            </div>
            </>}
            </ul>
            {isNavOpen ?
              <span className='absolute top-[80px] right-20 font-bold text-4xl cursor-pointer text-white z-10' onClick={() => setIsNavOpen(false)}><MdClose /></span> : ""}
          </div>
          <div className={`flex flex-row gap-8`}>
            <div className={`hidden flex-row gap-4 lg:flex`}>
              <Link to={'/Login'} className="text-[#2F00AC] bg-[#E6F6F2] font-bold border border-[#E6F6F2] hover:bg-transparent hover:text-[#E6F6F2] py-3 rounded-xl px-6">
                Login
              </Link>
              <Link to={'/Register'} className="text-[#E6F6F2] bg-[#2F00AC] font-bold border border-[#2F00AC] hover:bg-transparent py-3 rounded-xl px-6">
                Sign Up
              </Link>
            </div>
            <button className="lg:hidden text-[#2F00AC] bg-[#E6F6F2] text-3xl font-bold border border-[#E6F6F2] hover:bg-transparent hover:text-[#E6F6F2] py-2 px-4 rounded-xl"
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