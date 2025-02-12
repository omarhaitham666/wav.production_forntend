
import './App.css'
import { Route, Router, Routes } from 'react-router-dom';
import Footer from './Components/Footer'
import Header from './Components/Header'
import Home from './Pages/Home/Home';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword';

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

      </Routes>

  )
}

export default App
