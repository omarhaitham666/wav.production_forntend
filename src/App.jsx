import React, { lazy, Suspense } from "react";
import './App.css'
import { Route, Router, Routes } from 'react-router-dom';


import Header from './Components/Header'
import Footer from './Components/Footer'
import logo from "../src/assets/Img/logo.png"





const Home = lazy(() => import("./Pages/Home/Home"));
const Register = lazy(() => import("./Pages/Auth/Register"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const ForgotPassword = lazy(() => import("./Pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./Pages/Auth/ResetPassword"));
const JoinUs = lazy(() => import("./Pages/Join Us/JoinUs"));
const Pricing = lazy(() => import("./Pages/Pricing/Pricing"));
const FAQs = lazy(() => import("./Pages/FAQs/FAQs"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const Playing = lazy(() => import("./Pages/Playing/Playing"));
const OrderVideo = lazy(() => import("./Pages/OrderVideo/OrderVideo"));
const Album = lazy(() => import("./Pages/Albums/album"));
const Artist = lazy(() => import("./Pages/Artists/artist"));

// const Player = lazy(() => import("./Components/player"));

function App() {

  const Layout = ({ children }) => (
    <>
      <Header />
      {/* <Player /> */}
      {children}
      <Footer />

    </>
  );


  return (

    <Suspense fallback={<div className="flex flex-col items-center justify-center py-14" role="status">
      <img src={logo} className='w-80 mb-10 animate-pulse' alt="" />
      <span className="text-center text-3xl font-bold animate-pulse">Loading...</span>
    </div>}>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Playing" element={<Layout ><Playing /></Layout>} />
        <Route path="/join us" element={<Layout ><JoinUs /></Layout>} />
        <Route path="/Pricing" element={<Layout ><Pricing /></Layout>} />
        <Route path="/FAQs" element={<Layout ><FAQs /></Layout>} />
        <Route path="/Contact" element={<Layout ><Contact /></Layout>} />
        <Route path="/OrderVideo" element={<Layout ><OrderVideo /></Layout>} />
        <Route path="/Albums/:albumId" element={<Layout ><Album /></Layout>} />
        <Route path="/Artists/:artistId" element={<Layout ><Artist /></Layout>} />
      </Routes>
    </Suspense>

  )
}

export default App

export const API_ENDPOINT = 'http://localhost:8000/api'
