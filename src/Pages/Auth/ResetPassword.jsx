// import { Formik } from "formik";
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import { Helmet } from 'react-helmet-async';
import { API_ENDPOINT } from '../../App';

const ResetPassword = () => {
  const { token, setToken } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();







  const initValues = {
    verification_code: "",
    email: "",
    password: "",
    password_confirmation: "",
  };


  const inputValidation = Yup.object({
    verification_code: Yup.string()
      .length(6, "يجب أن يكون كود التحقق مكونًا من 6 أرقام")
      .required("كود التحقق مطلوب"),

    email: Yup.string()
      .min(15, "cant be less than 15 letters")
      .email("email is invalid  ")
      .required("this email is invalid"),
    password: Yup.string()
      .min(8, "cant be less than 8 letters")
      .required("this password is invalid")
      .max(20, "cant be more than 20 letters"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين")
      .required("تأكيد كلمة المرور مطلوب"),



  });


  const formik = useFormik({
    initialValues: initValues,
    validationSchema: inputValidation,
    onSubmit: async (values) => {

      try {
        const response = await axios.post((`${API_ENDPOINT}/reset-password`), {
          verification_code: values.verification_code,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        });
        //   localStorage.setItem("token", newToken);
        //   setToken(newToken);

        const token = response.data.access_token;
        localStorage.setItem("token", token);
        setToken(token);
        Swal.fire({
          title: 'نجاح',
          text: 'تم التسجيل بنجاح',
          icon: 'success',
        }).then(() => {
          localStorage.setItem("token", token);
          navigate("/");
          setToken(token);

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


  return (
    <>
      <Helmet>
        <title>RestPass | Could.wav</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen bg-[#E6F6FF]">
        <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded-4xl px-8 pt-6 pb-8 mb-4 text-center sm-2/3 md:w-1/2 lg:w-1/3">
          <h2 className="text-3xl font-bold mb-4 text-[#2F00AC]">Reset Password</h2>
          <p className="text-[#C4C4C4] mb-4">Create your new password</p>
          <div className='flex flex-col items-start pt-4'>
            <label className='text-sm mb-3 text-[#919499]'>{"Email"}</label>
            <input
              className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder='Email Address'
              name='email'
              id='userEmail'
            />
            {formik.touched.email && formik.errors.email ? (
              <small className='text-red-500'>{formik.errors.email}</small>
            ) : null}
          </div>

          <div className='flex flex-col items-start pt-4'>
            <label className='text-sm mb-3 text-[#919499]'>{"Verification Code"}</label>
            <input
              className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
              type="text"
              name='verification_code'
              placeholder="Enter Verification Code"
              value={formik.values.verification_code}
              onChange={formik.handleChange}
            />
            {formik.touched.verification_code && formik.errors.verification_code ? (
              <small className='text-red-500'>{formik.errors.verification_code}</small>
            ) : null}
          </div>



          <div className='flex flex-col items-start pt-4'>
            <label className='text-sm mb-3 text-[#919499]'>{"New Password"}</label>
            <input
              className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
              onChange={formik.handleChange}
              value={formik.values.password} id="UserPassword"
              type="password"
              name="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <small className='text-red-500'>{formik.errors.password}</small>
            ) : null}
          </div>
          <div className='flex flex-col items-start pt-4'>
            <label className='text-sm mb-3 text-[#919499]'>{"Confirm New Password"}</label>
            <input
              className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
              type="password"
              name='password_confirmation'
              placeholder="Confirm Password"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
            />
            {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
              <small className='text-red-500'>{formik.errors.password_confirmation}</small>
            ) : null}
          </div>
          <button type="submit" className="w-full mt-10 font-bold bg-[#2F00AC] text-white rounded-[14px] transition-all py-4 border border-[#2F00AC] hover:bg-white hover:text-[#2F00AC]">
            Reset Password
          </button>
        </form>
        {/* {message && <p className="text-center transition-all font-bold text-red-500">{message}</p>} */}
      </div>
    </>
  );
};

export default ResetPassword;
