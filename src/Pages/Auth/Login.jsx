import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import logo from "../../assets/Img/logo.png";
import Hero from "../../assets/Img/Hero Section.png";
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { AppContext } from '../../Context/AppContext';
import { Helmet } from 'react-helmet-async';


const Login = () => {

  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);

  const [open, setOpen] = useState(false);


  const initValues = {

    email: "",
    password: "",
  };


  const inputValidation = Yup.object({
    email: Yup.string()
      .min(15, "يجب أن لا يقل عن 15 حرف")
      .email("enter the correct email")
      .required("this is invalid"),
    password: Yup.string()
      .min(8, "cant be less than 8 letters")
      .required("this is invalid")
      .max(20, "cant be more than 20 letters"),
  });


  const formik = useFormik({
    initialValues: initValues,
    validationSchema: inputValidation,
    onSubmit: async (values) => {
      try {

        const response = await axios.post('http://localhost:8000/api/login', {
          email: values.email,
          password: values.password,
        });

        const token = response.data.access_token;
        // localStorage.setItem("token", token);
        if (token) {
          Swal.fire({
            title: 'نجاح',
            text: 'تم التسجيل بنجاح',
            icon: 'success',
          }).then(() => {
            localStorage.setItem("token", token);
            navigate("/");
            setToken(token);

          });
        } else {
          Swal.fire({
            title: 'خطأ',
            text: "حدث خطا في التسجيل",
            icon: 'error',
          });
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

    <>
      <Helmet>
        <title>Login | Could.wav</title>
      </Helmet>
      <div className='h-[100vh]'>
        <div className='flex justify-center items-center h-full'>
          <div className='lg:w-4/7 w-full h-full bg-white pt-28 mx-auto'>
            <div className='w-[70%] m-auto'>
              <img src={logo} alt="logo" />
              <h2 className='text-3xl font-bold mt-10 text-[#2F00AC]'>Hi, Welcome Back Fellas!</h2>
              <div className='pt-8'>
                <form onSubmit={formik.handleSubmit}>
                  <div className='flex flex-col items-start pt-4'>
                    <label className='text-sm mb-3 text-[#919499]'>{"Email or username"}</label>
                    <input
                      className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                      type="email"
                      name="email" onChange={formik.handleChange} value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <small className='text-red-500'>{formik.errors.email}</small>
                    ) : null}
                  </div>
                  <div className='flex flex-col items-start pt-4'>
                    <div className='mb-3 text-sm flex flex-row justify-between w-full'>
                      <label className='text-[#919499]'>{("password")}</label>
                      <span className='text-[#2F00AC] text-bold'>
                        <a href="/ForgotPassword">Forgot Password?</a>
                      </span>
                    </div>
                    <input
                      className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                      type="password"
                      name="password" onChange={formik.handleChange} value={formik.values.password} id="UserPassword"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <small className='text-red-500'>{formik.errors.password}</small>
                    ) : null}
                  </div>

                  <button type="submit" className='w-full mt-10 font-bold bg-[#2F00AC] text-white rounded-[14px] transition-all py-4 border border-[#2F00AC] hover:bg-white hover:text-[#2F00AC]'>Sign In</button>
                </form>
              </div>
              <div className='relative w-full h-[1px] bg-[#919499] mt-12'>
                <span className='absolute top-0 left-1/2 px-10 text-[#919499] bg-white -translate-y-[50%] -translate-x-[50%]'>Or sign in with</span>
              </div>
              {/* <div className='mt-12 flex flex-row items-center justify-center gap-8'> */}
              {/* تسجيل الدخول عبر Google */}
              {/* <GoogleOAuthProvider clientId={googleClientId}>
                                    <GoogleLogin
                                        onSuccess={async (response) => {
                                            const token = response.credential

                                            try {
                                                const response = await axios.post("http://localhost:5000/auth/google", {
                                                    token,
                                                });
                                                console.log("Server Response:", response.data);
                                                if (response.data.success) {
                                                    localStorage.setItem("jwt", response.data.token);
                                                    console.log("User Logged In:", response.data.user);
                                                }
                                            } catch (error) {
                                                console.error("Login error:", error);
                                            }
                                        }}
                                        onError={() => console.log("Google Login Failed")}
                                        type='icon'
                                        text=''
                                        size='large'
                                        shape='circle'
                                        width={64}

                                    />
                                </GoogleOAuthProvider> */}
              {/* <ReactFacebookLogin
                                    appId={facebookAppId}
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    textButton=''
                                    icon="fa-facebook"
                                    cssClass='w-16 h-16 text-4xl bg-[#4267b2] text-white rounded-full cursor-pointer '
                                /> */}
              {/* </div> */}
              <p className='text-center mt-10 text-[#919499]'>
                Don't have an account? <a href="/register" className='text-[#2F00AC]'>Sign up</a>
              </p>
            </div>
          </div>


          <div className='flex justify-center lg:w-3/7 w-0 h-full  pt-28 bg-black relative overflow-hidden '>
            <div className='w-[80%] mx-auto'>
              <h1 className='text-5xl text-white font-black mb-[30px]'>Unleash Your sound <span className='text-[#2AC3FC]'>world</span> is tuned in</h1>
              <p className='text-white '>Try it and see the difference</p>
              <img src={Hero} alt="Hero" className='absolute bottom-0 right-0 max-w-[800px] lg:w-[900px] xl:w-[1100px]' />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;


