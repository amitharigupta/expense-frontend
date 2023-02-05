import Toast from 'react-hot-toast';
import React, { useEffect, useContext, useState } from 'react'
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";


const Dashboard = () => {
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
    <div className='dashboard mt-5'>
      {data ? <h1>User Email : {loginData.email}</h1> :
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}
    </div>
  )
}

export default Dashboard