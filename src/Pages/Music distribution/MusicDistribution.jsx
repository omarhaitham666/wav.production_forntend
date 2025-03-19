import { FaAngleRight, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import musicbg from "../../assets/Img/musicbg.png"
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from "react-i18next";

const MusicDistribution = () => {
    const [agree, setAgree] = useState(false);

    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);

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
            const token = localStorage.getItem("token");

            if (!agree) {
                Swal.fire({
                    title: 'خطأ',
                    text: 'يجب الموافقة على الشروط والأحكام قبل التسجيل',
                    icon: 'error',
                });
                return;
            }

            if (!token) {
                Swal.fire({
                    title: "يجب تسجيل الدخول",
                    text: "يجب عليك تسجيل الدخول أولًا لمتابعة العملية.",
                    icon: "warning",
                    confirmButtonText: "تسجيل الدخول",
                }).then(() => {
                    window.location.href = "/Register";
                });

                return;
            }

            try {

                const response = await axios.post("https://api.cloudwavproduction.com/api/", values, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200 || response.status === 201) {
                    Swal.fire({
                        title: "تم التسجيل بنجاح",
                        text: "تم إرسال البيانات بنجاح",
                        icon: "success",
                    });
                    formik.resetForm();
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        Swal.fire({
                            title: "لقد أرسلت طلبًا بالفعل!",
                            text: "طلبك قيد المراجعة، يرجى الانتظار حتى يتم الرد.",
                            icon: "warning",
                        });
                    } else {
                        Swal.fire({
                            title: "خطأ",
                            text: error.response.data.message || "حدث خطأ أثناء التسجيل",
                            icon: "error",
                        });
                    }
                } else {
                    Swal.fire({
                        title: "خطأ",
                        text: "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى لاحقًا.",
                        icon: "error",
                    });
                }
            }

        }
    });

    const formikSer = useFormik({
        initialValues: {
            selectServ: [],
            IWillDo: ""
        },
        validationSchema: Yup.object({
            selectServ: Yup.array().required(t("selectServ_required")),
            IWillDo: Yup.boolean().required(t("IWillDo_required")),
        }),

        onSubmit: async (values) => {
            const token = localStorage.getItem("token");

            if (!agree) {
                Swal.fire({
                    title: 'خطأ',
                    text: 'يجب الموافقة على الشروط والأحكام قبل التسجيل',
                    icon: 'error',
                });
                return;
            }

            // if (!token) {
            //     Swal.fire({
            //         title: "يجب تسجيل الدخول",
            //         text: "يجب عليك تسجيل الدخول أولًا لمتابعة العملية.",
            //         icon: "warning",
            //         confirmButtonText: "تسجيل الدخول",
            //     }).then(() => {
            //         window.location.href = "/Register";
            //     });

            //     return;
            // }

            try {

                const response = await axios.post("https://api.cloudwavproduction.com/api/Music_Service", values, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200 || response.status === 201) {
                    Swal.fire({
                        title: "تم التسجيل بنجاح",
                        text: "تم إرسال البيانات بنجاح",
                        icon: "success",
                    });
                    formik.resetForm();
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        Swal.fire({
                            title: "لقد أرسلت طلبًا بالفعل!",
                            text: "طلبك قيد المراجعة، يرجى الانتظار حتى يتم الرد.",
                            icon: "warning",
                        });
                    } else {
                        Swal.fire({
                            title: "خطأ",
                            text: error.response.data.message || "حدث خطأ أثناء التسجيل",
                            icon: "error",
                        });
                    }
                } else {
                    Swal.fire({
                        title: "خطأ",
                        text: "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى لاحقًا.",
                        icon: "error",
                    });
                }
            }
        }
    })



    return (
        <div className="p-6 flex justify-center">
            <div className="max-w-6xl mt-22 h-[100%] bg-white p-10 rounded-lg w-full">
                <div className="flex flex-col items-center justify-center text-center mt-10">
                    <h1 className="text-5xl font-black mb-6">{t("header.title")}</h1>
                    <p className="text-2xl w-2/3 font-bold mt-5">{t("header.description")}</p>
                    <div className="flex flex-col sm:flex-row items-center gap-8 mt-4">
                        <button
                            onClick={
                                () => {
                                    setModalOpen(true)
                                }
                            }
                            className='flex flex-row items-center gap-4 bg-[#30B797] border border-[#30B797] text-white hover:text-[#30B797] font-bold hover:bg-white rounded-full py-3 px-4 text-xl transition-all'>
                            {t("buttons.pricing")} <FaAngleRight />
                        </button>
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
            {
                modalOpen ?
                    <div className="flex bg-[#000000bf] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[1050] justify-center items-center w-full md:inset-0 h-full max-h-full">
                        <div className="relative p-4 w-full md:w-1/2 max-h-full">
                            <div className="relative bg-white rounded-3xl shadow-sm">
                                <div className="flex items-center justify-between p-4 md:p-5">
                                    <button type="button"
                                        onClick={
                                            () => {
                                                setModalOpen(false)
                                            }
                                        }
                                        className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5">
                                    <form className="space-y-4" action="#" onSubmit={
                                        formikSer.handleSubmit
                                    }>
                                        <div className='mb-6'>
                                            <label className="block mb-2 text-sm font-medium text-[#522ED3]">{t("selectServ")}</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#F8F8F8] p-4 rounded-xl border border-[#1F1A234D] shadow-md">
                                                {[
                                                    "Voice_recording",
                                                    "Songwriting",
                                                    "Music_production",
                                                    "Video_filming",
                                                    "CreatingSong",
                                                    "CreatingSongclip",
                                                ].map((option, index) => (
                                                    <label key={index} className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-[#522ED3] cursor-pointer transition-all hover:bg-[#522ED3] hover:text-white">
                                                        <input
                                                            type="checkbox"
                                                            name="selectServ"
                                                            value={option}
                                                            checked={formikSer.values.selectServ.includes(option)}
                                                            onChange={e => {
                                                                const { value, checked } = e.target;
                                                                formikSer.setFieldValue(
                                                                    "selectServ",
                                                                    checked
                                                                        ? [...formikSer.values.selectServ, value]
                                                                        : formikSer.values.selectServ.filter(item => item !== value)
                                                                );
                                                            }}
                                                            className="w-4 h-4 text-[#522ED3] border-gray-300 focus:ring-[#522ED3]"
                                                        />
                                                        <span>{t(option)}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='mb-6'>
                                            <label className="block mb-2 text-sm font-medium text-[#522ED3]">{t("Select")}</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#F8F8F8] p-4 rounded-xl border border-[#1F1A234D] shadow-md">
                                                <label className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-[#522ED3] cursor-pointer transition-all hover:bg-[#522ED3] hover:text-white">
                                                    <input
                                                        type="radio"
                                                        name="IWillDo"
                                                        value="true"
                                                        checked={formikSer.values.IWillDo === true}
                                                        onChange={() => formikSer.setFieldValue("IWillDo", true)}
                                                        className="w-4 h-4 text-[#522ED3] border-gray-300 focus:ring-[#522ED3]"
                                                    />
                                                    <span>{t("sing_it_myself")}</span>
                                                </label>

                                                <label className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-[#522ED3] cursor-pointer transition-all hover:bg-[#522ED3] hover:text-white">
                                                    <input
                                                        type="radio"
                                                        name="IWillDo"
                                                        value="false"
                                                        checked={formikSer.values.IWillDo === false}
                                                        onChange={() => formikSer.setFieldValue("IWillDo", false)}
                                                        className="w-4 h-4 text-[#522ED3] border-gray-300 focus:ring-[#522ED3]"
                                                    />
                                                    <span>{t("need_a_specific")}</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='flex items-center mt-4'>
                                            <input type="checkbox" id="terms" checked={agree} onChange={() => setAgree(!agree)} className='mr-2' />
                                            <label htmlFor="terms" className='text-sm'>
                                                {t("accpt")} <a href="/Terms/VideosOrder" className='text-[#2F00AC] underline'>{t("trams")}</a>
                                            </label>
                                        </div>
                                        <button type="submit" className="w-full bg-[#522ED3] text-white border border-[#522ED3] hover:bg-white hover:text-[#522ED3] font-bold rounded-full px-6 py-3 text-center">Send Now</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""
            }
        </div>
    );
}

export default MusicDistribution;
