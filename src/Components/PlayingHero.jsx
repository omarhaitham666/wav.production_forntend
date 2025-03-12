import React from 'react';
import playingImg from '../assets/Img/Playing.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PlayingHero = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar'; // التحقق مما إذا كانت اللغة العربية

    return (
        <div className='pt-24 bg-[#1D212E]' dir={isRTL ? 'rtl' : 'ltr'}>
            <div className='container m-auto'>
                <div className={`flex flex-col lg:flex-row items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    
                    {/* صورة المنصة */}
                    <div className={`flex flex-col items-${isRTL ? 'start' : 'end'} justify-end w-full lg:w-1/3`}>
                        <img src={playingImg} alt={t('playing_alt')} className='object-cover' />
                    </div>

                    {/* المحتوى النصي */}
                    <div className='lg:w-2/3 w-full flex items-center text-center flex-col gap-4 pb-5'>
                        <h2 className='text-4xl font-bold text-white mb-2'>
                            {t("music_platform")} <span className='text-[#30B797]'>{t("join_our_platform")}</span>
                        </h2>
                        <p className='text-xl lg:w-1/2 text-white mb-8'>
                            {t("platform_description")}
                        </p>
                        <Link to="/join-us" className='bg-[#30B797] py-4 px-6 text-white font-bold text-2xl border border-[#30B797] rounded-full 
                            hover:bg-transparent transition-all hover:text-[#30B797]'>
                            {t("join_now")}
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PlayingHero;
