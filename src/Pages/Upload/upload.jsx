import React from 'react';
import { useState } from "react";
import Swal from 'sweetalert2';
import songImg from '../../assets/Img/song.png'
import albumImg from '../../assets/Img/album.png'
import { FaCheck } from 'react-icons/fa';
import UploadSong from './uploadSong';
import { Helmet } from 'react-helmet';


const Upload = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [upladType, setUpladType] = useState("");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };




    return (
        <>
            <Helmet>
                <title>Upload | Could.wav</title>
            </Helmet>
            <div className='py-24'>
                <div className="container m-auto">
                    {upladType === "Song" ?
                        <UploadSong />
                        : upladType === "Album" ?
                            <div>
                                <h1 className='text-center text-3xl font-bold text-black mb-12'>Upload your Albums:</h1>
                                {/* upload album form */}
                            </div>
                            :
                            <form className="flex justify-center items-center flex-col" action="" value={selectedOption} id="type" onChange={handleChange}>
                                <h1 htmlFor="type" className='text-center text-3xl font-bold text-black mb-12'>Please select your Upload type:</h1>
                                <div className="flex justify-center gap-12 flex-wrap mb-16">
                                    <label htmlFor="Song" className='flex flex-col justify-center items-center text-center p-14 bg-white border border-[#0000000D] shadow-xl rounded-xl'>
                                        <img src={songImg} alt="song" className='w-36 h-36' />
                                        <p className='text-black text-2xl font-bold mb-2'>Upload Songs</p>
                                        <input type="checkbox"
                                            id="Song"
                                            name="Song"
                                            value="Song"
                                            className="hidden"
                                        />
                                        <div className={`w-6 h-6 rounded-full text-white flex items-center justify-center
                            ${selectedOption === "Song" ? "bg-[#30B797]" : "bg-[#303030]"}`}>
                                            {selectedOption === "Song" ?
                                                <FaCheck />
                                                : ''
                                            }
                                        </div>
                                    </label>
                                    <label htmlFor="Album" className='flex flex-col justify-center items-center text-center p-14 bg-white border border-[#0000000D] shadow-xl rounded-xl'>
                                        <img src={albumImg} alt="album" className='w-36 h-36' />
                                        <p className='text-black text-2xl font-bold mb-2'>Upload Albums</p>
                                        <input type="checkbox"
                                            id="Album"
                                            name="Album"
                                            value="Album"
                                            className="hidden"
                                        />
                                        <div className={`w-6 h-6 rounded-full text-white flex items-center justify-center
                            ${selectedOption === "Album" ? "bg-[#30B797]" : "bg-[#303030]"}`}>
                                            {selectedOption === "Album" ?
                                                <FaCheck />
                                                : ''
                                            }
                                        </div>
                                    </label>
                                </div>
                                {selectedOption === "" ?
                                    <button
                                        onClick={
                                            (event) => {
                                                event.preventDefault();
                                            }
                                        }
                                        className="text-2xl gap-4 px-12 py-4 rounded-3xl font-bold cursor-not-allowed text-black bg-[#C9C9C9] ">Next</button>
                                    :
                                    <button
                                        onClick={
                                            (event) => {
                                                event.preventDefault();
                                                if (selectedOption === '') {
                                                    Swal.fire(
                                                        'Error',
                                                        'Please select Upload type',
                                                        'error'
                                                    )
                                                } else {
                                                    setUpladType(selectedOption)
                                                }
                                            }
                                        }
                                        className="text-2xl gap-4 px-12 py-4 rounded-3xl font-bold border cursor-pointer border-[#30B797] text-white bg-[#30B797] hover:bg-white hover:text-[#30B797] transition"
                                    >Next</button>}
                            </form>
                    }
                </div>
            </div>
        </>
    );
}

export default Upload;
