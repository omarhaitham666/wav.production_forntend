import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PlansBox from '../../Components/PlansBox';
import { Helmet } from 'react-helmet';

const Pricing = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar'; // التحقق مما إذا كانت اللغة عربية

    const [selectedPlan, setSelectedPlan] = useState();
    const [period, setPeriod] = useState('Monthly');

    const plans = {
        monthly: [
            {
                name: 'plans.starter',
                price: 20,
                priceYearly: 200,
                features: [
                    'plans.features.content_protection',
                    'plans.features.revenue_security',
                    'plans.features.artist_platform_protection',
                    'plans.features.artist_profile',
                    'plans.features.real_job_opportunities',
                    'plans.features.no_ads',
                    'plans.features.easy_browsing',
                ],
            },
            {
                name: 'plans.pro_tune',
                price: 40,
                priceYearly: 425,
                features: [
                    'plans.features.content_protection',
                    'plans.features.revenue_security',
                    'plans.features.artist_platform_protection',
                    'plans.features.artist_profile',
                    'plans.features.real_job_opportunities',
                    'plans.features.exclusive_marketing',
                    'plans.features.no_ads',
                    'plans.features.easy_browsing',
                ],
            },
        ],
        yearly: [
            // {
            //     name: 'basic_plan',
            //     price: 99.99,
            //     priceMonthly: 100,
            //     features: ['feature_1', 'feature_2', 'feature_3'],
            // },
            // {
            //     name: 'premium_plan',
            //     price: 199.99,
            //     priceMonthly: 200,
            //     features: ['feature_4', 'feature_5', 'feature_6', 'feature_10'],
            // },
            // {
            //     name: 'pro_plan',
            //     price: 299.99,
            //     priceMonthly: 300,
            //     features: ['feature_7', 'feature_8', 'feature_9', 'feature_10', 'feature_11'],
            // }
        ]
    };

    return (
        <>
            <Helmet>
                <title>{t("pricing_title")}</title>
            </Helmet>
            <div className='py-20' style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                <div className="container m-auto">
                    <div className="flex items-center flex-col">
                        <h1 className="text-4xl font-bold text-center">{t("pricing_title")}</h1>
                        <p className="text-center text-lg text-black mt-8">{t("pricing_subtitle")}</p>

                        {/* زر اختيار المدة */}
                        <div className="flex justify-center items-center mt-12">
                            <div className={`cursor-pointer transition border px-8 py-4 text-xl font-bold 
                                ${period === 'Monthly' ? 'bg-[#2F00AC] text-white' : 'bg-[#B0E4D5] text-[#2F00AC]'}
                                ${isRTL ? 'rounded-r-2xl' : 'rounded-l-2xl'}`}
                                onClick={() => setPeriod('Monthly')}
                            >
                                {t("monthly")}
                            </div>
                            <div className={`cursor-pointer transition border px-8 py-4 text-xl font-bold 
                                ${period === 'Yearly' ? 'bg-[#2F00AC] text-white' : 'bg-[#B0E4D5] text-[#2F00AC]'}
                                ${isRTL ? 'rounded-l-2xl' : 'rounded-r-2xl'}`}
                                onClick={() => setPeriod('Yearly')}
                            >
                                {t("yearly")}
                            </div>
                        </div>

                        {/* صناديق الخطط */}
                        <div className={`grid gap-10 grid-cols-1 md:grid-cols-2 justify-center mt-12 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {period === "Monthly" ?
                                plans.monthly.map((plan, index) => (
                                    <PlansBox
                                        key={index}
                                        planName={t(plan.name)}
                                        MainPrice={plan.price}
                                        addPrice={plan.priceYearly}
                                        Features={plan.features.map(feature => t(feature))}
                                        select={() => setSelectedPlan(plan.name)}
                                    />
                                ))
                                :
                                plans.yearly.map((plan, index) => (
                                    <PlansBox
                                        key={index}
                                        planName={t(plan.name)}
                                        MainPrice={plan.price}
                                        addPrice={plan.priceMonthly}
                                        Features={plan.features.map(feature => t(feature))}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pricing;
