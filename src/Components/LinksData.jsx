import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const useLinksData = () => {
    const { t } = useTranslation();

    return [
        {
            id: 1,
            title: t("Home"),
            to: "/",
        },
        {
            id: 2,
            title: t("service"),
            to: "",
            menu:[
                {
                    id: 1,
                    title: t("services_1"),
                    to: "/Services/Music_distribution",
                },
                {
                    id: 2,
                    title: t("services_2"),
                    to: "/Services/Platform_Management",
                },
                {
                    id: 3,
                    title: t("services_3"),
                    to: "/Services/Social_media",
                },
                {
                    id: 4,
                    title: t("services_4"),
                    to: "/Services/Clothes_Store",
                    SocialLnks:[
                        {
                            icon: <FaFacebook />,
                            title:"Facebook Page",
                            iconLink:"https://m.facebook.com/61573739062609/",
                        },
                        {
                            icon: <FaInstagram />,
                            title:"Instagram Page",
                            iconLink:"https://www.instagram.com/black_8_bear",
                        },
                        {
                            icon: <FaTiktok />,
                            title:"Tiktok Account",
                            iconLink:"https://www.tiktok.com/@_blackbear",
                        },
                    ]
                },
                {
                    id: 5,
                    title: t("services_5"),
                    to: "/Services/Programming_services",
                    comingSoon:true
                },
                {
                    id: 6,
                    title: t("services_6"),
                    to: "/Services/TikTok agency",
                    comingSoon:true
                }
            ]
        },
        {
            id: 3,
            title: t("pricing"),
            to: "/Pricing",
        },
        {
            id: 4,
            title: t("faqs"),
            to: "/FAQs",
        },
        {
            id: 5,
            title: t("contactus"),
            to: "/Contact",
        },
    ];
};

export default useLinksData;
