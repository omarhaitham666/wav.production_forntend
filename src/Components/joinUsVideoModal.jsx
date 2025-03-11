import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const JoinUsVideoModal = ({ handleClose }) => {
    const [agree, setAgree] = useState(false);
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [iD_image, setID_image] = useState("");

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            number: '',
            Personal_price: "",
            Business_price: "",
            division: '',
            Personal_social_links: '',
            Personal_profile_image: null,
            ID_image: null
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

            Personal_price: Yup.number().required("السعر الشخصي مطلوب"),

            Business_price: Yup.number().required("السعر التجاري مطلوب"),

            division: Yup.string()
                .required("division is required"),

            Personal_social_links: Yup.string()
                .url("enter the correct url")
                .required("social links is required"),


            Personal_profile_image: Yup.mixed()
                .required("الصورة مطلوبة")
                .test("fileType", "يجب أن تكون الصورة بصيغة JPEG, PNG, أو GIF", (value) => {
                    return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
                })
                .test("fileSize", "يجب أن لا يتجاوز حجم الصورة 2MB", (value) => {
                    return value && value.size <= 2 * 1024 * 1024; // 2MB
                }),

            ID_image: Yup.mixed()
                .required("صورة الهوية مطلوبة")
                .test("fileType", "يجب أن تكون الصورة بصيغة JPEG, PNG أو GIF", (value) => {
                    return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
                })
                .test("fileSize", "يجب أن لا يتجاوز حجم الصورة 2MB", (value) => {
                    return value && value.size <= 2 * 1024 * 1024; // 2MB
                }),

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
                formData.append("name", values.name);
                formData.append("email", values.email);
                formData.append("phone", values.number);
                formData.append("personal_price", values.Personal_price);
                formData.append("business_price", values.Business_price);
                formData.append("division", values.division);
                formData.append("personal_social_links", values.Personal_social_links);
                const token = localStorage.getItem("token");

                if (values.Personal_profile_image) {
                    formData.append("famous_profile_image", values.famous_profile_image);
                }

                if (values.ID_image) {
                    formData.append("ID_image", values.ID_image);
                }


                const response = await axios.post("http://127.0.0.1:8000/api/Join-Video", formData, {
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
                    setImagePreview("");
                    setID_image("");
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
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#522ED3]">Your name</label>
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
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#522ED3]">Your email</label>
                                <input type="email"
                                    onChange={formik.handleChange} value={formik.values.email}
                                    name="email"
                                    id="email"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='yourmail@gmail.com' />
                                {formik.touched.email && formik.errors.email ? (
                                    <small className='text-red-500'>{formik.errors.email}</small>
                                ) : null}
                            </div>
                            <div className='mb-6'>
                                <label htmlFor="number" className="block mb-2 text-sm font-medium text-[#522ED3]">Your Number</label>
                                <input type="tel"
                                    onChange={formik.handleChange} value={formik.values.number}
                                    name="number"
                                    id="Number"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='01023456789' />
                                {formik.touched.number && formik.errors.number ? (
                                    <small className='text-red-500'>{formik.errors.number}</small>
                                ) : null}
                            </div>
                            <div className="flex flex-col lg:flex-row lg:gap-8">
                                <div className='mb-6 lg:w-1/2'>
                                    <label htmlFor="personal_price" className="block mb-2 text-sm font-medium text-[#522ED3]">Personal video price</label>
                                    <input type="number"
                                        onChange={formik.handleChange} value={formik.values.Personal_price}
                                        name="personal_price"
                                        id="personal_price"
                                        className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='00:0 $' />
                                    {formik.touched.Personal_price && formik.errors.Personal_price ? (
                                        <small className='text-red-500'>{formik.errors.Personal_price}</small>
                                    ) : null}
                                </div>
                                <div className='mb-6 lg:w-1/2'>
                                    <label htmlFor="Business_price" className="block mb-2 text-sm font-medium text-[#522ED3]">Business video price</label>
                                    <input type="number"
                                        onChange={formik.handleChange} value={formik.values.Business_price}
                                        name="Business_price"
                                        id="Business_price"
                                        className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='00:0 $' />
                                    {formik.touched.Business_price && formik.errors.Business_price ? (
                                        <small className='text-red-500'>{formik.errors.Business_price}</small>
                                    ) : null}
                                </div>
                            </div>
                            <div className='mb-6'>
                                <label htmlFor="division" className="block mb-2 text-sm font-medium text-[#522ED3]">Artist Division</label>
                                <select id="Division"
                                    name="division"
                                    onChange={formik.handleChange} value={formik.values.division}
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5">
                                    <option value="">Select Division</option>
                                    <option value="Mahraganat">Mahraganat</option>
                                    <option value="rap">Rap</option>
                                    <option value="pop">pop</option>
                                    <option value="jazz">jazz</option>
                                    <option value="rock">rock</option>
                                </select>
                                {formik.touched.division && formik.errors.division ? (
                                    <small className='text-red-500'>{formik.errors.division}</small>
                                ) : null}

                            </div>
                            <div className='mb-6'>
                                <label htmlFor="social_links" className="block mb-2 text-sm font-medium text-[#522ED3]">Social media links</label>
                                <input type="text"
                                    onChange={formik.handleChange} value={formik.values.Personal_social_links}
                                    name="Personal_social_links"
                                    id="links"
                                    className="border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your social media links' />
                                {formik.touched.Personal_social_links && formik.errors.Personal_social_links ? (
                                    <small className='text-red-500'>{formik.errors.Personal_social_links}</small>
                                ) : null}
                            </div>
                            <div className='mb-6'>
                                <label htmlFor="Personal_profile_image" className="block mb-2 text-sm font-medium text-[#522ED3]">
                                    Your Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setImage(file);
                                        formik.setFieldValue("Personal_profile_image", file);
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            setImagePreview(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                    name=" Personal_profile_image"
                                    id="image"
                                    className="border border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full py-10 px-2.5 rounded-2xl text-center"
                                />
                                {imagePreview && (
                                    <div className="mt-3">
                                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                                    </div>
                                )}
                                {formik.touched.Personal_profile_image && formik.errors.Personal_profile_image ? (
                                    <small className='text-red-500'>{formik.errors.Personal_profile_image}</small>
                                ) : null}
                            </div>
                            <div className='mb-6'>
                                <label htmlFor="ID_image" className="block mb-2 text-sm font-medium text-[#522ED3]">
                                    We want proof of identity
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setImage(file);
                                        formik.setFieldValue("ID_image", file);
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            setID_image(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                    name="ID_image"
                                    id="ID_image"
                                    className="border border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full py-10 px-2.5 rounded-2xl text-center"
                                />
                                {iD_image && (
                                    <div className="mt-3">
                                        <img src={iD_image} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                                    </div>
                                )}
                                {formik.touched.ID_image && formik.errors.ID_image ? (
                                    <small className='text-red-500'>{formik.errors.ID_image}</small>
                                ) : null}
                            </div>

                            <div className='flex items-center mt-4'>
                                <input type="checkbox" id="terms" checked={agree} onChange={() => setAgree(!agree)} className='mr-2' />
                                <label htmlFor="terms" className='text-sm'>
                                    أوافق على <a href="/Terms" className='text-[#2F00AC] underline'>الشروط والأحكام</a>
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

export default JoinUsVideoModal;
