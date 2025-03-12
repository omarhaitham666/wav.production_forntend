import { useTranslation } from "react-i18next";

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
            to: "/Services",
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
