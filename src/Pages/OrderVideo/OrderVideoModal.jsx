import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const OrderVideoModal = ({ orderInfo, handleClose }) => {
    const [agree, setAgree] = useState(false);



    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
            mas: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "cant be less than 3 letters")
                .max(20, "cant be more than 20 letters")
                .required("name is invalid"),

            email: Yup.string()
                .min(15, "يجب أن لا يقل عن 15 حرف")
                .email("enter the correct email")
                .required("this is invalid"),

            number: Yup.string()
                .matches(/^(010|011|012|015)[0-9]{8}$/, "يجب أن يكون رقمًا مصريًا صحيحًا")
                .required("رقم الهاتف مطلوب"),

            mas: Yup.string()
                .min(10, "يجب ألا يقل عن 10 أحرف")
                .max(500, "يجب ألا يزيد عن 500 حرف")
                .required("الوصف مطلوب"),
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
                const formData = new FormData();
                formData.append("order_name", values.name);
                formData.append("order_email", values.email);
                formData.append("order_number", values.number);
                formData.append("order_mas", values.mas);
                formData.append("order_type", orderInfo?.videoType);
                formData.append("order_artistName", orderInfo?.artistName);



                const response = await axios.post("http://127.0.0.1:8000/api/order", formData, {
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
        const { t } = useTranslation();
    


    return (
        <div className="flex bg-[#000000bf] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-4 w-full md:w-1/2 max-h-full">
                <div className="relative bg-white rounded-3xl shadow-sm">
                    <div className="flex items-center justify-between p-4 md:p-5">
                        <button type="button"
                            onClick={
                                () => {
                                    handleClose();
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
                            formik.handleSubmit
                        }>
                            <div className='mb-6'>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#522ED3]">{t("Your_name")}</label>
                                <input type="name"
                                    onChange={formik.handleChange} value={formik.values.name}
                                    name="name"
                                    id="name"
                                    placeholder="Your Name"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" />
                                {formik.touched.name && formik.errors.name ? (
                                    <small className='text-red-500'>{formik.errors.name}</small>
                                ) : null}
                            </div>
                            <div className='mb-6'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#522ED3]">{t("Your_email")}</label>
                                <input type="email"
                                    onChange={formik.handleChange} value={formik.values.email}
                                    name="email"
                                    id="email"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='YourMail@gmail.com' />
                                {formik.touched.email && formik.errors.email ? (
                                    <small className='text-red-500'>{formik.errors.email}</small>
                                ) : null}
                            </div>
                            <div className='mb-6'>
                                <label htmlFor="number" className="block mb-2 text-sm font-medium text-[#522ED3]">{t("Your_Number")}</label>
                                <input type="tel"
                                    onChange={formik.handleChange} value={formik.values.number}
                                    name="number"
                                    id="Number"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='01012345678' />
                                {formik.touched.number && formik.errors.number ? (
                                    <small className='text-red-500'>{formik.errors.number}</small>
                                ) : null}
                            </div>
                            <div className='mb-6'>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-[#522ED3]">{t("Write_your_Text")}</label>
                                <textarea
                                    onChange={formik.handleChange} value={formik.values.mas}
                                    name="mas"
                                    id="mas"
                                    className="border rounded-xl border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5 h-[150px] resize-y" placeholder='Write your Text' />
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
    );
}

export default OrderVideoModal;
