import { lazy, Suspense, useEffect } from "react";
import './App.css'
import { Route, Routes } from 'react-router-dom';


import Header from './Components/Header'
import Footer from './Components/Footer'
import logo from "/logo.svg"
// import { HelmetProvider } from "react-helmet";

import AOS from "aos";
import "aos/dist/aos.css";
import UploadSong from "./Pages/Upload/uploadSong";



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
const Star = lazy(() => import("./Pages/Stars/star"));
const Upload = lazy(() => import("./Pages/Upload/upload"));
const Services = lazy(() => import("./Pages/Services/Services"));
const Terms = lazy(() => import("./Pages/Terms/Terms"));
const TermsofUse = lazy(() => import("./Pages/Terms/TermsofUse"));
const PlatformManagement = lazy(() => import("./Pages/platformManagement/PlatformManagement"));
const MusicDistribution = lazy(() => import("./Pages/Music distribution/MusicDistribution"));



// const Player = lazy(() => import("./Components/player"));

function App() {
  useEffect(() => {
    AOS.init({
        duration: 1000,
      });
}, []);
  const Layout = ({ children }) => (
    <>
      <Header />
      {children}
      <Footer />

    </>
  );


  return (

    <Suspense fallback={<div className="flex flex-col items-center justify-center py-14" role="status">
      <img src={logo} className='w-80 mb-10 animate-pulse' alt="" />
      <span className="text-center text-3xl font-bold animate-pulse">Loading...</span>
    </div>}>
      {/*<HelmetProvider>*/}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/Playing" element={<Layout ><Playing /></Layout>} />
          <Route path="/join-us" element={<Layout ><JoinUs /></Layout>} />
          <Route path="/Pricing" element={<Layout ><Pricing /></Layout>} />
          <Route path="/FAQs" element={<Layout ><FAQs /></Layout>} />
          <Route path="/Contact" element={<Layout ><Contact /></Layout>} />
          <Route path="/OrderVideo/:categ" element={<Layout ><OrderVideo /></Layout>} />
          <Route path="/albums/:id" element={<Layout ><Album /></Layout>} />
          <Route path="/Artists/:id" element={<Layout ><Artist /></Layout>} />
          <Route path="/Stars/:name" element={<Layout ><Star /></Layout>} />
          <Route path="/upload" element={<Layout ><Upload /></Layout>} />
          <Route path="/Services/Social_media" element={<Layout ><Services /></Layout>} />
          <Route path="/Services/Platform_Management" element={<Layout ><PlatformManagement /></Layout>} />
          <Route path="/Services/Music_distribution" element={<Layout ><MusicDistribution /></Layout>} />
          <Route path="/Terms/:type" element={<Layout ><Terms /></Layout>} />
          <Route path="/Terms-of-Use" element={<Layout ><TermsofUse /></Layout>} />

          <Route path="/PlatformManagement" element={<Layout ><PlatformManagement /></Layout>} />
          <Route path="/uploadSong" element={<Layout ><UploadSong /></Layout>} />
          {/* <Route path="/upload" element={<Layout ><UploadSong /></Layout>} /> */}





        </Routes>
      {/*</HelmetProvider>*/}
    </Suspense>

  )
}

export default App

export const API_ENDPOINT = 'https://api.cloudwavproduction.com//api'
