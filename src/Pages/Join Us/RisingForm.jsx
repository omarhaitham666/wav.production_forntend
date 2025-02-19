import React, { useState } from 'react';

const RisingForm = () => {

    const [period, setPeriod] =useState('Monthly')


    return (
        <div className='py-20'>
            <div className="flex items-center flex-col">
                <h1 className="text-4xl font-bold text-center">Pricing Plan</h1>
                <p className="text-center text-lg text-black mt-8">Choose the perfect plan that fits your needs, and unlock the full potential of your career right now</p>
                <div className="flex justify-center items-center mt-12">
                    <div className={`rounded-l-2xl border-l cursor-pointer transition border-[#B0E4D5] px-8 py-4 text-xl font-bold
                    ${period === 'Monthly'? 'bg-[#2F00AC] text-white' : 'bg-[#B0E4D5] text-[#2F00AC]'}`}
                    onClick={
                        () => setPeriod('Monthly')
                    }
                    >Monthly</div>
                    <div className={`rounded-r-2xl border-r cursor-pointer transition border-[#B0E4D5] px-8 py-4 text-xl font-bold
                    ${period === 'Yearly'? 'bg-[#2F00AC] text-white' : 'bg-[#B0E4D5] text-[#2F00AC]'}`}
                    onClick={
                        () => setPeriod('Yearly')
                    }
                    >Yearly</div>
                </div>
                
            </div>
        </div>
    );
}

export default RisingForm;
