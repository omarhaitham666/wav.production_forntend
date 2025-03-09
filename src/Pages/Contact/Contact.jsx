import React from 'react';
import { FaInstagram, FaPhoneVolume, FaTwitch, FaTwitter } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    const initValues = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
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
                const response = await axios.post('http://localhost:8000/api/contact', {
                    FirstName: values.firstName,
                    LastName: values.lastName,
                    PhoneNumber: values.phoneNumber,
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
                <title>Contact Us | Could.wav</title>
            </Helmet>
            <div className='py-24'>
                <div className="container m-auto">
                    <div className="flex flex-col lg:flex-row gap-14 mt-24">
                        <div className="w-full lg:w-2/5">
                            <div className='flex flex-col bg-[#4D39CF] relative p-10 rounded-2xl text-white overflow-hidden'>
                                <h2 className='text-4xl mb-4 font-bold'>Contact Information</h2>
                                <p className='text-2xl'>Say something to start a live chat!</p>
                                <ul className='py-20 text-3xl'>
                                    <a href='http://wa.me/+201006695204' className='flex items-center gap-4 mb-14'>
                                        <FaPhoneVolume />
                                        <span className='text-lg'>+201006695204</span>
                                    </a>
                                    <a href='mailto:support@cloudwavproduction.com' className='flex items-center gap-4 mb-14'>
                                        <IoMdMail />
                                        <span className='text-lg'>support@cloudwavproduction.com</span>
                                    </a>
                                    <li className='flex items-center gap-4 mb-14'>
                                        <FaLocationDot />
                                        <span className='text-lg'>22 Al-Sawah Street, Al-Zaytoun, Cairo, Egypt.</span>
                                    </li>
                                </ul>
                                <div className="flex flex-row gap-5 md:gap-12 pt-8 items-center z-10">
                                    <a href='/' className='bg-[#1B1B1B] text-white hover:bg-white hover:text-[#4D39CF] text-xl transition-all p-4 flex items-center justify-center rounded-full'>
                                        <FaTwitter />
                                    </a>
                                    <a href='/' className='bg-[#1B1B1B] text-white hover:bg-white hover:text-[#4D39CF] text-xl transition-all p-4 flex items-center justify-center rounded-full'>
                                        <FaInstagram />
                                    </a>
                                    <a href='/' className='bg-[#1B1B1B] text-white hover:bg-white hover:text-[#4D39CF] text-xl transition-all p-4 flex items-center justify-center rounded-full'>
                                        <FaTwitch />
                                    </a>
                                </div>
                                <span className='absolute bg-[#30B797] w-64 h-64 bottom-0 right-0 translate-x-[30%] translate-y-[30%] rounded-full' />
                                <span className='absolute bg-[#48484880] w-40 h-40 bottom-0 right-0 -translate-x-[50%] -translate-y-[50%] rounded-full' />
                            </div>
                        </div>
                        <div className="w-full lg:w-3/5">
                            <form action="" onSubmit={formik.handleSubmit}>
                                <div className="flex flex-col flex-wrap gap-10">
                                    <div className='flex gap-10 flex-col md:flex-row'>
                                        <div className='mb-6 md:w-1/2 w-full'>
                                            <label for="name" className="block mb-2 text-sm font-bold text-black">First name</label>
                                            <input type="text"
                                                onChange={formik.handleChange} value={formik.values.firstName}
                                                name="firstName"
                                                id="firstName"
                                                className=" border-b border-[#8D8D8D] text-[#8D8D8D] text-sm outline-b focus-visible:outline-0 block w-full p-2.5" required />
                                        </div>
                                        <div className='mb-6 md:w-1/2 w-full'>
                                            <label for="name" className="block mb-2 text-sm font-bold text-black">Last name</label>
                                            <input type="text"
                                                onChange={formik.handleChange} value={formik.values.lastName}
                                                name="lastName"
                                                id="lastName"
                                                className=" border-b border-[#8D8D8D] text-[#8D8D8D] text-sm outline-b focus-visible:outline-0 block w-full p-2.5" required />
                                        </div>
                                    </div>
                                    <div className='flex gap-10 flex-col md:flex-row'>
                                        <div className='mb-6 md:w-1/2 w-full'>
                                            <label for="email" className="block mb-2 text-sm font-bold text-black">Email</label>
                                            <input type="email"
                                                onChange={formik.handleChange} value={formik.values.email}
                                                name="email"
                                                id="email"
                                                className=" border-b border-[#8D8D8D] text-[#8D8D8D] text-sm outline-b focus-visible:outline-0 block w-full p-2.5" required />
                                        </div>
                                        <div className='mb-6 md:w-1/2 w-full'>
                                            <label for="Phone" className="block mb-2 text-sm font-bold text-black">Phone Number</label>
                                            <input type="tel"
                                                onChange={formik.handleChange} value={formik.values.phoneNumber}
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                className=" border-b border-[#8D8D8D] text-[#8D8D8D] text-sm outline-b focus-visible:outline-0 block w-full p-2.5" required />
                                        </div>
                                    </div>
                                    <div className='mb-6 w-full'>
                                        <label for="massage" className="block mb-2 text-sm font-bold text-black">Massage</label>
                                        <input type="text"
                                            onChange={formik.handleChange} value={formik.values.massage}
                                            name="massage"
                                            id="massage"
                                            placeholder='Write your message..'
                                            className=" border-b border-[#8D8D8D] text-[#8D8D8D] text-sm outline-b focus-visible:outline-0 block w-full p-2.5" required />
                                    </div>
                                    <div className='flex justify-end'>
                                        <button
                                            type="submit"
                                            className="bg-black text-white hover:bg-white border border-black hover:text-[#1B1B1B] font-bold transition-all p-4 rounded-md text-sm"
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
