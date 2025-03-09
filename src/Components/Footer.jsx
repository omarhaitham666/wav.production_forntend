import React from 'react'
import logo from "../assets/Img/logo.png"
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';
import { LinksData } from './LinksData';
import { Link } from 'react-router-dom';
import { FaPhoneVolume } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

function Footer() {

  return (


    <footer className="bg-[#0A142F]">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center justify-center md:justify-normal">
              <img src={logo} className="w-48 md:w-full me-3" alt="wav.Logo" />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-bold text-white uppercase">Learn More</h2>
              <ul className="text-gray-500 font-medium">
                {LinksData.map((link) => {
                  return (
                    <li key={link.id} className="mb-4">
                      <Link to={link.to} className="hover:underline">
                        {link.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold text-white uppercase">Privacy Policy</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="/Terms-of-Use" className="hover:underline ">Terms of Use</a>
                </li>
                <li className='mb-4'>
                  <a href="/Cookie" className="hover:underline">Cookie Settings</a>
                </li>
                <li>
                  <a href="/Policy" className="hover:underline">Policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold text-white uppercase">Contact Us</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4 hover:text-[#30B797] transition">
                  <span>Office:</span>
                  <a href="tel:+201006695204" className="hover:underline">+201006695204</a>
                </li>
                <a href='http://wa.me/+201006695204' className='flex items-center gap-2 mb-4 hover:text-[#30B797] transition'>
                  <FaPhoneVolume />
                  <span>+201006695204</span>
                </a>
                <a href='mailto:support@cloudwavproduction.com' className='flex items-center gap-2 mb-4 hover:text-[#30B797] transition'>
                  <IoMdMail />
                  <span>support@cloudwavproduction.com</span>
                </a>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold text-white uppercase">Social</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4 flex flex-row gap-4 items-center">
                  <a href="#" className="hover:underline text-2xl hover:text-[#29a49f]">
                    <AiFillFacebook />
                  </a>
                  <a href="#" className="hover:underline text-2xl hover:text-[#29a49f]">
                    <AiFillInstagram />
                  </a>
                  <a href="#" className="hover:underline text-2xl hover:text-[#29a49f]">
                    <AiFillTwitterCircle />
                  </a>
                  <a href="#" className="hover:underline text-2xl hover:text-[#29a49f]">
                    <AiFillYoutube />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="/" className="hover:underline">Could.wav</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>

  )
}

export default Footer;