import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Data } from './FAQsData';


const FAQs = () => {
    const [openItems, setOpenItems] = useState({}); 

    const toggleItem = (id) => {
        setOpenItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };


    return (
        <div className='py-20'>
            <div className='container mx-auto'>
                <h2 className='text-4xl font-bold text-center mb-4'>FAQs</h2>
                <p className='text-center text-lg'>Find answers to frequently asked questions about The Social Manager's services and solutions.</p>
                <div className='flex flex-col mt-14 gap-6 items-center'>
                    {
                        Data.map((item) => (
                            <div key={item.id} id="accordion-collapse" className='bg-[#4D39CF] rounded-2xl w-full' >
                                <h2 id="accordion-collapse-heading" className='transition-all'>
                                    <button type="button"
                                        onClick={() => toggleItem(item.id)}
                                        className="flex items-center cursor-pointer justify-between w-full text-2xl p-5 font-bold  text-white border-gray-200 transition-all ">
                                        <span>{item.question}</span>
                                        {openItems[item.id] ? <FaMinus /> : <FaPlus />}
                                    </button>
                                </h2>
                                <div id="accordion-collapse-body" className={`${openItems[item.id] ? 'block' : 'hidden'} p-4 transition-all`}>
                                    <ul className=' text-white text-lg pl-8'>
                                        {
                                            item.answers.map((answer, index) => (
                                                <li key={index} className='mb-2'>{answer}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
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
