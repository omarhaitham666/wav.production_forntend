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

//             if (!token) {
//                 Swal.fire({
//                     title: "يجب تسجيل الدخول",
//                     text: "يجب عليك تسجيل الدخول أولًا لمتابعة العملية.",
//                     icon: "warning",
//                     confirmButtonText: "تسجيل الدخول",
//                 }).then(() => {
//                     window.location.href = "/Register";
//                 });

//                 return;
//             }

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
//         <div className="flex bg-[#000000bf] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
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


const JoinUsVideoModal = ({ handleClose }) => {
    const [agree, setAgree] = useState(false);
     const [image, setImage] = useState("");
        const [imagePreview, setImagePreview] = useState("");
     const [idcardimage, setidcardimage] = useState("");
        const [cardimagePreview, setcardimagePreview] = useState("");

     const formik = useFormik({
            initialValues: {
                name: "",
                email: "",
                number: "",
                whatsapp_number: "",
                details: "",
                division: "",
                private_price:"",
                bussiness_price:"",
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
                .required("رقم الهاتف مطلوب") , //

    
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
                    .required("السعر التجاري مطلوب") ,
    
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
                            title: "تم التسجيل بنجاح",
                            text: "تم إرسال البيانات بنجاح",
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
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#522ED3]">Your Name</label>
                                <input type="text"
                                    onChange={formik.handleChange} value={formik.values.name}
                                    name="name"
                                    id="Name"
                                    placeholder="Your Name"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" />
                                {formik.touched.name && formik.errors.name ? (
                                    <small className='text-red-500'>{formik.errors.name}</small>
                                ) : null}
                            </div>

                            <div className='mb-6'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#522ED3]">Your Email</label>
                                <input type="email"
                                    onChange={formik.handleChange} value={formik.values.email}
                                    name="email"
                                    id="Email"
                                    placeholder="Your Email"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" />
                                {formik.touched.email && formik.errors.email ? (
                                    <small className='text-red-500'>{formik.errors.email}</small>
                                ) : null}
                            </div>

                            <div className='mb-6'>
                                <label htmlFor="number" className="block mb-2 text-sm font-medium text-[#522ED3]">phone</label>
                                <input type="tel"
                                    onChange={formik.handleChange} value={formik.values.number}
                                    name="number"
                                    id="Number"
                                    placeholder="Your Phone"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" />
                                {formik.touched.number && formik.errors.number ? (
                                    <small className='text-red-500'>{formik.errors.number}</small>
                                ) : null}
                            </div>

                            <div className='mb-6'>
                                <label htmlFor="whatsapp_number" className="block mb-2 text-sm font-medium text-[#522ED3]">whatsapp number</label>
                                <input type="tel"
                                    onChange={formik.handleChange} value={formik.values.whatsapp_number}
                                    name="whatsapp_number"
                                    id="Whatsapp_number"
                                    placeholder="whatsapp number"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" />
                                {formik.touched.whatsapp_number && formik.errors.whatsapp_number ? (
                                    <small className='text-red-500'>{formik.errors.whatsapp_number}</small>
                                ) : null}
                            </div>

                            <div className='mb-6'>
                                <label htmlFor="private_price" className="block mb-2 text-sm font-medium text-[#522ED3]">Your private Price</label>
                                <input type="number"
                                    onChange={formik.handleChange} value={formik.values.private_price}
                                    name="private_price"
                                    id="PrivatePrice"
                                    placeholder="Your private Price $"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" />
                                {formik.touched.private_price && formik.errors.private_price ? (
                                    <small className='text-red-500'>{formik.errors.private_price}</small>
                                ) : null}
                            </div>

                            <div className='mb-6'>
                                <label htmlFor="bussiness_price" className="block mb-2 text-sm font-medium text-[#522ED3]">Your Business Price</label>
                                <input type="number"
                                    onChange={formik.handleChange} value={formik.values.bussiness_price}
                                    name="bussiness_price"
                                    id="BusinessPrice"
                                    placeholder="Your Business Price $"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" />
                                {formik.touched.bussiness_price && formik.errors.bussiness_price ? (
                                    <small className='text-red-500'>{formik.errors.bussiness_price}</small>
                                ) : null}
                            </div>

                            <div className='mb-6'>
                                <label htmlFor="details" className="block mb-2 text-sm font-medium text-[#522ED3]">Your Details</label>
                                <input type="text"
                                    onChange={formik.handleChange} value={formik.values.details}
                                    name="details"
                                    id="Details"
                                    placeholder="Your Details"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" />
                                {formik.touched.details && formik.errors.details ? (
                                    <small className='text-red-500'>{formik.errors.details}</small>
                                ) : null}
                            </div>

                            <div className='mb-6'>
                                <label htmlFor="division" className="block mb-2 text-sm font-medium text-[#522ED3]">Your Division</label>
                                <select id="Division"
                                name="division"
                                onChange={formik.handleChange} value={formik.values.division}
                                className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5">
                                <option value="">Select Division</option>
                                <option value="Tiktok">Tiktok</option>
                                <option value="Musician">Musician</option>
                                <option value="Actor">Actor</option>
                                <option value="Content creator">Content creator</option>
                                <option value="youtuber">youtuber</option>
                                <option value="Athlete">Athlete</option>
                                </select>
                                {formik.touched.division && formik.errors.division ? (
                                    <small className='text-red-500'>{formik.errors.division}</small>
                                ) : null}
                            </div>

                            <div className='mb-6'>
                                <label htmlFor="social_links" className="block mb-2 text-sm font-medium text-[#522ED3]">Your social links</label>
                                <input type="text"
                                    onChange={formik.handleChange} value={formik.values.social_links}
                                    name="social_links"
                                    id="Social_links"
                                    placeholder="Your social links"
                                    className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" />
                                {formik.touched.social_links && formik.errors.social_links ? (
                                    <small className='text-red-500'>{formik.errors.social_links}</small>
                                ) : null}
                            </div>


                            <div className='mb-6'>
                                                            <label htmlFor="profile_image" className="block mb-2 text-sm font-medium text-[#522ED3]">
                                                                Your profile Image
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




                            <div className='mb-6'>
                                                            <label htmlFor="profile_image" className="block mb-2 text-sm font-medium text-[#522ED3]">
                                                                Your Id Card image
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    setidcardimage(file);
                                                                    formik.setFieldValue("id_card", file);
                                                                    const reader = new FileReader();
                                                                    reader.onload = () => {
                                                                        setcardimagePreview(reader.result);
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }}
                                                                name="id_card"
                                                                id="Idcard"
                                                                className="border border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full py-10 px-2.5 rounded-2xl text-center"
                                                            />
                                                            {imagePreview && (
                                                                <div className="mt-3">
                                                                    <img src={cardimagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                                                                </div>
                                                            )}
                                                            {formik.touched.id_card && formik.errors.id_card ? (
                                                                <small className='text-red-500'>{formik.errors.id_card}</small>
                                                            ) : null}
                            </div>
                            <div className='flex items-center mt-4'>
                                <input type="checkbox" id="terms" checked={agree} onChange={() => setAgree(!agree)} className='mr-2' />
                                <label htmlFor="terms" className='text-sm'>
                                    أوافق على <a href="/Terms/VideosOrder" className='text-[#2F00AC] underline'>الشروط والأحكام</a>
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

