import React, { useState } from 'react';
import Rising from '../../assets/Img/singing.png'
import RisingActive from '../../assets/Img/singing-active.png'
import famous from '../../assets/Img/karaoke.png'
import famousActive from '../../assets/Img/karaoke-active.png'
import Swal from 'sweetalert2';
import RisingForm from './RisingForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';


const JoinUs = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const token = localStorage.getItem("token");
    const [preview, setPreview] = useState(null);
    const [agree, setAgree] = useState(false);
    const [step, setStep] = useState(1);

    const [videoMaker, setVideoMaker] = useState(false);


    // العودة للخطوة السابقة (إذا أردت)
    const prevStep = () => setStep(step - 1);

    // تخطي الخطوة والانتقال للإرسال
    const skipStep = () => setStep(3);

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
            whatsapp_number: "",
            details: "",
            division: "",
            social_links: "",
            profile_image: null, // تأكد من أنه null وليس ""
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
                .test("isNumeric", "يجب أن يحتوي على أرقام فقط", (value) => /^\d+$/.test(value))
                .required("رقم الهاتف مطلوب"),

            whatsapp_number: Yup.string()
                .matches(/^(010|011|012|015)[0-9]{8}$/, "يجب أن يكون رقمًا مصريًا صحيحًا")
                .test("isNumeric", "يجب أن يحتوي على أرقام فقط", (value) => /^\d+$/.test(value))
                .required("رقم الهاتف مطلوب"),

            details: Yup.string()
                .min(10, "cant be less than 10 letters")
                .max(500, "cant be more than 500 letters"),

            division: Yup.string()
                .required("division is required"),

            social_links: Yup.string()
                .url("enter the correct url")
                .required("social links is required"),

            profile_image: Yup.mixed()
                .required("الصورة مطلوبة")
                .test("fileType", "يجب أن تكون الصورة بصيغة JPEG, PNG, أو", (value) => {
                    return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
                })
                .test("fileSize", "يجب أن لا يتجاوز حجم الصورة 2MB", (value) => {
                    return value && value.size <= 2 * 1024 * 1024; // 2MB
                }),
        }),

        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            const token = localStorage.getItem("token");

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

            if (!agree) {
                Swal.fire({
                    title: 'خطأ',
                    text: 'يجب الموافقة على الشروط والأحكام قبل التسجيل',
                    icon: 'error',
                });
                return;
            }

            try {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("email", values.email);
                formData.append("number", values.number);
                formData.append("whatsapp_number", values.whatsapp_number);
                formData.append("details", values.details);
                formData.append("division", values.division);
                formData.append("social_links", values.social_links);

                if (values.profile_image) {
                    formData.append("profile_image", values.profile_image);
                }

                const response = await axios.post("http://127.0.0.1:8000/api/artist-requests", formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                });

                if (response.status === 200 || response.status === 201) {
                    Swal.fire({
                        title: "تم التسجيل بنجاح",
                        text: "تم إرسال البيانات بنجاح",
                        icon: "success",
                    });
                    formik.resetForm();
                    setImagePreview("");
                    setShowForm(false);
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

    const famousformik = useFormik({
        initialValues: {
            famous_name: "",
            famous_email: "",
            famous_number: "",
            famous_whatsapp_number: "",
            famous_details: "",
            famous_division: "",
            famous_social_links: "",
            famous_profile_image: null,
            videoMaker_details: ""
        },
        validationSchema: Yup.object({
            famous_name: Yup.string()
                .min(3, "cant be less than 3 letters")
                .max(20, "cant be more than 20 letters")
                .required("name is invalid"),

            famous_email: Yup.string()
                .min(15, "يجب أن لا يقل عن 15 حرف")
                .email("enter the correct email")
                .required("this is invalid"),

            number: Yup.string()
                .matches(/^(010|011|012|015)[0-9]{8}$/, "يجب أن يكون رقمًا مصريًا صحيحًا")
                .test("isNumeric", "يجب أن يحتوي على أرقام فقط", (value) => /^\d+$/.test(value))
                .required("رقم الهاتف مطلوب"),

            whatsapp_number: Yup.string()
                .matches(/^(010|011|012|015)[0-9]{8}$/, "يجب أن يكون رقمًا مصريًا صحيحًا")
                .test("isNumeric", "يجب أن يحتوي على أرقام فقط", (value) => /^\d+$/.test(value))
                .required("رقم الهاتف مطلوب"),

            famous_details: Yup.string()
                .min(10, "cant be less than 10 letters")
                .max(500, "cant be more than 500 letters"),

            famous_division: Yup.string()
                .required("division is required"),

            famous_social_links: Yup.string()
                .url("enter the correct url")
                .required("social links is required"),

            famous_profile_image: Yup.mixed()
                .required("الصورة مطلوبة")
                .test("fileType", "يجب أن تكون الصورة بصيغة JPEG, PNG, أو GIF", (value) => {
                    return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
                })
                .test("fileSize", "يجب أن لا يتجاوز حجم الصورة 2MB", (value) => {
                    return value && value.size <= 2 * 1024 * 1024; // 2MB
                }),
            videoMaker_details: Yup.string()
                .min(10, "cant be less than 10 letters")
                .max(500, "cant be more than 500 letters")
        }),


        onSubmit: async (values) => {
            // const token = localStorage.getItem("token");

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

            if (!agree) {
                Swal.fire({
                    title: 'خطأ',
                    text: 'يجب الموافقة على الشروط والأحكام قبل التسجيل',
                    icon: 'error',
                });
                return;
            }



            try {
                const formData = new FormData();
                formData.append("famous_name", values.famous_name);
                formData.append("famous_email", values.famous_email);
                formData.append("famous_number", values.famous_number);
                formData.append("famous_whatsapp_number", values.famous_whatsapp_number);
                formData.append("famous_details", values.famous_details);
                formData.append("famous_division", values.famous_division);
                formData.append("famous_social_links", values.famous_social_links);
                formData.append("videoMaker_details", values.videoMaker_details);

                if (values.famous_profile_image) {
                    formData.append("famous_profile_image", values.famous_profile_image);
                }

                const response = await axios.post("http://127.0.0.1:8000/api/famous-artist-requests", formData, {
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
                    famousformik.resetForm();
                    setImagePreview("");
                    setShowForm(false);
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


    const nextStep = async () => {
        const errors = await famousformik.validateForm();

        if (Object.keys(errors).length === 0) {
            setStep(step + 1); // الانتقال للخطوة التالية فقط إذا لم تكن هناك أخطاء
        } else {
            famousformik.setTouched(
                Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
                false // منع إعادة التصيير التلقائي
            );

            famousformik.setErrors(errors); // تأكيد ظهور الأخطاء

            famousformik.validateForm(); // إعادة التحقق لإجبار إعادة التصيير}
        };
    }



    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            famousformik.setFieldValue("famous_profile_image", file);
            setPreview(URL.createObjectURL(file));
        }
    };


    return (
        <>
            <Helmet>
                <title>Join Us | Could.wav</title>
            </Helmet>
            <div className={`py-40 bg-white`}>
                <div className="container mx-auto">
                    <form className="flex justify-center items-center flex-col" action="" value={selectedOption} id="type" onChange={handleChange}>
                        <h1 htmlFor="type" className='text-center text-3xl font-bold text-black mb-12'>Please select your type:</h1>
                        <div className="flex justify-center gap-12 flex-wrap mb-16">
                            <label htmlFor="Rising" className='flex flex-col justify-center items-center text-center p-8 bg-white border border-[#0000000D] shadow-xl rounded-xl'>
                                <img src={selectedOption === "Rising" ? RisingActive : Rising} alt="Rising" className="w-56 h-w-56 mb-1" />
                                <p className='text-black text-2xl font-bold mb-2'>Rising Singer</p>
                                <input type="checkbox"
                                    id="Rising"
                                    name="Rising"
                                    value="Rising"
                                    className="hidden"
                                />
                                <div className={`${selectedOption === "Rising" ? 'bg-[#30B797]' : "border-2"} bg-[#303030] w-5 h-5  rounded-full flex items-center justify-center transition-all`}>
                                    {selectedOption === "Rising" ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 text-white transition"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : ""}
                                </div>
                            </label>
                            <label htmlFor="famous" className='flex flex-col justify-center items-center text-center p-8 bg-white border border-[#0000000D] shadow-xl rounded-xl'>
                                <img src={selectedOption === "famous" ? famousActive : famous} alt="famous" className="w-56 h-w-56 mb-1" />
                                <p className='text-black text-2xl font-bold mb-2'>famous Singer</p>
                                <input type="checkbox"
                                    id="famous"
                                    name="famous"
                                    value="famous"
                                    className="hidden"
                                />
                                <div className={`${selectedOption === "famous" ? 'bg-[#30B797]' : "border-2"} bg-[#303030] w-5 h-5  rounded-full flex items-center justify-center transition-all`}>
                                    {selectedOption === "famous" ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 text-white transition"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : ""}
                                </div>
                            </label>
                        </div>
                        {selectedOption === "" ?
                            <button
                                onClick={
                                    (event) => {
                                        event.preventDefault();
                                    }
                                }
                                className="text-2xl gap-4 px-12 py-4 rounded-3xl font-bold cursor-not-allowed text-black bg-[#C9C9C9] ">Next</button>
                            :
                            <button
                                onClick={
                                    (event) => {
                                        event.preventDefault();
                                        if (selectedOption === '') {
                                            Swal.fire(
                                                'Error',
                                                'Please select your type',
                                                'error'
                                            )
                                        } else {
                                            setSelectedType(selectedOption)
                                            if (selectedType === "famous") {
                                                setShowForm(true);
                                            }
                                            if (selectedType === "Rising") {
                                                setShowForm(true);
                                            }

                                        }
                                    }
                                }
                                className="text-2xl gap-4 px-12 py-4 rounded-3xl font-bold border cursor-pointer border-[#30B797] text-white bg-[#30B797] hover:bg-white hover:text-[#30B797] transition"
                            >Next</button>}
                    </form>
                    {
                        (selectedType === "famous" || selectedType === "Rising") && (

                            <>
                                {/* <RisingForm /> */}
                                {showForm === true ?
                                    <div aria-hidden="true" className="flex bg-[#000000bf] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
                                        <div className="relative p-4 w-full md:w-1/2 max-h-full">
                                            <div className="relative bg-white rounded-3xl shadow-sm">
                                                <div className="flex items-center justify-between p-4 md:p-5">
                                                    <button type="button" onClick={
                                                        () => {
                                                            setShowForm(false)
                                                            setStep(1)
                                                        }
                                                    } className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
                                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                </div>
                                                <div className="p-4 md:p-5">
                                                    <form className="space-y-4" action="#" onSubmit={formik.handleSubmit}>
                                                        <div className='mb-6'>
                                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#522ED3]">Your name</label>
                                                            <input type="name"
                                                                onChange={formik.handleChange} value={formik.values.name}
                                                                name="name"
                                                                id="name"
                                                                placeholder="Your name"
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
                                                                className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your email' />
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
                                                                onBlur={formik.handleBlur}
                                                                onInput={(e) => {
                                                                    e.target.value = e.target.value.replace(/\D/g, "");
                                                                }}
                                                                className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your Number' />
                                                            {formik.touched.number && formik.errors.number ? (
                                                                <small className='text-red-500'>{formik.errors.number}</small>
                                                            ) : null}
                                                        </div>
                                                        <div className='mb-6'>
                                                            <label htmlFor="number" className="block mb-2 text-sm font-medium text-[#522ED3]">Whatsapp Number</label>
                                                            <input type="tel"
                                                                onChange={formik.handleChange} value={formik.values.whatsapp_number}
                                                                name="whatsapp_number"
                                                                id="Number"
                                                                onBlur={formik.handleBlur} // تشغيل التحقق عند فقدان التركيز
                                                                onInput={(e) => {
                                                                    e.target.value = e.target.value.replace(/\D/g, "");
                                                                }}
                                                                className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='whatsapp Number' />
                                                            {formik.touched.whatsapp_number && formik.errors.whatsapp_number ? (
                                                                <small className='text-red-500'>{formik.errors.whatsapp_number}</small>
                                                            ) : null}
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
                                                                onChange={formik.handleChange} value={formik.values.social_links}
                                                                name="social_links"
                                                                id="links"
                                                                className="border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your social media links' />
                                                            {formik.touched.social_links && formik.errors.social_links ? (
                                                                <small className='text-red-500'>{formik.errors.social_links}</small>
                                                            ) : null}
                                                        </div>
                                                        <div className='mb-6'>
                                                            <label htmlFor="details" className="block mb-2 text-sm font-medium text-[#522ED3]">More Details</label>
                                                            <input type="text"
                                                                onChange={formik.handleChange} value={formik.values.details}
                                                                name="details"
                                                                id="Details"
                                                                className="border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='More Details' />
                                                            {formik.touched.details && formik.errors.details ? (
                                                                <small className='text-red-500'>{formik.errors.details}</small>
                                                            ) : null}
                                                        </div>
                                                        <div className='mb-6'>
                                                            <label htmlFor="profile_image" className="block mb-2 text-sm font-medium text-[#522ED3]">
                                                                Your Image
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    setImage(file);
                                                                    formik.setFieldValue("profile_image", file);
                                                                    const reader = new FileReader();
                                                                    reader.onload = () => {
                                                                        setImagePreview(reader.result);
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }}
                                                                name="profile_image"
                                                                id="image"
                                                                className="border border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full py-10 px-2.5 rounded-2xl text-center"
                                                            />
                                                            {imagePreview && (
                                                                <div className="mt-3">
                                                                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                                                                </div>
                                                            )}
                                                            {formik.touched.profile_image && formik.errors.profile_image ? (
                                                                <small className='text-red-500'>{formik.errors.profile_image}</small>
                                                            ) : null}
                                                        </div>
                                                        <div className='flex items-center mt-4'>
                                                            <input type="checkbox" id="terms" checked={agree} onChange={() => setAgree(!agree)} className='mr-2' />
                                                            <label htmlFor="terms" className='text-sm'>
                                                                أوافق على <a href={`/Terms/${selectedType}`} className='text-[#2F00AC] underline'>الشروط والأحكام</a>
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
                            </>
                        )
                    }
                    {/* {
                        selectedType === "famous" && (
                            <>
                                {showForm === true ?
                                    <div aria-hidden="true" className=" flex bg-[#000000bf] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[2000] justify-center items-center w-full md:inset-0 h-full max-h-full">
                                        <div className="relative p-4 w-full md:w-1/2 max-h-full">
                                            <div className="relative bg-white rounded-3xl shadow-sm">
                                                <div className="flex items-center justify-between p-4 md:p-5">
                                                    <button type="button" onClick={
                                                        () => {
                                                            setShowForm(false)
                                                            setStep(1)
                                                        }
                                                    } className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
                                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                </div>
                                                <div className="p-4 md:p-5">
                                                    <form className="space-y-4" action="#" onSubmit={(e) => { e.preventDefault(); famousformik.handleSubmit(e); }}>
                                                        {step === 1 && (
                                                            <>
                                                                <div className='mb-6'>
                                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#522ED3]">Your name</label>
                                                                    <input type="name"
                                                                        name="famous_name"
                                                                        id="Name"
                                                                        value={famousformik.values.famous_name}
                                                                        onChange={famousformik.handleChange}
                                                                        onBlur={famousformik.handleBlur}
                                                                        placeholder="Your name"
                                                                        className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" />
                                                                    {famousformik.touched.famous_name && famousformik.errors.famous_name ? (
                                                                        <small className='text-red-500'>{famousformik.errors.famous_name}</small>
                                                                    ) : null}
                                                                </div>
                                                                <div className='mb-6'>
                                                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#522ED3]">Your email</label>
                                                                    <input type="email"
                                                                        onChange={famousformik.handleChange} value={famousformik.values.famous_email}
                                                                        name="famous_email"
                                                                        id="email"
                                                                        className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your email' />
                                                                    {famousformik.touched.famous_email && famousformik.errors.famous_email ? (
                                                                        <small className='text-red-500'>{famousformik.errors.famous_email}</small>
                                                                    ) : null}
                                                                </div>

                                                                <div className='mb-6'>
                                                                    <label htmlFor="Number" className="block mb-2 text-sm font-medium text-[#522ED3]">Your Number</label>
                                                                    <input type="tel"
                                                                        onChange={famousformik.handleChange} value={famousformik.values.famous_number}
                                                                        name="famous_number"
                                                                        id="Number"
                                                                        className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your Number' />
                                                                    {famousformik.touched.famous_number && famousformik.errors.famous_number ? (
                                                                        <small className='text-red-500'>{famousformik.errors.famous_number}</small>
                                                                    ) : null}
                                                                </div>
                                                                <div className='mb-6'>
                                                                    <label htmlFor="Number" className="block mb-2 text-sm font-medium text-[#522ED3]">Your whatsapp Number</label>
                                                                    <input type="tel"
                                                                        onChange={famousformik.handleChange} value={famousformik.values.famous_whatsapp_number}
                                                                        name="famous_whatsapp_number"
                                                                        id="Number"
                                                                        className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your Number' />
                                                                    {famousformik.touched.famous_whatsapp_number && famousformik.errors.famous_whatsapp_number ? (
                                                                        <small className='text-red-500'>{famousformik.errors.famous_whatsapp_number}</small>
                                                                    ) : null}
                                                                </div>
                                                                <div className='mb-6'>
                                                                    <label htmlFor="Division" className="block mb-2 text-sm font-medium text-[#522ED3]">Artist Division</label>
                                                                    <select id="Division"
                                                                        name="famous_division"
                                                                        onChange={famousformik.handleChange} value={famousformik.values.famous_division}
                                                                        className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5">
                                                                        <option value="">Select Division</option>
                                                                        <option value="Mahraganat">Mahraganat</option>
                                                                        <option value="rap">Rap</option>
                                                                        <option value="Pop">pop</option>
                                                                    </select>
                                                                    {famousformik.touched.famous_division && famousformik.errors.famous_division ? (
                                                                        <small className='text-red-500'>{famousformik.errors.famous_division}</small>
                                                                    ) : null}
                                                                </div>
                                                                <div className='mb-6'>
                                                                    <label htmlFor="links" className="block mb-2 text-sm font-medium text-[#522ED3]">Social media links</label>
                                                                    <input type="text"
                                                                        onChange={famousformik.handleChange} value={famousformik.values.famous_social_links}
                                                                        name="famous_social_links"
                                                                        id="links"
                                                                        className="border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your social media links' />
                                                                    {famousformik.touched.famous_social_links && famousformik.errors.famous_social_links ? (
                                                                        <small className='text-red-500'>{famousformik.errors.famous_social_links}</small>
                                                                    ) : null}
                                                                </div>
                                                                <div className='mb-6'>
                                                                    <label htmlFor="Details" className="block mb-2 text-sm font-medium text-[#522ED3]">details</label>
                                                                    <input type="text"
                                                                        onChange={famousformik.handleChange} value={famousformik.values.famous_details}
                                                                        name="famous_details"
                                                                        id="Details"
                                                                        className="border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your social media links' />
                                                                    {famousformik.touched.famous_details && famousformik.errors.famous_details ? (
                                                                        <small className='text-red-500'>{famousformik.errors.famous_details}</small>
                                                                    ) : null}
                                                                </div>
                                                                <div className='mb-6'>
                                                                    <label htmlFor="profile_image" className="block mb-2 text-sm font-medium text-[#522ED3]">
                                                                        Your Image
                                                                    </label>
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={handleImageChange}
                                                                        name="famous_profile_image"
                                                                        id="profile_image"
                                                                        className="border border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full py-10 px-2.5 rounded-2xl text-center"
                                                                    />
                                                                    {preview && (
                                                                        <div className="mt-4">
                                                                            <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow mx-auto" />
                                                                        </div>
                                                                    )}
                                                                    {famousformik.touched.famous_profile_image && famousformik.errors.famous_profile_image ? (
                                                                        <small className='text-red-500'>{famousformik.errors.famous_profile_image}</small>
                                                                    ) : null}
                                                                </div>
                                                                <div className='flex items-center mt-4'>
                                                                    <input type="checkbox" id="terms" checked={agree} onChange={() => setAgree(!agree)} className='mr-2' />
                                                                    <label htmlFor="terms" className='text-sm'>
                                                                        أوافق على <a href={`/Terms/${selectedType}`} className='text-[#2F00AC] underline'>الشروط والأحكام</a>
                                                                    </label>
                                                                </div>
                                                                <button className={`${formik.isValid ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-[#522ED3] text-white "} w-full  border border-[#522ED3] hover:bg-white hover:text-[#522ED3] font-bold rounded-full px-6 py-3 text-center`}
                                                                    onClick={nextStep}
                                                                    disabled={!formik.isValid}>
                                                                    Next
                                                                </button>
                                                            </>
                                                        )}
                                                        {step === 2 && (
                                                            <>
                                                                <h2 className='text-center mb-4'>Are you ready to provide video creation service?</h2>
                                                                <div className='mb-6'>
                                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#522ED3]">Write any details and any rules of your own for review, if any.</label>
                                                                    <textarea type="text"
                                                                        onChange={famousformik.handleChange} value={famousformik.values.videoMaker_details}
                                                                        name="videoMaker_details"
                                                                        id="videoMaker_Details"
                                                                        className="border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='By writing in this field, you mean that you agree to provide the service.' />
                                                                    {famousformik.touched.videoMaker_details && famousformik.errors.videoMaker_details ? (
                                                                        <small className='text-red-500'>{famousformik.errors.videoMaker_details}</small>
                                                                    ) : null}
                                                                </div>
                                                                <div className="flex justify-between gap-4 mt-4">
                                                                    <button className="w-full border border-[#522ED3] bg-white text-[#522ED3] hover:bg-[#522ED3] hover:text-white  font-bold rounded-full px-6 py-3 text-center"
                                                                        type='submit'>
                                                                        Skip
                                                                    </button>
                                                                    <button className="w-full bg-[#522ED3] text-white border border-[#522ED3] hover:bg-white hover:text-[#522ED3] font-bold rounded-full px-6 py-3 text-center"
                                                                        type='submit'>
                                                                        Send
                                                                    </button>
                                                                </div>
                                                            </>)}
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : ""
                                }
                            </>
                        )
                    } */}
                </div>
            </div >
        </>
    );
}

export default JoinUs;
