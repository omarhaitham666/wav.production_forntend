import React, { useState } from 'react';
import PlansBox from '../../Components/PlansBox';
import { getPlans } from '../../actions/getPlans';
import Swal from 'sweetalert2';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RisingForm = () => {
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
        message: "",

    };


    const inputValidation = Yup.object({

        name: Yup.string()
            .min(3, "cant be less than 3 letters")
            .required("name is invalid")
            .max(20, "cant be more than 20"),


        email: Yup.string()
            .min(15, "يجب أن لا يقل عن 15 حرف")
            .email("enter the correct email")
            .required("this is invalid"),


        message: Yup.string()
            .min(10, "يجب ألا يقل عن 10 أحرف")
            .max(500, "يجب ألا يزيد عن 500 حرف")
            .required("رسالة المشروع مطلوبة"),


    });

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: inputValidation,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://api.cloudwavproduction.com//api/', {
                    // plan: selectedPlan,
                    name: values.name,
                    email: values.email,
                    message: values.message
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
        <div className='py-20'>
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
                <div className="pt-20 flex flex-col lg:flex-row justify-center gap-10">
                    <div className="lg:w-1/2">
                        <h2 className="text-5xl mb-12 font-bold w-full text-center lg:text-start lg:w-2/3">Lets talk for something Special</h2>
                        <p className='text-[#4C484F] text-lg w-full text-center lg:text-start lg:w-2/3'>Our white-label technology consulting company has become one of the most sought-after Custom Web Development Services in a very short period. It is famous for its unique techniques and practical results.</p>
                    </div>
                    <div className="lg:w-1/2">
                        <form action="" onSubmit={formik.handleSubmit}>
                            <input className=' mb-4 text-[#919499] border border-[#1F1A234D] shadow-xl focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                                type="text"
                                placeholder="Your Name"
                                name='name'
                                onChange={formik.handleChange} value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <small className='text-red-500'>{formik.errors.name}</small>
                            ) : null}
                            <input
                                className=' mb-4 text-[#919499] border border-[#1F1A234D] shadow-xl focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4 mt-4'
                                type="email"
                                placeholder="Your Email"
                                name='email'
                                id='email'
                                onChange={formik.handleChange} value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <small className='text-red-500'>{formik.errors.email}</small>
                            ) : null}
                            <textarea className=' mb-4 text-[#919499] border border-[#1F1A234D] shadow-xl focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                                rows='5'
                                placeholder="Project details"
                                name='message'
                                id='message'
                                onChange={formik.handleChange} value={formik.values.message}
                            />
                            {formik.touched.message && formik.errors.message ? (
                                <small className='text-red-500'>{formik.errors.message}</small>
                            ) : null}
                            <button className='bg-[#1F1A23] text-white font-bold rounded-full p-4 mt-4 text-2xl hover:bg-[#2F00AC] transition'
                                type='submit'
                            >Send message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RisingForm;
