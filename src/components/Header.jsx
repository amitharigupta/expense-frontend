import React, { useContext, useState } from 'react'
import '../styles/header.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from "./ContextProvider/Context";
import Toast from "react-hot-toast";

const Header = () => {

  const { loginData, setLoginData } = useContext(LoginContext);

  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);


  function handleClick(event) {
    setAnchorEl(event.target.value);
  }

  const handlClose = () => {
    setAnchorEl(null);
  }

  const logoutUser = async () => {
    let token = localStorage.getItem('token');
    const response = await fetch(`https://lemon-carpenter-pevmg.ineuron.app:5000` + '/users/logout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    let data = await response.json();
    if (data.status != 201) {
      Toast.success(data.message);
      localStorage.removeItem('token');
      setLoginData(false);
      history("/login");
    } else {
      console.log("Error");
    }
  }

  const goDash = () => {
    history("/dashboard");
  }

  return (
    <div className='header'>
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand text-xl text-warning-emphasis" href="#">Expense Tracker</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse align-items-center" id="navbarNav">
            {
              loginData ? <>
                <div className="collapse navbar-collapse float-end" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" to={"/dashboard"}>Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link">Expense</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link">Report</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link">Contact</NavLink>
                    </li>
                  </ul>
                </div>
              </> : (<ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/login"} >Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/register"}>Register</NavLink>
                </li>
              </ul>)
            }

          </div>
          <div className='collapse navbar-collapse' id="navbarNav">
            {
              loginData.email ?
                <div style={{ display: "flex", flexDirection: "row", justifyContentCenter: "center" }}> <span onClick={handleClick} className="rounded-circle" style={{ fontSize: "30px", color: "orange", backgroundColor: "gray", width: "50px", textAlign: "center" }}>{loginData.email[0].toUpperCase()}</span>  <p>
                  <button className='btn' onClick={logoutUser} >Logout</button></p>
                </div>
                :
                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" style={{ width: "50px" }}
                  alt="Avatar" />
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header