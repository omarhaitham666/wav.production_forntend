import React, { useEffect, useState } from 'react';
import { getCategory } from '../actions/getcategory';

const Sidebar = () => {
    const [category, setCategory] = useState([])
    const [browseFilter, setBrowserfilter] = useState('')
    const [genresFilter, setGenresFilters] = useState('')


    // useEffect(()=>{
    //     const Category =getCategory()
    //     setCategory(Category)

    // },[])

    const Categorys = {
        MainCategory: [
            {
                id: 1,
                name: "Trending songs",
            },
            {
                id: 2,
                name: "Trending Albums",
            },
            {
                id: 3,
                name: "Recently Supported",
            },
            {
                id: 4,
                name: "Recently Added",
            },
            {
                id: 5,
                name: "Accounts for You",
            }
        ],

        GenresCategory: [
            {
                id: 1,
                name: "Pop",
            },
            {
                id: 2,
                name: "Rock",
            },
            {
                id: 3,
                name: "Hip hop",
            },
            {
                id: 4,
                name: "Electronic",
            },
            {
                id: 5,
                name: "Jazz",
            },
            {
                id: 6,
                name: "Classical",
            },
            {
                id: 7,
                name: "Mheraganat",
            }
        ]
    }

    useEffect(() => {
        // save in localStorage
        localStorage.setItem('BrowseFilter', JSON.stringify(browseFilter));
        localStorage.setItem('GenresFilter', JSON.stringify(genresFilter));
        
    }, [browseFilter, genresFilter])




    return (
        <div className="lg:w-1/4 flex-col flex">
            <div className='py-4 border-b border-[#959595]'>
                <h3 className="text-2xl font-bold text-[#30B797]">Browse</h3>
                <ul className='text-lg p-0 pt-5'>
                    <li className={`${browseFilter === '' ? 'text-white px-4 bg-[#00000080]' : null
                        } mb-4 transition-all text-black font-bold rounded-xl hover:text-white hover:px-4 hover:bg-[#00000080]`}>
                        <button
                            onClick={
                                () => {
                                    setBrowserfilter('')
                                }
                            }
                        >Home</button>
                    </li>
                    {Categorys?.MainCategory?.map((category, index) => (
                        <li key={index}
                            onClick={
                                () => {
                                    setBrowserfilter(category.name)
                                }
                            }
                            className={`mb-4 transition-all text-black font-bold rounded-xl hover:text-white hover:px-4 hover:bg-[#00000080] ${browseFilter === category.name ? 'text-white px-4 bg-[#00000080]' : null
                                }`}>
                            <button>{category.name}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='py-4 border-b border-[#959595]'>
                <h3 className="text-2xl font-bold text-[#30B797]">Genres</h3>
                <div className='text-lg flex flex-wrap items-center gap-3 p-0 pt-5'>
                    <div className='inline'>
                        <button
                            onClick={() => setGenresFilters('')}
                            className={`border hover:border-[#30B797] transition-all py-2 px-4 rounded-full ${
                                genresFilter === ''? 'border-[#30B797]' : "border-[#252525]"
                            }`}>All Genres</button>
                    </div>
                    {Categorys?.GenresCategory?.map((category, index) => (
                        <div key={index}
                            onClick={() => setGenresFilters(category.name)}
                            className='inline'>
                            <button className={`border hover:border-[#30B797] transition-all py-2 px-4 rounded-full ${
                                genresFilter === category.name? 'border-[#30B797]' : 'border-[#252525]'
                            }`}>{category.name}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
