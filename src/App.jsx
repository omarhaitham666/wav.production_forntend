
import './App.css'
import { Route, Router, Routes } from 'react-router-dom';
import Footer from './Components/Footer'
import Header from './Components/Header'
import Home from './Pages/Home/Home';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import JoinUs from './Pages/Join Us/JoinUs';
import Pricing from './Pages/Pricing/Pricing';
import FAQs from './Pages/FAQs/FAQs';
import Contact from './Pages/Contact/Contact';
import Playing from './Pages/Playing/Playing';

function App() {
  const Layout = ({ children }) => (
    <>
      <Header />
      {children}
      <Footer />

    </>
  );


  return (

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



      </Routes>

  )
}

export default App

export const API_ENDPOINT = 'http://localhost:8000/api'
