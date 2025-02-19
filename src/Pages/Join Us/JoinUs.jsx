import React, { useEffect, useState } from 'react';
import Rising from '../../assets/Img/singing.png'
import RisingActive from '../../assets/Img/singing-active.png'
import famous from '../../assets/Img/karaoke.png'
import famousActive from '../../assets/Img/karaoke-active.png'
import Swal from 'sweetalert2';
import RisingForm from './RisingForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const JoinUs = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [image, setImage] = useState("");


    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };




    const initValues = {
        name: "",
        email: "",
        phone: "",
        type: "",
        link: '',
        Image: '',
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
                const response = await axios.post('http://localhost:8000/api/Userfamous', {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    type: values.division,
                    link: values.link,
                    Image: image
                });
                if (response.status === 200) {
                    Swal.fire({
                        title: "تم التسجيل بنجاح",
                        text: "تم إرسال البيانات بنجاح",
                        icon: 'success',
                    });
                    formik.resetForm();
                    setImage('');
                }

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
                                    }
                                }
                            }
                            className="text-2xl gap-4 px-12 py-4 rounded-3xl font-bold border cursor-pointer border-[#30B797] text-white bg-[#30B797] hover:bg-white hover:text-[#30B797] transition"
                        >Next</button>}
                </form>
                {
                    selectedType === "Rising" && (
                        <RisingForm />
                    )
                }
                {
                    selectedType === "famous" && (
                        <>
                            {showForm === true ?
                                <div aria-hidden="true" className="flex bg-[#000000bf] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
                                    <div className="relative p-4 w-full md:w-1/2 max-h-full">
                                        <div className="relative bg-white rounded-3xl shadow-sm">
                                            <div className="flex items-center justify-between p-4 md:p-5">
                                                <button type="button" onClick={
                                                    () => {
                                                        setShowForm(false)
                                                    }
                                                } className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
                                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                    <span className="sr-only">Close modal</span>
                                                </button>
                                            </div>
                                            <div className="p-4 md:p-5">
                                                <form className="space-y-4" action="#" onSubmit={formik.handleSubmit}>
                                                    <div className='mb-6'>
                                                        <label for="name" className="block mb-2 text-sm font-medium text-[#522ED3]">Your name</label>
                                                        <input type="name"
                                                            onChange={formik.handleChange} value={formik.values.name}
                                                            name="name"
                                                            id="name"
                                                            placeholder="Your name"
                                                            className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" required />
                                                    </div>
                                                    <div className='mb-6'>
                                                        <label for="email" className="block mb-2 text-sm font-medium text-[#522ED3]">Your email</label>
                                                        <input type="email"
                                                            onChange={formik.handleChange} value={formik.values.email}
                                                            name="email"
                                                            id="email"
                                                            className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your email' required />
                                                    </div>
                                                    <div className='mb-6'>
                                                        <label for="Number" className="block mb-2 text-sm font-medium text-[#522ED3]">Your Number</label>
                                                        <input type="tel"
                                                            onChange={formik.handleChange} value={formik.values.phone}
                                                            name="Number"
                                                            id="Number"
                                                            className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your Number' required />
                                                    </div>
                                                    <div className='mb-6'>
                                                        <label for="Division" className="block mb-2 text-sm font-medium text-[#522ED3]">Artist Division</label>
                                                        <select id="Division"
                                                            name="Division"
                                                            onChange={formik.handleChange} value={formik.values.division}
                                                            className=" border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5">
                                                            <option value="">Select Division</option>
                                                            <option value="Mahraganat">Mahraganat</option>
                                                            <option value="rap">Rap</option>
                                                            <option value="Pop">Pop</option>
                                                        </select>
                                                    </div>
                                                    <div className='mb-6'>
                                                        <label for="links" className="block mb-2 text-sm font-medium text-[#522ED3]">Social media links</label>
                                                        <input type="text"
                                                            onChange={formik.handleChange} value={formik.values.link}
                                                            name="links"
                                                            id="links"
                                                            className="border-b border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full p-2.5" placeholder='Your social media links' />
                                                    </div>
                                                    <div className='mb-6'>
                                                        <label for="links" className="block mb-2 text-sm font-medium text-[#522ED3]">your image</label>
                                                        <input type="file"
                                                            onChange={(e) => setImage(e.target.files[0])}
                                                            name="image"
                                                            id="image"
                                                            className="border  border-[#522ED3] text-gray-900 text-sm outline-b focus-visible:outline-0 block w-full py-10 px-2.5 rounded-2xl text-center" />
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
            </div>
        </div>
    );
}

export default JoinUs;
