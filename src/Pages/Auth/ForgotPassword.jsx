import { useFormik } from "formik";
import { useContext, useState } from "react";
import { IoMdMail } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { AppContext } from "../../Context/AppContext";
import axios from "axios";

const ForgotPassword = () => {
    const navigate=useNavigate();
  const { token, setToken } = useContext(AppContext);
  
  const [open, setOpen] = useState(false);

  
  const initValues = {
    
    email: "",
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
       
        const response = await axios.post('https://api.cloudwavproduction.com/api/forgot-password', {
          email: values.email,
          
        });

        // const token = response.data.access_token; 
        // localStorage.setItem("token", token);
        const message = response.data.message;
        if(message){
          Swal.fire({
            title: 'نجاح',
            text: 'تم التسجيل بنجاح',
            icon: 'success',
          }).then(() => {
            localStorage.setItem("token", token); 
            navigate("/ResetPassword");
            setToken(token);
            
          });
        }else {
          Swal.fire({
            title: 'خطأ',
            text:"حدث خطا في التسجيل",
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
        <div className="flex flex-col items-center justify-center h-screen bg-[#E6F6FF]">
            <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded-4xl px-8 pt-6 pb-8 mb-4 text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#2F00AC]">Forgot Password</h2>
                <p className="text-[#C4C4C4] mb-4">Enter your Email address to send link reset password</p>
                <div className="py-10 flex sm:flex-row flex-col items-center sm:items-start gap-4">
                    <div className="flex items-center justify-center bg-[#2F00AC] text-white rounded-full text-2xl w-14 h-14">
                        <IoMdMail />
                    </div>
                    <div className="sm:text-start text-center">
                        <h2 className="text-lg font-bold text-[#2F00AC] mb-2">Reset via Email</h2>
                        <p className="text-[#c4c4c4]">We will send a link to reset your password</p>
                    </div>
                </div>

                <input
                    type="email"
                    placeholder="Email Adress"
                    className="text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4"
                    name="email" onChange={formik.handleChange}  value={formik.values.email}
                />
                 {formik.touched.email && formik.errors.email ? (
                <small className='text-red-500'>{formik.errors.email}</small>
                ) : null}
                <button type="submit" className="w-full mt-10 font-bold bg-[#2F00AC] text-white rounded-[14px] transition-all py-4 border border-[#2F00AC] hover:bg-white hover:text-[#2F00AC]">
                    Send Link Reset Password
                </button>
                <a href="/login" className="text-[#C4C4C4] hover:text-[#2F00AC] mt-6 text-start flex flex-row items-center text-sm transition gap-2">
                    <TiArrowBack />
                    Back to Sign In</a>
            </form>
            {/* {message && <p className="text-center transition-all font-bold text-red-500">{message}</p>} */}
        </div>
    );
};

export default ForgotPassword;
