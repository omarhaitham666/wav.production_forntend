import React, { useState } from 'react';
import PlansBox from '../../Components/PlansBox';
import { getPlans } from '../../actions/getPlans';
import Swal from 'sweetalert2';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const Pricing = () => {

    const [selectedPlan, setSelectedPlan] = useState();
    const [period, setPeriod] = useState('Monthly')

    // const plans= getPlans()
    const plans = {
        monthly: [
            {
                name: 'Free Plan',
                price: 0,
                priceYearly: 10,
                features: ['5 songs and profiles', 'Basic analytics', 'Standard support'],
            },
            {
                name: 'Pro Plan',
                price: 119,
                priceYearly: 20,
                features: ['25 songs and profiles', 'Advanced analytics', 'Priority support'],
            },
            {
                name: 'Enterprise Plan',
                price: 499,
                priceYearly: 30,
                features: ['Unlimited songs and profiles', 'Custom analytics and reporting', 'Dedicated account manager'],
            }
        ],
        yearly: [
            {
                name: 'Basic',
                price: 99.99,
                priceMonthly: 100,
                features: ['Feature 1', 'Feature 2', 'Feature 3'],
            },
            {
                name: 'Premium',
                price: 199.99,
                priceMonthly: 200,
                features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
            },
            {
                name: 'Pro',
                price: 299.99,
                priceMonthly: 300,
                features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
            }
        ]
    }

    const initValues = {
        email: "",
        name: "",
        massage: "",

    };


    const inputValidation = Yup.object({
        email: Yup.string()
            .min(15, "يجب أن لا يقل عن 15 حرف")
            .email("enter the correct email")
            .required("this is invalid"),
    });

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: inputValidation,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:8000/api/UserPlan', {
                    plan: selectedPlan,
                    Name: values.name,
                    Email: values.email,
                    massage: values.massage
                });

            } catch (error) {
                let message = 'حدث خطأ أثناء التسجيل';


                if (error.response && error.response.status === 422) {
                    const errorMessages = error.response.data.errors;
                    message = Object.values(errorMessages).flat().join(' ');
                } else if (error.request) {
                    message = 'لم يتم استلام أي استجابة من الخادم. حاول مرة أخرى لاحقًا.';
                } else {
                    message = `حدث خطأ في إعداد الطلب: ${error.message}`;
                }

                Swal.fire({
                    title: 'خطأ',
                    text: message,
                    icon: 'error',
                });
            }
        }
    });



    return (
                <>
                    <Helmet>
                        <title>Pricing | Could.wav</title>
                    </Helmet>
        <div className='py-20'>
            <div className="container m-auto">
                <div className="flex items-center flex-col">
                    <h1 className="text-4xl font-bold text-center">Pricing Plan</h1>
                    <p className="text-center text-lg text-black mt-8">Choose the perfect plan that fits your needs, and unlock the full potential of your career right now</p>
                    <div className="flex justify-center items-center mt-12">
                        <div className={`rounded-l-2xl border-l cursor-pointer transition border-[#B0E4D5] px-8 py-4 text-xl font-bold
                    ${period === 'Monthly' ? 'bg-[#2F00AC] text-white' : 'bg-[#B0E4D5] text-[#2F00AC]'}`}
                            onClick={
                                () => setPeriod('Monthly')
                            }
                        >Monthly</div>
                        <div className={`rounded-r-2xl border-r cursor-pointer transition border-[#B0E4D5] px-8 py-4 text-xl font-bold
                    ${period === 'Yearly' ? 'bg-[#2F00AC] text-white' : 'bg-[#B0E4D5] text-[#2F00AC]'}`}
                            onClick={
                                () => setPeriod('Yearly')
                            }
                        >Yearly</div>
                    </div>
                    <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
                        {period === "Monthly" ?
                            plans.monthly?.map((plan) => (
                                <PlansBox
                                    planName={plan.name}
                                    MainPrice={plan.price}
                                    addPrice={plan.priceYearly}
                                    Features={
                                        plan.features.map((feature) =>
                                            (feature)
                                        )
                                    }
                                    select={
                                        () => {
                                            setSelectedPlan(plan.name)
                                        }
                                    }
                                />
                            ))
                            :
                            plans.yearly?.map((plan) => (
                                <PlansBox
                                    planName={plan.name}
                                    MainPrice={plan.price}
                                    addPrice={plan.priceMonthly}
                                    Features={
                                        plan.features.map((feature) =>
                                            (feature)
                                        )
                                    }
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Pricing;
