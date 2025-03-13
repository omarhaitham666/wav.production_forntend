import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const PlansBox = (prop) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    return (
        <div className={`flex flex-col justify-center p-8 bg-white border border-[#0000000D] shadow-xl rounded-xl 
            ${isRTL ? 'text-right' : 'text-left'}`}>
            
            <h1 className='text-3xl font-bold mb-2'>{t(prop.planName)}</h1>
            <p className='text-xl mb-6'>{t(prop.planP)}</p>

            <span className='w-full border border-gray-600 mb-6' />

            <h3 className='text-6xl font-bold mb-2'>
                ${prop.MainPrice}<span className='text-2xl'>/Mo</span>
            </h3>
            <p className='text-lg mb-6'>{t('plans.or_yearly', { price: prop.addPrice })}</p>

            <button 
                className='w-full mb-12 text-[#2F00AC] bg-[#E6F6F2] border border-[#B0E4D5] rounded-xl py-4 px-6 
                    hover:bg-[#2F00AC] hover:text-[#E6F6F2] transition-all'
                onClick={prop.select}
            >
                {t('plans.get_started')}
            </button>

            <span className='w-full border border-gray-600 mb-6' />
            <ul>
                {prop.Features?.map((Feature, index) => (
                    <li key={index} className={`flex items-center text-lg mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <FaCheck className='text-[#2F00AC] mr-2' />
                        {t(Feature)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlansBox;
