import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PlansBox from '../../Components/PlansBox';
import { Helmet } from 'react-helmet-async';

const Pricing = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar'; // التحقق مما إذا كانت اللغة عربية

    const [selectedPlan, setSelectedPlan] = useState();
    const [period, setPeriod] = useState('Monthly');

    const plans = {
        monthly: [
            {
                name: 'free_plan',
                price: 0,
                priceYearly: 10,
                features: ['feature_1', 'feature_2', 'feature_3'],
            },
            {
                name: 'pro_plan',
                price: 119,
                priceYearly: 20,
                features: ['feature_4', 'feature_5', 'feature_6'],
            },
            {
                name: 'enterprise_plan',
                price: 499,
                priceYearly: 30,
                features: ['feature_7', 'feature_8', 'feature_9'],
            }
        ],
        yearly: [
            {
                name: 'basic_plan',
                price: 99.99,
                priceMonthly: 100,
                features: ['feature_1', 'feature_2', 'feature_3'],
            },
            {
                name: 'premium_plan',
                price: 199.99,
                priceMonthly: 200,
                features: ['feature_4', 'feature_5', 'feature_6', 'feature_10'],
            },
            {
                name: 'pro_plan',
                price: 299.99,
                priceMonthly: 300,
                features: ['feature_7', 'feature_8', 'feature_9', 'feature_10', 'feature_11'],
            }
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
                        <div className={`grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 ${isRTL ? 'text-right' : 'text-left'}`}>
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
