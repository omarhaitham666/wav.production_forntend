import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ filters, setFilters }) => {
    const { t } = useTranslation();
    const [browseFilter, setBrowseFilter] = useState('');
    const [genresFilter, setGenresFilter] = useState('');

    const categories = {
        MainCategory: [
            { id: 1, name: "Trending songs" },
            { id: 2, name: "Trending Albums" },
            { id: 3, name: "Recently Supported" },
            { id: 4, name: "Recently Added" },
            { id: 5, name: "Accounts for You" }
        ],
        GenresCategory: [
            { id: 1, name: "Pop" },
            { id: 2, name: "Rock" },
            { id: 3, name: "Hip hop" },
            { id: 4, name: "Electronic" },
            { id: 5, name: "Jazz" },
            { id: 6, name: "Classical" },
            { id: 7, name: "Mheraganat" }
        ]
    };

    useEffect(() => {
        setFilters({ browseFilter, genresFilter });
    }, [browseFilter, genresFilter]);

    return (
        <div className="lg:w-1/4 flex-col flex">
            <div className='pb-4 border-b border-[#959595]'>
                <h3 className="text-2xl font-bold text-[#30B797]">{t("browse")}</h3>
                <ul className='text-lg p-0 pt-5'>
                    <li className={`${browseFilter === '' ? 'text-white px-4 bg-[#00000080]' : ''} mb-4 transition-all text-black font-bold rounded-xl hover:text-white hover:px-4 hover:bg-[#00000080]`}>
                        <button onClick={() => setBrowseFilter('')}>
                            {t("home")}
                        </button>
                    </li>
                    {categories?.MainCategory?.map((category) => (
                        <li key={category.id}
                            onClick={() => setBrowseFilter(category.name)}
                            className={`mb-4 transition-all text-black font-bold rounded-xl hover:text-white hover:px-4 hover:bg-[#00000080] ${browseFilter === category.name ? 'text-white px-4 bg-[#00000080]' : ''}`}>
                            <button>{t(category.name)}</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='py-4 border-b border-[#959595]'>
                <h3 className="text-2xl font-bold text-[#30B797]">{t("genres")}</h3>
                <div className='text-lg flex flex-wrap items-center gap-3 p-0 pt-5'>
                    <button onClick={() => setGenresFilter('')} className={`border hover:border-[#30B797] transition-all py-2 px-4 rounded-full ${genresFilter === '' ? 'border-[#30B797]' : 'border-[#252525]'}`}>
                        {t("all_genres")}
                    </button>
                    {categories?.GenresCategory?.map((category) => (
                        <button key={category.id} onClick={() => setGenresFilter(category.name)} className={`border hover:border-[#30B797] transition-all py-2 px-4 rounded-full ${genresFilter === category.name ? 'border-[#30B797]' : 'border-[#252525]'}`}>
                            {t(category.name)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
