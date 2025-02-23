import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';


const FAQs = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className='py-20'>
            <div className='container mx-auto'>
                <h2 className='text-4xl font-bold text-center mb-4'>FAQs</h2>
                <p className='text-center text-lg'>Find answers to frequently asked questions about The Social Manager's services and solutions.</p>
                <div className='flex flex-col mt-14 gap-6 items-center'>
                    <div id="accordion-collapse" className='bg-[#4D39CF] rounded-2xl w-full' >
                        <h2 id="accordion-collapse-heading" className='transition-all'>
                            <button type="button"
                                onClick={
                                    () => setIsOpen(!isOpen)
                                }
                                className="flex items-center justify-between w-full text-2xl p-5 font-bold  text-white border-gray-200 transition-all ">
                                <span>What features does Cloud.Wave offer?</span>
                                {isOpen ?
                                    <FaMinus />
                                    :
                                    <FaPlus />
                                }
                            </button>
                        </h2>
                        <div id="accordion-collapse-body" className={`${isOpen ? 'block' : 'hidden'} p-4 transition-all`}>
                            <ul className='list-decimal text-white text-lg pl-8'>
                                <li className='mb-2'>Visit the Socializ website.</li>
                                <li className='mb-2'>Create a free account.</li>
                                <li className='mb-2'>Start using the platform.</li>
                                <li className='mb-2'>Connect with your audience.</li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col items-center pt-10 md:w-2/3'>
                        <h2 className='text-black font-bold text-3xl mb-6'>Still have a question?</h2>
                        <p className='text-black text-lg mb-10'>Our team is ready to assist you in any way possible and provide the information you need.</p>
                        <a
                        href="/Contact"
                        className="text-2xl px-10 py-4 rounded-2xl cursor-pointer font-bold bg-[#30B797] text-white border border-[#30B797] hover:bg-white hover:text-[#30B797] transition"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQs;
