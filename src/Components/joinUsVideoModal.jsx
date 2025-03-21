// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';


// const JoinUsVideoModal = ({ handleClose }) => {
//         const { t } = useTranslation();
//     const [agree, setAgree] = useState(false);
//     const [image, setImage] = useState("");
//     const [imagePreview, setImagePreview] = useState("");
//     const [iD_image, setID_image] = useState("");

//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             email: '',
//             number: '',
//             Personal_price: "",
//             Business_price: "",
//             division: '',
//             Personal_social_links: '',
//             Personal_profile_image: null,
//             ID_image: null
//         },
//         validationSchema: Yup.object({
//             name: Yup.string()
//                 .min(3, "cant be less than 3 letters")
//                 .max(20, "cant be more than 20 letters")
//                 .required("name is invalid"),

//             email: Yup.string()
//                 .min(15, "يجب أن لا يقل عن 15 حرف")
//                 .email("enter the correct email")
//                 .required("this is invalid"),

//             number: Yup.string()
//                 .matches(/^(010|011|012|015)[0-9]{8}$/, "يجب أن يكون رقمًا مصريًا صحيحًا")
//                 .required("رقم الهاتف مطلوب"),

//             Personal_price: Yup.number().required("السعر الشخصي مطلوب"),

//             Business_price: Yup.number().required("السعر التجاري مطلوب"),

//             division: Yup.string()
//                 .required("division is required"),

//             Personal_social_links: Yup.string()
//                 .url("enter the correct url")
//                 .required("social links is required"),


//             Personal_profile_image: Yup.mixed()
//                 .required("الصورة مطلوبة")
//                 .test("fileType", "يجب أن تكون الصورة بصيغة JPEG, PNG, أو GIF", (value) => {
//                     return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
//                 })
//                 .test("fileSize", "يجب أن لا يتجاوز حجم الصورة 2MB", (value) => {
//                     return value && value.size <= 2 * 1024 * 1024; // 2MB
//                 }),

//             ID_image: Yup.mixed()
//                 .required("صورة الهوية مطلوبة")
//                 .test("fileType", "يجب أن تكون الصورة بصيغة JPEG, PNG أو GIF", (value) => {
//                     return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
//                 })
//                 .test("fileSize", "يجب أن لا يتجاوز حجم الصورة 2MB", (value) => {
//                     return value && value.size <= 2 * 1024 * 1024; // 2MB
//                 }),

//         }),

//         onSubmit: async (values) => {
//             const token = localStorage.getItem("token");

//             if (!agree) {
//                 Swal.fire({
//                     title: 'خطأ',
//                     text: 'يجب الموافقة على الشروط والأحكام قبل التسجيل',
//                     icon: 'error',
//                 });
//                 return;
//             }

// if (!token) {
//     Swal.fire({
//         title: t("plaseSignIn"),
//         text: t("you must sign in first"),
//         icon: 'error',
//         confirmButtonText: t("SignIn"),
//     }).then(() => {
//         window.location.href = "/Register";
//     });

//     return;
// }

//             try {
//                 const formData = new FormData();
//                 formData.append("name", values.name);
//                 formData.append("email", values.email);
//                 formData.append("phone", values.number);
//                 formData.append("personal_price", values.Personal_price);
//                 formData.append("business_price", values.Business_price);
//                 formData.append("division", values.division);
//                 formData.append("personal_social_links", values.Personal_social_links);
//                 const token = localStorage.getItem("token");

//                 if (values.Personal_profile_image) {
//                     formData.append("famous_profile_image", values.famous_profile_image);
//                 }

//                 if (values.ID_image) {
//                     formData.append("ID_image", values.ID_image);
//                 }


//                 const response = await axios.post("https://api.cloudwavproduction.com/api/Join-Video", formData, {
//                     headers: {
//                         "Authorization": `Bearer ${token}`,
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });

//                 if (response.status === 200 || response.status === 201) {
//                     Swal.fire({
//                         title: "تم التسجيل بنجاح",
//                         text: "تم إرسال البيانات بنجاح",
//                         icon: "success",
//                     });
//                     formik.resetForm();
//                     setImagePreview("");
//                     setID_image("");
//                 }
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 403) {
//                         Swal.fire({
//                             title: "لقد أرسلت طلبًا بالفعل!",
//                             text: "طلبك قيد المراجعة، يرجى الانتظار حتى يتم الرد.",
//                             icon: "warning",
//                         });
//                     } else {
//                         Swal.fire({
//                             title: "خطأ",
//                             text: error.response.data.message || "حدث خطأ أثناء التسجيل",
//                             icon: "error",
//                         });
//                     }
//                 } else {
//                     Swal.fire({
//                         title: "خطأ",
//                         text: "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى لاحقًا.",
//                         icon: "error",
//                     });
//                 }
//             }
//         }
//     })


//     return (
//         <div className="flex bg-[#000000bf] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[1000] justify-center items-center w-full md:inset-0 h-full max-h-full">
//             <div className="relative p-4 w-full md:w-1/2 max-h-full">
//                 <div className="relative bg-white rounded-3xl shadow-sm">
//                     <div className="flex items-center justify-between p-4 md:p-5">
//                         <button type="button"
//                             onClick={
//                                 () => {
//                                     handleClose();
//                                 }
//                             }
//                             className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
//                             <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
//                             </svg>
//                             <span className="sr-only">Close modal</span>
//                         </button>
//                     </div>
//                     <div className="p-4 md:p-5">
//                         <form className="space-y-4" action="#" onSubmit={
//                             formik.handleSubmit
//                         }>
//                             <div className='mb-6'>
//                                 <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#522ED3]">{t("{Your_name}")}</label>
//                                 <input type="name"
//                                     onChange={formik.handleChange} value={formik.values.name}
//                                     name="name"
//                                     id="name"
//                                     placeholder={t("{Your_name}")}
//                                     className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" />
//                                 {formik.touched.name && formik.errors.name ? (
//                                     <small className='text-red-500'>{formik.errors.name}</small>
//                                 ) : null}
//                             </div>
//                             <div className='mb-6'>
//                                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#522ED3]">{t("Your_email")}</label>
//                                 <input type="email"
//                                     onChange={formik.handleChange} value={formik.values.email}
//                                     name="email"
//                                     id="email"
//                                     className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='yourmail@gmail.com' />
//                                 {formik.touched.email && formik.errors.email ? (
//                                     <small className='text-red-500'>{formik.errors.email}</small>
//                                 ) : null}
//                             </div>
//                             <div className='mb-6'>
//                                 <label htmlFor="number" className="block mb-2 text-sm font-medium text-[#522ED3]">{t("Your_Number")}</label>
//                                 <input type="tel"
//                                     onChange={formik.handleChange} value={formik.values.number}
//                                     name="number"
//                                     id="Number"
//                                     className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='01023456789' />
//                                 {formik.touched.number && formik.errors.number ? (
//                                     <small className='text-red-500'>{formik.errors.number}</small>
//                                 ) : null}
//                             </div>
//                             <div className="flex flex-col lg:flex-row lg:gap-8">
//                                 <div className='mb-6 lg:w-1/2'>
//                                     <label htmlFor="personal_price" className="block mb-2 text-sm font-medium text-[#522ED3]">{t("Personal_video_price")}</label>
//                                     <input type="number"
//                                         onChange={formik.handleChange} value={formik.values.Personal_price}
//                                         name="personal_price"
//                                         id="personal_price"
//                                         className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='00:0 $' />
//                                     {formik.touched.Personal_price && formik.errors.Personal_price ? (
//                                         <small className='text-red-500'>{formik.errors.Personal_price}</small>
//                                     ) : null}
//                                 </div>
//                                 <div className='mb-6 lg:w-1/2'>
//                                     <label htmlFor="Business_price" className="block mb-2 text-sm font-medium text-[#522ED3]">{t("Business_video_price")}</label>
//                                     <input type="number"
//                                         onChange={formik.handleChange} value={formik.values.Business_price}
//                                         name="Business_price"
//                                         id="Business_price"
//                                         className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='00:0 $' />
//                                     {formik.touched.Business_price && formik.errors.Business_price ? (
//                                         <small className='text-red-500'>{formik.errors.Business_price}</small>
//                                     ) : null}
//                                 </div>
//                             </div>
//                             <div className='mb-6'>
//                                 <label htmlFor="division" className="block mb-2 text-sm font-medium text-[#522ED3]">{t("Artist_Division")}</label>
//                                 <select id="Division"
//                                     name="division"
//                                     onChange={formik.handleChange} value={formik.values.division}
//                                     className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5">
//                                     <option value="">{t("Select_Division")}</option>
//                                     <option value="Mahraganat">{t("Mahraganat")}</option>
//                                     <option value="rap">{t("Rap")}</option>
//                                     <option value="pop">{t("pop")}</option>
//                                     <option value="jazz">{t("jazz")}</option>
//                                     <option value="rock">{t("rock")}</option>
//                                 </select>
//                                 {formik.touched.division && formik.errors.division ? (
//                                     <small className='text-red-500'>{formik.errors.division}</small>
//                                 ) : null}

//                             </div>
//                             <div className='mb-6'>
//                                 <label htmlFor="social_links" className="block mb-2 text-sm font-medium text-[#522ED3]">{t("Social_media_links")}</label>
//                                 <input type="text"
//                                     onChange={formik.handleChange} value={formik.values.Personal_social_links}
//                                     name="Personal_social_links"
//                                     id="links"
//                                     className="border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder={t("Social_media_links")} />
//                                 {formik.touched.Personal_social_links && formik.errors.Personal_social_links ? (
//                                     <small className='text-red-500'>{formik.errors.Personal_social_links}</small>
//                                 ) : null}
//                             </div>
//                             <div className='mb-6'>
//                                 <label htmlFor="Personal_profile_image" className="block mb-2 text-sm font-medium text-[#522ED3]">
//                                     {t("Your_Image")}
//                                 </label>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={(e) => {
//                                         const file = e.target.files[0];
//                                         setImage(file);
//                                         formik.setFieldValue("Personal_profile_image", file);
//                                         const reader = new FileReader();
//                                         reader.onload = () => {
//                                             setImagePreview(reader.result);
//                                         };
//                                         reader.readAsDataURL(file);
//                                     }}
//                                     name=" Personal_profile_image"
//                                     id="image"
//                                     className="border border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full py-10 px-2.5 rounded-2xl text-center"
//                                 />
//                                 {imagePreview && (
//                                     <div className="mt-3">
//                                         <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
//                                     </div>
//                                 )}
//                                 {formik.touched.Personal_profile_image && formik.errors.Personal_profile_image ? (
//                                     <small className='text-red-500'>{formik.errors.Personal_profile_image}</small>
//                                 ) : null}
//                             </div>
//                             <div className='mb-6'>
//                                 <label htmlFor="ID_image" className="block mb-2 text-sm font-medium text-[#522ED3]">
//                                     {t("We_want_proof_of_identity")}
//                                 </label>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={(e) => {
//                                         const file = e.target.files[0];
//                                         setImage(file);
//                                         formik.setFieldValue("ID_image", file);
//                                         const reader = new FileReader();
//                                         reader.onload = () => {
//                                             setID_image(reader.result);
//                                         };
//                                         reader.readAsDataURL(file);
//                                     }}
//                                     name="ID_image"
//                                     id="ID_image"
//                                     className="border border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full py-10 px-2.5 rounded-2xl text-center"
//                                 />
//                                 {iD_image && (
//                                     <div className="mt-3">
//                                         <img src={iD_image} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
//                                     </div>
//                                 )}
//                                 {formik.touched.ID_image && formik.errors.ID_image ? (
//                                     <small className='text-red-500'>{formik.errors.ID_image}</small>
//                                 ) : null}
//                             </div>

//                             <div className='flex items-center mt-4'>
//                                 <input type="checkbox" id="terms" checked={agree} onChange={() => setAgree(!agree)} className='mr-2' />
//                                 <label htmlFor="terms" className='text-sm'>
//                                     {t("accpt")} <a href="/Terms" className='text-[#2F00AC] underline'>{t("trams")}</a>
//                                 </label>
//                             </div>
//                             <button type="submit" className="w-full bg-[#522ED3] text-white border border-[#522ED3] hover:bg-white hover:text-[#522ED3] font-bold rounded-full px-6 py-3 text-center">{t("Send_Now")}</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default JoinUsVideoModal;





import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';


const JoinUsVideoModal = ({ handleClose }) => {
    const [agree, setAgree] = useState(false);
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [idcardimage, setidcardimage] = useState("");
    const [cardimagePreview, setcardimagePreview] = useState("");
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
            whatsapp_number: "",
            details: "",
            division: "",
            private_price: "",
            bussiness_price: "",
            social_links: "",
            profile_image: null,
            id_card: null,
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
                .matches(/^\+?[1-9]\d{1,14}$/, "يجب أن يكون الرقم يحتوي على رمز الدولة الدولي قبل الرقم.")  // التحقق من أن الرقم يبدأ برمز الدولة الدولي
                .required("رقم الهاتف مطلوب"), //


            whatsapp_number: Yup.string()
                .matches(/^\+?[1-9]\d{1,14}$/, "يجب أن يكون الرقم يحتوي على رمز الدولة الدولي قبل الرقم.")  // التحقق من أن الرقم يبدأ برمز الدولة الدولي
                .required("رقم الهاتف مطلوب"),  //


            details: Yup.string()
                .min(10, "cant be less than 10 letters")
                .max(500, "cant be more than 500 letters"),

            division: Yup.string()
                .required("division is required"),

            social_links: Yup.string()
                .url("enter the correct url")
                .required("social links is required"),

            private_price: Yup.number()
                .positive("يجب أن يكون السعر الخاص رقمًا موجبًا")
                .required("السعر الخاص مطلوب"),

            bussiness_price: Yup.number()
                .positive("يجب أن يكون السعر التجاري رقمًا موجبًا")
                .required("السعر التجاري مطلوب"),

            profile_image: Yup.mixed()
                .required("الصورة الشخصيه مطلوبة")
                .test("fileType", "يجب أن تكون الصورة بصيغة JPEG, PNG, أو", (value) => {
                    return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
                })
                .test("fileSize", "يجب أن لا يتجاوز حجم الصورة 2MB", (value) => {
                    return value && value.size <= 2 * 1024 * 1024; // 2MB
                }),

            id_card: Yup.mixed()
                .required("صورة البطاقه الشخصيه مطلوبه ")
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
                    title: t("plaseSignIn"),
                    text: t("you must sign in first"),
                    icon: 'error',
                    confirmButtonText: t("SignIn"),
                }).then(() => {
                    window.location.href = "/Register";
                });

                return;
            }

            if (!agree) {
                Swal.fire({
                    title: t("plaseAcceptTerms"),
                    text: t("you must accept terms and conditions"),
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
                formData.append("profile_image", values.profile_image);
                formData.append("id_card", values.id_card);
                formData.append("bussiness_price", values.bussiness_price);
                formData.append("private_price", values.private_price);

                if (values.profile_image) {
                    formData.append("profile_image", values.profile_image);
                }
                if (values.id_card) {
                    formData.append("id_card", values.id_card);
                }

                const response = await axios.post("https://api.cloudwavproduction.com/api/video-creator-requests", formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                });

                if (response.status === 200 || response.status === 201) {
                    Swal.fire({
                        title: t("successSignIn"),
                        text: t("you have been signed in"),
                        icon: "success",
                    });
                    formik.resetForm();
                    setcardimagePreview("");
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

                            title: t("errorM"),
                            text: error.response.data.message || "حدث خطأ أثناء التسجيل",
                            icon: "error",
                        });
                    }
                } else {
                    Swal.fire({
                        title: t("errorM"),
                        icon: "error",
                    });
                }
            }
        }

    });


    return (
        <div className="flex bg-[#000000bf] overflow-y-auto fixed inset-0 z-[1050] justify-center items-center w-full h-full">
        <div className="relative p-4 w-full md:w-1/2 max-h-full">
            <div className="relative bg-white rounded-3xl shadow-sm">
                <div className="flex items-center justify-between p-4 md:p-5">
                    <button type="button" onClick={handleClose} className="text-gray-400 hover:bg-gray-200 rounded-lg w-8 h-8">
                        <span className="sr-only">{t("close")}</span>
                        <svg className="w-5 h-5" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" /></svg>
                    </button>
                </div>
                <div className="p-4 md:p-5">
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        {['name', 'email', 'number', 'whatsapp_number', 'private_price', 'bussiness_price', 'details', 'social_links'].map(field => (
                            <div key={field} className='mb-6'>
                                <label htmlFor={field} className="block mb-2 text-sm font-medium text-[#522ED3]">{t(field)}</label>
                                <input type={field.includes("price") ? "number" : "text"}
                                    onChange={formik.handleChange} value={formik.values[field]}
                                    name={field} id={field}
                                    placeholder={t(field)}
                                    className="border-b border-[#522ED3] text-gray-900 text-sm block w-full p-2.5" />
                                {formik.touched[field] && formik.errors[field] && (
                                    <small className='text-red-500'>{formik.errors[field]}</small>
                                )}
                            </div>
                        ))}
                        <div className='mb-6'>
                            <label htmlFor="division" className="block mb-2 text-sm font-medium text-[#522ED3]">{t("division")}</label>
                            <select id="division" name="division" onChange={formik.handleChange} value={formik.values.division} className="border-b border-[#522ED3] text-gray-900 text-sm block w-full p-2.5">
                                <option value="">{t("select_division")}</option>
                                {['Tiktokers', 'Musician', 'Actor', 'Content creator', 'Youtuber', 'Athlete' , 'public_figure'].map(option => (
                                    <option key={option} value={option}>{t(option)}</option>
                                ))}
                            </select>
                            {formik.touched.division && formik.errors.division && (
                                <small className='text-red-500'>{formik.errors.division}</small>
                            )}
                        </div>
                        {['profile_image', 'id_card'].map((imageField, index) => (
                            <div key={imageField} className='mb-6'>
                                <label htmlFor={imageField} className="block mb-2 text-sm font-medium text-[#522ED3]">{t(imageField)}</label>
                                <input type="file" accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        formik.setFieldValue(imageField, file);
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            index === 0 ? setImagePreview(reader.result) : setCardImagePreview(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                    name={imageField} id={imageField}
                                    className="border border-[#522ED3] text-gray-900 text-sm block w-full py-10 px-2.5 rounded-2xl text-center" />
                                {index === 0 && imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto mt-3" />}
                                {index === 1 && cardimagePreview && <img src={cardimagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto mt-3" />}
                                {formik.touched[imageField] && formik.errors[imageField] && (
                                    <small className='text-red-500'>{formik.errors[imageField]}</small>
                                )}
                            </div>
                        ))}
                        <div className='flex items-center mt-4'>
                            <input type="checkbox" id="terms" checked={agree} onChange={() => setAgree(!agree)} className='mr-2' />
                            <label htmlFor="terms" className='text-sm'>{t("terms_agree")} <a href="/Terms/VideosOrder" className='text-[#2F00AC] underline'>{t("terms_conditions")}</a></label>
                        </div>
                        <button type="submit" className="w-full bg-[#522ED3] text-white border border-[#522ED3] hover:bg-white hover:text-[#522ED3] font-bold rounded-full px-6 py-3 text-center">{t("send_now")}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}
export default JoinUsVideoModal;

