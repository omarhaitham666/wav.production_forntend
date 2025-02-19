import React, { useState } from 'react';

import Rising from '../../assets/Img/singing.png'
import RisingActive from '../../assets/Img/singing-active.png'
import famous from '../../assets/Img/karaoke.png'
import famousActive from '../../assets/Img/karaoke-active.png'
import Swal from 'sweetalert2';
import RisingForm from './RisingForm';

const JoinUs = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    console.log(selectedType)


    return (
        <div className={`py-40 bg-white`}>
            <div className="container mx-auto">
                <form className="flex justify-center items-center flex-col" action="" value={selectedOption} id="type" onChange={handleChange}>
                    <h1 htmlFor="type" className='text-center text-3xl font-bold text-black mb-12'>Please select your type:</h1>
                    <div className="flex justify-center gap-12 flex-wrap mb-16">
                        <label htmlFor="Rising" className='flex flex-col justify-center items-center text-center p-8 bg-white border border-[#0000000D] shadow-xl rounded-xl'>
                            <img src={selectedOption === "Rising" ? RisingActive : Rising} alt="Rising" className="w-56 h-w-56 mb-1" />
                            <p className='text-black text-2xl font-bold mb-2'>Rising Singer</p>
                            <input type="checkbox"
                                id="Rising"
                                name="Rising"
                                value="Rising"
                                className="hidden"
                            />
                            <div className={`${selectedOption === "Rising" ? 'bg-[#30B797]' : "border-2"} bg-[#303030] w-5 h-5  rounded-full flex items-center justify-center transition-all`}>
                                {selectedOption === "Rising" ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-white transition"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : ""}
                            </div>
                        </label>
                        <label htmlFor="famous" className='flex flex-col justify-center items-center text-center p-8 bg-white border border-[#0000000D] shadow-xl rounded-xl'>
                            <img src={selectedOption === "famous" ? famousActive : famous} alt="famous" className="w-56 h-w-56 mb-1" />
                            <p className='text-black text-2xl font-bold mb-2'>famous Singer</p>
                            <input type="checkbox"
                                id="famous"
                                name="famous"
                                value="famous"
                                className="hidden"
                            />
                            <div className={`${selectedOption === "famous" ? 'bg-[#30B797]' : "border-2"} bg-[#303030] w-5 h-5  rounded-full flex items-center justify-center transition-all`}>
                                {selectedOption === "famous" ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-white transition"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : ""}
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
                                        'Please select your type',
                                        'error'
                                    )
                                } else {
                                    setSelectedType(selectedOption)
                                }
                            }
                        }
                        className="text-2xl gap-4 px-12 py-4 rounded-3xl font-bold border cursor-pointer border-[#30B797] text-white bg-[#30B797] hover:bg-white hover:text-[#30B797] transition"
                    >Next</button>}
                </form>
                {
                    selectedType === "Rising" ? (
                        <RisingForm />
                    ):("gfsdgde")
                }
            </div>
        </div>
    );
}

export default JoinUs;
