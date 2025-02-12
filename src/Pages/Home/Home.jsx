import React from 'react'

function Home() {
  return (
    <div className='flex gap-6 text-center flex-col text-black font-bold'>
    <a href="/Register">Register page</a>
    <a href="/Login">Login page</a>
    <a href="/ForgotPassword">Forgot Password page</a>
    <a href="/ResetPassword">Reset Password page</a>
    </div>
  )
}

export default Home