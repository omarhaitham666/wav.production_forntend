import React from 'react';
import Kit from '../../assets/Img/Kit.png'
import lamp from '../../assets/Img/lamp.png'
import { MdCamera } from 'react-icons/md';
import { IoMdRedo } from 'react-icons/io';
import { RiThreadsLine } from 'react-icons/ri';
import { AiFillLike } from 'react-icons/ai';
import { FaChevronRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';


const Services = () => {
    const [selectedService, setSelectedService] = useState("");
    const [modalOpen, setModalOpen] = useState(false)


    const SocialMediaServices = [
        {
            title: 'Creating and documenting platforms',
            description: 'We help you create and manage social media platforms like Facebook, Instagram, Twitter, LinkedIn, and Pinterest, as well as social media apps like TikTok, YouTube, and Snapchat.',
            icon: <MdCamera />,
            price: "50"
        },
        {
            title: 'Recover closed accounts',
            description: 'We help you recover closed accounts, reactivate deactivated accounts, and restore deleted accounts.',
            icon: <IoMdRedo />,
            price: "25"
        },
        {
            title: 'Create sponsored ads',
            description: 'We help you create sponsored ads on platforms like Google Ads, Facebook Ads, and Google My Business, as well as on social media apps like TikTok, YouTube, and Snapchat.',
            icon: <RiThreadsLine />,
            price: "15"
        },
        {
            title: 'Provide likes and followers',
            description: 'We help you provide likes and followers on platforms like Facebook, Instagram, Twitter',
            icon: <AiFillLike />,
            price: "10"
        },
    ]

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
                const response = await axios.post('http://localhost:8000/api/', {
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


    const servicesFormik = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
            whatsapp_number: "",
            details: "",
            social_links: "",
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

            whatsapp_number: Yup.string()
                .matches(/^(010|011|012|015)[0-9]{8}$/, "يجب أن يكون رقمًا مصريًا صحيحًا")
                .required("رقم الهاتف مطلوب"),

            details: Yup.string()
                .min(10, "cant be less than 10 letters")
                .max(500, "cant be more than 500 letters"),

            social_links: Yup.string()
                .url("enter the correct url")
                .required("social links is required"),

        }),
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

            try {
                const formData = new FormData();
                formData.append("selectedService", selectedService);
                formData.append("name", values.name);
                formData.append("email", values.email);
                formData.append("number", values.number);
                formData.append("whatsapp_number", values.whatsapp_number);
                formData.append("details", values.details);
                formData.append("social_links", values.social_links);


                const response = await axios.post("http://127.0.0.1:8000/api/servicesOrder", formData, {
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



    return (
        <>
            <Helmet>
                <title>Services | Could.wav</title>
            </Helmet>
            <div className="py-24">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row justify-center gap-8">
                        <div className="w-full lg:w-1/2">
                            <h1 className='text-6xl font-bold mb-4'>Social Media Specialist</h1>
                            <p className="text-xl leading-10 mb-4">Here is the reality: having a strong Social Media presence is essential for
                                Whether you are managing a local startup or a large-scale enterprise, social media is the bridge that connects your brand to your audience.
                                It is more than just posting—it is about sharing valuable, engaging, and meaningful content that resonates with your customers.
                                A well-executed social media strategy helps you boost brand awareness, build trust, enhance your online visibility, and make your business more memorable in a competitive digital landscape.
                                Social media isn it just an option; it is the foundation for building lasting connections with your audience.
                            </p>
                            <button
                                className="py-2 px-8 text-lg bg-[#30B797] text-white border border-[#30B797] cursor-pointer hover:text-[#30B797] font-bold rounded-2xl hover:bg-white transition-all"
                                href="#Sevrvices"
                            >
                                Get started
                            </button>
                        </div>
                        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
                            <img src={Kit} className='w-full' alt="" />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center lg:gap-44 gap-20" id='Sevrvices'>
                        <div className="w-full lg:w-1/2 flex flex-col justify-center">
                            <h1 className='text-5xl font-bold mb-4'>How it works</h1>
                            <p className="text-xl leading-5 mb-4">We believe that the best way to create successful marketing campaigns is to work closely with our clients to understand their goals and challenges.</p>
                            <img src={lamp} className='mt-12' alt="" />
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col justify-center">
                            <ul className="mb-8">
                                {SocialMediaServices.map((service, index) => (
                                    <li key={index} className='flex md:flex-row flex-col items-center gap-6 mb-6'>
                                        <div className="flex items-center justify-center bg-[#30B797] p-8 rounded-2xl text-4xl text-white">
                                            {service.icon}
                                        </div>
                                        <div className="flex flex-col text-center md:text-start">
                                            <h2 className="text-3xl mb-2 font-bold">{service.title}</h2>
                                            <p className='text-sm'>{service.description}</p>
                                            <div className="flex md:flex-row flex-col items-center font-bold gap-2">
                                                <p className="font-bold">Prices start from ${service.price}</p>
                                                <button
                                                    className="flex flex-row items-center text-lg text-[#30B797] cursor-pointer hover:text-[#488b7c] font-bold transition-all"
                                                    onClick={
                                                        () => {
                                                            setModalOpen(true);
                                                            setSelectedService(service.title);
                                                        }
                                                    }
                                                >
                                                    Get it now
                                                    <FaChevronRight />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                                    placeholder="Your name"

                                    name='name'
                                    onChange={formik.handleChange} value={formik.values.name}

                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <small className='text-red-500'>{formik.errors.name}</small>
                                ) : null}
                                <input
                                    className=' mb-4 text-[#919499] border border-[#1F1A234D] shadow-xl focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4 mt-4'
                                    type="email"
                                    placeholder="Your email"
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
                {
                    modalOpen ?
                        <div aria-hidden="true" className="flex bg-[#000000bf] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
                            <div className="relative p-4 w-full md:w-1/2 max-h-full">
                                <div className="relative bg-white rounded-3xl shadow-sm">
                                    <div className="flex items-center justify-between p-4 md:p-5">
                                        <button type="button" onClick={
                                            () => {
                                                setModalOpen(false)
                                            }
                                        } className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="p-4 md:p-5">
                                        <form className="space-y-4" action="#" onSubmit={servicesFormik.handleSubmit}>
                                            <div className='mb-6'>
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#522ED3]">Your name</label>
                                                <input type="name"
                                                    onChange={servicesFormik.handleChange} value={servicesFormik.values.name}
                                                    name="name"
                                                    id="name"
                                                    placeholder="Your name"
                                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" />
                                                {servicesFormik.touched.name && servicesFormik.errors.name ? (
                                                    <small className='text-red-500'>{servicesFormik.errors.name}</small>
                                                ) : null}
                                            </div>
                                            <div className='mb-6'>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#522ED3]">Your email</label>
                                                <input type="email"
                                                    onChange={servicesFormik.handleChange} value={servicesFormik.values.email}
                                                    name="email"
                                                    id="email"
                                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your email' />
                                                {servicesFormik.touched.email && servicesFormik.errors.email ? (
                                                    <small className='text-red-500'>{servicesFormik.errors.email}</small>
                                                ) : null}
                                            </div>
                                            <div className='mb-6'>
                                                <label htmlFor="number" className="block mb-2 text-sm font-medium text-[#522ED3]">Your Number</label>
                                                <input type="tel"
                                                    onChange={servicesFormik.handleChange} value={servicesFormik.values.number}
                                                    name="number"
                                                    id="Number"
                                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your Number' />
                                                {servicesFormik.touched.number && servicesFormik.errors.number ? (
                                                    <small className='text-red-500'>{servicesFormik.errors.number}</small>
                                                ) : null}
                                            </div>
                                            <div className='mb-6'>
                                                <label htmlFor="number" className="block mb-2 text-sm font-medium text-[#522ED3]">whatsapp_number</label>
                                                <input type="tel"
                                                    onChange={servicesFormik.handleChange} value={servicesFormik.values.whatsapp_number}
                                                    name="whatsapp_number"
                                                    id="Number"
                                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='whatsapp Number' />
                                                {servicesFormik.touched.whatsapp_number && servicesFormik.errors.whatsapp_number ? (
                                                    <small className='text-red-500'>{servicesFormik.errors.whatsapp_number}</small>
                                                ) : null}
                                            </div>
                                            <div className='mb-6'>
                                                <label htmlFor="social_links" className="block mb-2 text-sm font-medium text-[#522ED3]">Social media links</label>
                                                <input type="text"
                                                    onChange={servicesFormik.handleChange} value={servicesFormik.values.social_links}
                                                    name="social_links"
                                                    id="links"
                                                    className="border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your social media links' />
                                                {servicesFormik.touched.social_links && servicesFormik.errors.social_links ? (
                                                    <small className='text-red-500'>{servicesFormik.errors.social_links}</small>
                                                ) : null}
                                            </div>
                                            <div className='mb-6'>
                                                <label htmlFor="details" className="block mb-2 text-sm font-medium text-[#522ED3]">Details</label>
                                                <input type="text"
                                                    onChange={servicesFormik.handleChange} value={servicesFormik.values.details}
                                                    name="details"
                                                    id="Details"
                                                    className="border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your social media links' />
                                                {servicesFormik.touched.details && servicesFormik.errors.details ? (
                                                    <small className='text-red-500'>{servicesFormik.errors.details}</small>
                                                ) : null}
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
        </>
    );
}

export default Services;
