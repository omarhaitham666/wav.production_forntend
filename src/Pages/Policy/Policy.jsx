import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from "/logo.svg";

const Policy = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className="flex flex-col gap-10 mt-28">
                <img src={logo} alt='Logo' className='object-contain w-56 h-auto m-auto' />
            </div>
            <div className='py-8'>
                <h2 className='text-4xl font-black my-6 mt-5 text-center'>{t('policy.title')}</h2>
                <p className='text-lg pl-4 mt-3 text-center font-black'>{t('policy.lastUpdate')}</p>
                <p className='text-lg mt-3 pl-4 text-center font-black'>{t('policy.owner')}</p>
                <p className='pl-4 text-lg mt-4 text-center'>{t('policy.introduction')}</p>
            </div>

            <hr className="border-t-4 border-blue-500 w-3/4 mx-auto my-4" />
            <div className='py-8'>
                <p className='text-lg pl-4 mt-3 text-center font-black'>{t('policy.services.title')}</p>
                <p className='pl-4 text-lg mt-4 text-center'>{t('policy.services.content')}</p>
            </div>

            <hr className="border-t-4 border-blue-500 w-3/4 mx-auto my-4" />
            <div className='py-8'>
                <p className='text-lg pl-4 mt-3 text-center font-black'>{t('policy.dataCollection.title')}</p>
                <p className='pl-4 text-lg mt-4 text-center'>{t('policy.dataCollection.content')}</p>
            </div>

            <hr className="border-t-4 border-blue-500 w-3/4 mx-auto my-4" />
            <div className='py-8'>
                <p className='text-lg pl-4 mt-3 text-center font-black'>{t('policy.dataUsage.title')}</p>
                <p className='pl-4 text-lg mt-4 text-center'>{t('policy.dataUsage.content')}</p>
            </div>

            <hr className="border-t-4 border-blue-500 w-3/4 mx-auto my-4" />
            <div className='py-8'>
                <p className='text-lg pl-4 mt-3 text-center font-black'>{t('policy.rightsProtection.title')}</p>
                <p className='pl-4 text-lg mt-4 text-center'>{t('policy.rightsProtection.content')}</p>
            </div>

            <hr className="border-t-4 border-blue-500 w-3/4 mx-auto my-4" />
            <div className='py-8'>
                <p className='text-lg pl-4 mt-3 text-center font-black'>{t('policy.adsPartnerships.title')}</p>
                <p className='pl-4 text-lg mt-4 text-center'>{t('policy.adsPartnerships.content')}</p>
            </div>

            <hr className="border-t-4 border-blue-500 w-3/4 mx-auto my-4" />
            <div className='py-8'>
                <p className='text-lg pl-4 mt-3 text-center font-black'>{t('policy.userRights.title')}</p>
                <p className='pl-4 text-lg mt-4 text-center'>{t('policy.userRights.content')}</p>
            </div>

            <hr className="border-t-4 border-blue-500 w-3/4 mx-auto my-4" />
            <div className='py-8'>
                <p className='text-lg pl-4 mt-3 text-center font-black'>{t('policy.security.title')}</p>
                <p className='pl-4 text-lg mt-4 text-center'>{t('policy.security.content')}</p>
            </div>

            <hr className="border-t-4 border-blue-500 w-3/4 mx-auto my-4" />
            <div className='py-8'>
                <p className='text-lg pl-4 mt-3 text-center font-black'>{t('policy.policyUpdates.title')}</p>
                <p className='pl-4 text-lg mt-4 text-center'>{t('policy.policyUpdates.content')}</p>
            </div>

            <hr className="border-t-4 border-blue-500 w-3/4 mx-auto my-4" />
            <h3 className='text-2xl font-bold text-center mt-5'>
                {t("policy.contact.title")}
            </h3>
            <div className="text-lg text-center mt-3 py-8">
                {t("policy.contact.content", { returnObjects: true }).map((line, index) => (
                    <p key={index} className="mt-2">{line}</p>
                ))}
            </div>
        </>
    );
}

export default Policy;
