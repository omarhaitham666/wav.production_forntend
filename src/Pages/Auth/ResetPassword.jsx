import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // الحصول على التوكن من رابط البريد الإلكتروني
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("كلمتا المرور غير متطابقتين، حاول مرة أخرى.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.");
            } else {
                setMessage(data.message || "حدث خطأ، حاول مرة أخرى.");
            }
        } catch (error) {
            setMessage("حدث خطأ في الاتصال بالخادم.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#E6F6FF]">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-4xl px-8 pt-6 pb-8 mb-4 text-center sm-2/3 md:w-1/2 lg:w-1/3">
                <h2 className="text-3xl font-bold mb-4 text-[#2F00AC]">Reset Password</h2>
                <p className="text-[#C4C4C4] mb-4">Create your new password</p>
                <div className='flex flex-col items-start pt-4'>
                    <label className='text-sm mb-3 text-[#919499]'>{"Email or username"}</label>
                    <input
                        className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                        type="email"
                        value={email}
                        placeholder='Email or username'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='flex flex-col items-start pt-4'>
                    <label className='text-sm mb-3 text-[#919499]'>{"New Password"}</label>
                    <input
                        className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                        type="password"
                        value={password}
                        placeholder='New Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='flex flex-col items-start pt-4'>
                    <label className='text-sm mb-3 text-[#919499]'>{"Confirm New Password"}</label>
                    <input
                        className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                        type="password"
                        value={confirmPassword}
                        placeholder='Confirm New Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={password !== confirmPassword}
                    />
                </div>
                <button type="submit" className="w-full mt-10 font-bold bg-[#2F00AC] text-white rounded-[14px] transition-all py-4 border border-[#2F00AC] hover:bg-white hover:text-[#2F00AC]">
                    Reset Password
                </button>
            </form>
            {message && <p className="text-center transition-all font-bold text-red-500">{message}</p>}
        </div>
    );
};

export default ResetPassword;
