import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import logo from "/logo.svg";
import map from "../../assets/Img/g42.png";
import groupM from "../../assets/Img/Group 43.png";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import { Helmet } from 'react-helmet';
import { API_ENDPOINT } from '../../App';

function Register() {

  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(false);



  const initValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };


  const inputValidation = Yup.object({
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


    name: Yup.string()
      .min(3, "cant be less than 3 letters")
      .required("name is invalid")
      .max(20, "cant be more than 20"),

  });


  const formik = useFormik({
    initialValues: initValues,
    validationSchema: inputValidation,
    onSubmit: async (values) => {

      if (!agree) {
        Swal.fire({
          title: 'خطأ',
          text: 'يجب الموافقة على الشروط والأحكام قبل التسجيل',
          icon: 'error',
        });
        return;
      }
      try {

        const response = await axios.post((`${API_ENDPOINT}/register`), {
          name: values.name,
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
        <title>Register | Could.wav</title>
      </Helmet>
      <div className='h-[100vh]'>
        <div className='flex justify-center items-center h-full'>
          <div className='lg:w-4/7 w-full h-full bg-white pt-28 mx-auto'>
            <div className='w-[70%] m-auto'>
              <h2 className='text-3xl font-bold mt-10 text-[#2F00AC]'>Get Started</h2>
              <div className='pt-8'>
                <form onSubmit={formik.handleSubmit}>
                  <div className='flex flex-col items-start pt-4'>
                    <label className='text-sm mb-3 text-[#919499]'>Full Name <span className='text-red-800'>*</span></label>
                    <input
                      className='text-[#919499] border border-[#C4C4C4] focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                      type="text"
                      value={formik.values.name} placeholder='Username' name='name' onChange={formik.handleChange} id="UserName"
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <small className='text-red-500'>{formik.errors.name}</small>
                    ) : null}
                  </div>

                  <div className='flex flex-col items-start pt-4'>
                    <label className='text-sm mb-3 text-[#919499]'>Email Address <span className='text-red-800'>*</span></label>
                    <input
                      className='text-[#919499] border border-[#C4C4C4] focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
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
                    <label className='text-sm mb-3 text-[#919499]'>Password <span className='text-red-800'>*</span></label>
                    <input
                      className='text-[#919499] border border-[#C4C4C4] focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                      type="password"
                      name="password" onChange={formik.handleChange}
                      value={formik.values.password} id="UserPassword" placeholder="password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <small className='text-red-500'>{formik.errors.password}</small>
                    ) : null}
                  </div>

                  <div className='flex flex-col items-start pt-4'>
                    <label className='text-sm mb-3 text-[#919499]'>Confirm Password <span className='text-red-800'>*</span></label>
                    <input
                      className='text-[#919499] border border-[#C4C4C4] focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
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
                  <div className='flex items-center mt-4'>
                    <input type="checkbox" id="terms" checked={agree} onChange={() => setAgree(!agree)} className='mr-2' />
                    <label htmlFor="terms" className='text-sm'>
                      أوافق على <a href="/Terms/Register" className='text-[#2F00AC] underline'>الشروط والأحكام</a>
                    </label>
                  </div>

                  <button type="submit" className='w-full mt-10 font-bold bg-[#2F00AC] text-white rounded-[14px] py-4 border hover:bg-white hover:text-[#2F00AC]'>
                    sign up
                  </button>
                </form>
              </div>

              <h3 className='text-[#2F00AC] text-3xl text-center mt-10 font-bold'>OR</h3>

              {/* <div className='mt-12 flex flex-row items-center justify-center gap-8'>
                            <GoogleOAuthProvider clientId={googleClientId}>
                                <GoogleLogin
                                    onSuccess={async (response) => {
                                        const token = response.credential;

                                        try {
                                            const res = await axios.post("http://localhost:5000/auth/google", { token });
                                            if (res.data.success) {
                                                localStorage.setItem("jwt", res.data.token);
                                                console.log("User Logged In:", res.data.user);
                                            }
                                        } catch (error) {
                                            console.error("Login error:", error);
                                        }
                                    }}
                                    onError={() => console.log("Google Login Failed")}
                                    text=''
                                    size='large'
                                    shape='circle'
                                    type='icon'
                                    width={64}
                                />
                            </GoogleOAuthProvider>

                            <ReactFacebookLogin
                                appId={facebookAppId}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                textButton=''
                                icon="fa-facebook"
                                cssClass='w-16 h-16 text-4xl bg-[#4267b2] text-white rounded-full cursor-pointer'
                            />
                        </div> */}
            </div>
          </div>
          <div className='flex justify-center lg:w-3/7 w-0 h-full pt-28 bg-[#E6F6FF] relative overflow-hidden'>
            <div className='w-[80%] mx-auto'>
              <h1 className='text-5xl text-[#2AC3FC] font-black mb-10'><span className='text-[#2F00AC]'>Our Members</span> are Arround the World</h1>
              <p className='text-black'>Over 5,000 Singer join us monthly</p>
              <img className='mt-10' src={groupM} alt="mempars" />
              <img src={map} alt="Hero" className='absolute bottom-[200px] right-0 left-0' />
              <img src={logo} alt="Hero" className='absolute bottom-[50px] right-0' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
