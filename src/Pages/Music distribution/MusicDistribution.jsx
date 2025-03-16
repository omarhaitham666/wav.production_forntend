import { FaAngleRight, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import musicbg from "../../assets/Img/musicbg.png"
import React from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from "react-i18next";

const MusicDistribution = () => {
    const { t } = useTranslation();

    const initValues = { email: "", name: "", message: "" };

    const inputValidation = Yup.object({
        name: Yup.string().min(3, t("validation.name_min")).max(20, t("validation.name_max")).required(t("validation.name_required")),
        email: Yup.string().min(15, t("validation.email_min")).email(t("validation.email_invalid")).required(t("validation.email_required")),
        message: Yup.string().min(10, t("validation.message_min")).max(500, t("validation.message_max")).required(t("validation.message_required")),
    });

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: inputValidation,
        onSubmit: async (values) => {
            try {
                await axios.post('https://api.cloudwavproduction.com//api/', values);
                Swal.fire({ title: t("success.title"), text: t("success.message"), icon: 'success' });
            } catch (error) {
                let message = t("error.general");
                if (error.response?.status === 422) {
                    message = Object.values(error.response.data.errors).flat().join(' ');
                } else if (error.request) {
                    message = t("error.server");
                }
                Swal.fire({ title: t("error.title"), text: message, icon: 'error' });
            }
        }
    });

    return (
        <div className="p-6 flex justify-center">
            <div className="max-w-6xl mt-22 h-[100%] bg-white p-10 rounded-lg w-full">
                <div className="flex flex-col items-center justify-center text-center mt-10">
                    <h1 className="text-5xl font-black mb-6">{t("header.title")}</h1>
                    <p className="text-2xl w-2/3 font-bold mt-5">{t("header.description")}</p>
                    <div className="flex flex-col sm:flex-row items-center gap-8 mt-4">
                        <Link to={"/Pricing"} className='flex flex-row items-center gap-4 bg-[#30B797] border border-[#30B797] text-white hover:text-[#30B797] font-bold hover:bg-white rounded-full py-3 px-4 text-xl transition-all'>
                            {t("buttons.pricing")} <FaAngleRight />
                        </Link>
                        <Link to={"/Contact"} className='flex flex-row items-center gap-4 bg-[#30B797] border border-[#30B797] text-white hover:text-[#30B797] font-bold hover:bg-white rounded-full py-3 px-4 text-xl transition-all'>
                            {t("buttons.contact")} <FaAngleRight />
                        </Link>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col items-start">
                            <h3 className='text-3xl font-black mb-4'>{t("features.title")}</h3>
                            {["feature1", "feature2", "feature3", "feature4"].map((key, index) => (
                                <div key={index} className="flex flex-row items-center mb-4 gap-2">
                                    <div className='text-gray-600 text-2xl'><FaCheckCircle /></div>
                                    <div className="flex flex-col items-start">
                                        <h3 className='text-3xl font-bold'>{t(`features.${key}.title`)}</h3>
                                        <p className='text-gray-700 text-lg'>{t(`features.${key}.desc`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='bg-[#B4C6FC] p-14 rounded-2xl'>
                            <img src={musicbg} alt={t("image_alt")} />
                        </div>
                    </div>
                    <div className="pt-20 flex flex-col lg:flex-row justify-center gap-10">
                        <div className="lg:w-1/2">
                            <h2 className="text-5xl mb-12 font-bold w-full text-center lg:text-start lg:w-2/3">{t("contactend.title")}</h2>
                            <p className='text-[#4C484F] text-lg w-full text-center lg:text-start lg:w-2/3'>{t("contactend.description")}</p>
                        </div>
                        <div className="lg:w-1/2">
                            <form onSubmit={formik.handleSubmit}>
                                <input className='mb-4 text-[#919499] border border-[#1F1A234D] shadow-xl focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                                    type="text" placeholder={t("contactend.name")} name='name' onChange={formik.handleChange} value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name && <small className='text-red-500'>{formik.errors.name}</small>}
                                <input className='mb-4 text-[#919499] border border-[#1F1A234D] shadow-xl focus:outline-[#2F00AC] rounded-[14px] w-full p-4 mt-4'
                                    type="email" placeholder={t("contactend.email")} name='email' onChange={formik.handleChange} value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email && <small className='text-red-500'>{formik.errors.email}</small>}
                                <textarea className='mb-4 text-[#919499] border border-[#1F1A234D] shadow-xl focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                                    rows='5' placeholder={t("contactend.message")} name='message' onChange={formik.handleChange} value={formik.values.message}
                                />
                                {formik.touched.message && formik.errors.message && <small className='text-red-500'>{formik.errors.message}</small>}
                                <button className='bg-[#1F1A23] text-white font-bold rounded-full p-4 mt-4 text-2xl hover:bg-[#2F00AC] transition' type='submit'>
                                    {t("buttons.send")}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicDistribution;
