import React, { useEffect, useState } from 'react';

import TikTokAgencyImg from '../assets/Img/TikTok agency.png';
import MusicDistributionImg from '../assets/Img/Music distribution.png'
import PlatformManagement from '../assets/Img/Platform Management.png'
import Socialmedia from '../assets/Img/Social media.png'
import ServicesBox from '../Components/servicesBox';

import axios from 'axios';



const Services = () => {
    const ServicesD = [
        {
            "id": 1,
            title: "Music distribution",
            description: "We ensure your music reaches the right audience, wherever they are in the world.",
            img: MusicDistributionImg,
            link: "https://servicesLInk",
            bg: "#6017DC",
        },
        {
            "id": 2,
            title: "Platform Management",
            description: "Seamlessly upload your tracks, albums, and visuals to all major platforms.",
            img: PlatformManagement,
            link: "https://servicesLInk",
            bg: "#DFF7EA",
        },
        {
            "id": 3,
            title: "Social media",
            description: "Creative posts and stories that showcase your style and connect with fans.",
            img: Socialmedia,
            link: "https://servicesLInk",
            bg: "#6017DC",
        },
        {
            "id": 4,
            title: "Audio Editing",
            description: "Improve your music quality by editing, mixing, and mastering your tracks.",
            img: MusicDistributionImg,
            link: "https://servicesLInk",
            bg: "#29A49F",
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

    const [services, setServices] = useState([]);


    useEffect(() => {

        axios.get('http://localhost:8000/api/services')
            .then(res => setServices(res.data))
            .catch(err => console.error(err));

        if (services.length === 0) {
            setServices(ServicesD);
        }


    }, []);


    return (
        <div className={`py-20 bg-cover bg-white`}>
            <div className="container m-auto">
                <p className='text-center font-bold text-xl text-[#29A49F] mb-4'>Satisfy Solution</p>
                <h2 className='text-center text-4xl font-bold mb-6'>The Best Services we provide</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 pt-12">
                    {ServicesD.map((service) => (
                        <ServicesBox
                            key={service.id}
                            bgColor={service.bg}
                            title={service.title}
                            description={service.description}
                            link={service.link}
                            img={service.img}
                            comingSoon={service.comingSoon}
                        />
                    ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Services;
