import React, { useState } from 'react'
import logo from '../assets/Img/logo.png'
import { MdMenu, MdClose } from "react-icons/md";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <header>
      <nav className="bg-transparent z-50 fixed top-0 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 w-full">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="flex items-center gap-12">
            <a href="/" className="">
              <img src={logo} alt="Cloud.wav" className="max-w-[150px]" />
            </a>
            <ul className={`lg:flex flex-wrap list-none ml-auto hidden ${isNavOpen ? "showMenuNav" : "hideMenuNav"}`}>
              <li className="nav-item relative">
                <a href="#" className="px-3 py-2 text-sm font-medium leading-5 text-white hover:text-gray-300">
                  Home
                </a>
              </li>
              <li className="nav-item relative">
                <a href="/Features" className="px-3 py-2 text-sm font-medium leading-5 text-white hover:text-gray-300">
                  Features
                </a>
              </li>
              <li className="nav-item relative">
                <a href="/Pricing" className="px-3 py-2 text-sm font-medium leading-5 text-white hover:text-gray-300">
                  Pricing
                </a>
              </li>
              <li className="nav-item relative">
                <a href="/FAQs" className="px-3 py-2 text-sm font-medium leading-5 text-white hover:text-gray-300">
                  FAQs
                </a>
              </li>
              <li className="nav-item relative">
                <a href="/Contact" className="px-3 py-2 text-sm font-medium leading-5 text-white hover:text-gray-300">
                  Contact
                </a>
              </li>
              <div className={`flex flex-row gap-4 ${isNavOpen ? "block" : "hidden"}`}>
              <a href='/Login' className="text-[#2F00AC] bg-[#E6F6F2] font-bold border border-[#E6F6F2] hover:bg-transparent hover:text-[#E6F6F2] py-3 rounded-xl px-6">
                Login
              </a>
              <a href='/Register' className="text-[#E6F6F2] bg-[#2F00AC] font-bold border border-[#2F00AC] hover:bg-transparent py-3 rounded-xl px-6">
                Sign Up
              </a>
            </div>
            </ul>
            {isNavOpen ?
              <span className='absolute top-[80px] right-20 font-bold text-4xl cursor-pointer text-white z-10' onClick={() => setIsNavOpen(false)}><MdClose /></span> : ""}
          </div>
          <div className={`flex flex-row gap-8`}>
            <div className={`hidden flex-row gap-4 lg:flex`}>
              <a href='/Login' className="text-[#2F00AC] bg-[#E6F6F2] font-bold border border-[#E6F6F2] hover:bg-transparent hover:text-[#E6F6F2] py-3 rounded-xl px-6">
                Login
              </a>
              <a href='/Register' className="text-[#E6F6F2] bg-[#2F00AC] font-bold border border-[#2F00AC] hover:bg-transparent py-3 rounded-xl px-6">
                Sign Up
              </a>
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