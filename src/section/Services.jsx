import React, { useEffect, useState } from 'react';

import TikTokAgencyImg from '../assets/Img/TikTok agency.png';
import MusicDistributionImg from '../assets/Img/Music distribution.png'
import PlatformManagement from '../assets/Img/Platform Management.png'
import Socialmedia from '../assets/Img/Social media.png'
import clothing from '../assets/Img/clothing.png'
import programming from '../assets/Img/programming.png'
import ServicesBox from '../Components/servicesBox';

import { getServices } from '../actions/getServices';



const Services = () => {

    const ServicesD = [
        {
            "id": 1,
            title: "Music distribution",
            description: "We ensure your music reaches the right audience, wherever they are in the world.",
            img: MusicDistributionImg,
            link: "https://servicesLInk",
            bg: "#6017DC",
            comingSoon: true
        },
        {
            "id": 2,
            title: "Platform Management",
            description: "Seamlessly upload your tracks, albums, and visuals to all major platforms.",
            img: PlatformManagement,
            link: "/Services",
            bg: "#DFF7EA",
        },
        {
            "id": 3,
            title: "Social media",
            description: "Creative posts and stories that showcase your style and connect with fans.",
            img: Socialmedia,
            link: "/Services",
            bg: "#6017DC",
        },
        {
            "id": 4,
            title: "Clothes Store",
            description: "Shop trendy, high-quality fashion with fast delivery and easy returns.",
            img: clothing,
            link: "",
            facebook_Link:"/jj",
            instagram_Link:"/jj",
            twitter_Link:"/jj",
            bg: "#DFF7EA",
        },
        {
            "id": 5,
            title: "Programming services",
            description: "Expert web, app, and software development tailored to your needs.",
            img: programming,
            link: "/",
            bg: "#6017DC",
            comingSoon: true
        },
        {
            "id": 6,
            title: "TikTok agency",
            description: "Easily share your content and campaigns on TikTok to reach your fans",
            img: TikTokAgencyImg,
            link: "https://servicesLInk",
            bg: "#29A49F",
            comingSoon: true
        }
    ]
    const getTextColor = (bgColor) => {
        let r, g, b;

        if (bgColor.startsWith("#")) {
            const hex = bgColor.slice(1);
            if (hex.length === 3) {
                r = parseInt(hex[0] + hex[0], 16);
                g = parseInt(hex[1] + hex[1], 16);
                b = parseInt(hex[2] + hex[2], 16);
            } else {
                r = parseInt(hex.slice(0, 2), 16);
                g = parseInt(hex.slice(2, 4), 16);
                b = parseInt(hex.slice(4, 6), 16);
            }
        } else if (bgColor.startsWith("rgb")) {
            const rgbValues = bgColor.match(/\d+/g);
            if (rgbValues) {
                [r, g, b] = rgbValues.map(Number);
            }
        }
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? "black" : "white";
    };




    return (
        <div className={`py-20 bg-cover bg-white`}>
            <div data-aos="zoom-in" className="container m-auto">
                <p className='text-center font-bold text-xl text-[#29A49F] mb-4'>Satisfy Solution</p>
                <h2 className='text-center text-4xl font-bold mb-6'>The Best Services we provide</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-12">
                    {/* replace ServicesD  */}
                    {ServicesD.map((service, index) => (
                        <div key={index}>
                            <ServicesBox
                                bgColor={service.bg}
                                textColor={getTextColor(service.bg)}
                                title={service.title}
                                description={service.description}
                                link={service.link}
                                img={service.img}
                                comingSoon={service.comingSoon}
                                facebook_Link={service.facebook_Link}
                                instagram_Link={service.instagram_Link}
                                twitter_Link={service.twitter_Link}
                            />
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Services;
