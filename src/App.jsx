import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import PasswordReset from './components/PasswordReset';
import ForgotPassword from './components/ForgotPassword';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useContext, useState } from 'react'
import { LoginContext } from "./components/ContextProvider/Context";

function App() {
  const [data, setData] = useState(false);
  const history = useNavigate();
  const { loginData, setLoginData } = useContext(LoginContext);
  const dashboardValid = async () => {
    let token = localStorage.getItem('token');
    const response = await fetch(`https://lemon-carpenter-pevmg.ineuron.app:5000` + '/users/validuser', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    let data = await response.json();
    if (data.status === 401) {
      history("/login");
      Toast.error("Not a valid user");
    } else {
      // Toast.success(data.message);
      setLoginData(data.data);
      history("/dashboard");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      dashboardValid();
      setData(true);
    }, 2000)
  }, [])

  return (
    <>
      {
        data ?
          <div className="App">
            <Header />
            <Routes>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/password-reset' element={<PasswordReset />} />
              <Route path='/forgot-password/:id' element={<ForgotPassword />} />
            </Routes>
            <Toaster />
            <Footer />
          </div> :
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
      }
    </>
  )
}

export default App
