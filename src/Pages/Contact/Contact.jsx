import React from 'react';
import { FaInstagram, FaPhoneVolume, FaTwitch, FaTwitter } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    const initValues = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        message: "",
    };

    const inputValidation = Yup.object({
        email: Yup.string()
            .min(15, t("validation.minLength"))
            .email(t("validation.correctEmail"))
            .required(t("validation.required")),
    });

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: inputValidation,
        onSubmit: async (values) => {
            try {
                await axios.post('http://localhost:8000/api/contact', {
                    FirstName: values.firstName,
                    LastName: values.lastName,
                    PhoneNumber: values.phoneNumber,
                    Email: values.email,
                    Message: values.message
                });
            } catch (error) {
                let message = t("errors.default");

                if (error.response && error.response.status === 422) {
                    const errorMessages = error.response.data.errors;
                    message = Object.values(errorMessages).flat().join(' ');
                } else if (error.request) {
                    message = t("errors.noResponse");
                } else {
                    message = `${t("errors.requestError")} ${error.message}`;
                }

                Swal.fire({
                    title: t("errors.title"),
                    text: message,
                    icon: 'error',
                });
            }
        }
    });

    return (
        <>
            <Helmet>
                <title>{t("contact.title")}</title>
            </Helmet>
            <div className='py-24'>
                <div className="container m-auto">
                    <div className="flex flex-col lg:flex-row gap-14 mt-24">
                        <div className="w-full lg:w-2/5">
                            <div className='flex flex-col bg-[#4D39CF] relative p-10 rounded-2xl text-white overflow-hidden'>
                                <h2 className='text-4xl mb-4 font-bold'>{t("contact.header")}</h2>
                                <p className='text-2xl'>{t("contact.subHeader")}</p>
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
                                        <span className='text-lg'>{t("contact.address")}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full lg:w-3/5">
                            <form action="" onSubmit={formik.handleSubmit}>
                                <div className="flex flex-col flex-wrap gap-10">
                                    <div className='flex gap-10 flex-col md:flex-row'>
                                        <div className='mb-6 md:w-1/2 w-full'>
                                            <label htmlFor="firstName" className="block mb-2 text-sm font-bold text-black">{t("contact.firstName")}</label>
                                            <input type="text" name="firstName" id="firstName"
                                                onChange={formik.handleChange} value={formik.values.firstName}
                                                className="border-b border-[#8D8D8D] text-[#8D8D8D] text-sm block w-full p-2.5" required />
                                        </div>
                                        <div className='mb-6 md:w-1/2 w-full'>
                                            <label htmlFor="lastName" className="block mb-2 text-sm font-bold text-black">{t("contact.lastName")}</label>
                                            <input type="text" name="lastName" id="lastName"
                                                onChange={formik.handleChange} value={formik.values.lastName}
                                                className="border-b border-[#8D8D8D] text-[#8D8D8D] text-sm block w-full p-2.5" required />
                                        </div>
                                    </div>
                                    <div className='mb-6 w-full'>
                                        <label htmlFor="message" className="block mb-2 text-sm font-bold text-black">{t("contact.message")}</label>
                                        <input type="text" name="message" id="message"
                                            onChange={formik.handleChange} value={formik.values.message}
                                            placeholder={t("contact.messagePlaceholder")}
                                            className="border-b border-[#8D8D8D] text-[#8D8D8D] text-sm block w-full p-2.5" required />
                                    </div>
                                    <div className='flex justify-end'>
                                        <button type="submit"
                                            className="bg-black text-white hover:bg-white border border-black hover:text-[#1B1B1B] font-bold transition-all p-4 rounded-md text-sm">
                                            {t("contact.sendButton")}
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
