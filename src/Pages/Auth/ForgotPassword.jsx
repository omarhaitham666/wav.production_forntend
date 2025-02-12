import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // تصفير الرسالة عند كل طلب جديد

        try {
            const response = await fetch("http://localhost:5000/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
            } else {
                setMessage(data.message || "حدث خطأ، حاول مرة أخرى.");
            }
        } catch (error) {
            setMessage("حدث خطأ في الاتصال بالخادم.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#E6F6FF]">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-4xl px-8 pt-6 pb-8 mb-4 text-center">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="w-full mt-10 font-bold bg-[#2F00AC] text-white rounded-[14px] transition-all py-4 border border-[#2F00AC] hover:bg-white hover:text-[#2F00AC]">
                    Send Link Reset Password
                </button>
                <a href="/login" className="text-[#C4C4C4] hover:text-[#2F00AC] mt-6 text-start flex flex-row items-center text-sm transition gap-2">
                    <TiArrowBack />
                    Back to Sign In</a>
            </form>
            {message && <p className="text-center transition-all font-bold text-red-500">{message}</p>}
        </div>
    );
};

export default ForgotPassword;
