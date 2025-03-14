import React from 'react';
import logo from "/logo.svg";
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaPhoneVolume } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { useTranslation } from "react-i18next";
import useLinksData from './LinksData';

function Footer() {
  const { t } = useTranslation();
  const links = useLinksData();

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
              <h2 className="mb-6 text-sm font-bold text-white uppercase">{t("learn_more")}</h2>
              <ul className="text-gray-500 font-medium">
                {links.map((link) => (
                  <li key={link.id} className="mb-4">
                    <Link to={link.to} className="hover:underline">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold text-white uppercase">{t("privacy_policy")}</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="/Terms-of-Use" className="hover:underline">{t("terms_of_use")}</a>
                </li>
                <li>
                  <a href="/Policy" className="hover:underline">{t("policy")}</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold text-white uppercase">{t("contact_us")}</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4 hover:text-[#30B797] transition">
                  <span>{t("office")}:</span>
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
              <h2 className="mb-6 text-sm font-bold text-white uppercase">{t("social")}</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4 flex flex-row gap-4 items-center">
                  <a href="https://www.facebook.com/share/18i8rogaB7/?mibextid=qi2Omg" className="hover:underline text-2xl hover:text-[#29a49f]" target="_blank" rel="noopener noreferrer"> 
                    <AiFillFacebook />
                  </a>
                  <a href="https://www.instagram.com/cloud.wav.production" className="hover:underline text-2xl hover:text-[#29a49f]" target="_blank" rel="noopener noreferrer">
                    <AiFillInstagram />
                  </a>
                  <a href="https://x.com/cloudwavpr" className="hover:underline text-2xl hover:text-[#29a49f]" target="_blank" rel="noopener noreferrer">
                    <AiFillTwitterCircle />
                  </a>
                  <a href="https://youtube.com/@cloudwavproduction?si=L0uXUZSaJ5iGwOaI" className="hover:underline text-2xl hover:text-[#29a49f]" target="_blank" rel="noopener noreferrer">
                    <AiFillYoutube />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025 <a href="/" className="hover:underline">Could.wav</a>. {t("all_rights_reserved")}
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
