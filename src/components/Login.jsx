import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Toast from "react-hot-toast";
import "../styles/login.css";
import PasswordStrengthBar from 'react-password-strength-bar';

const Login = () => {
  const history = useNavigate();
  const [passShow, setPassShow] = useState(false);

  const [inpVal, setInpVal] = useState({
    email: "",
    password: ""
  });

  const setVal = (e) => {
    const {name, value} = e.target;
    setInpVal(() => { return { ...inpVal, [name]: value } });
  }


  const loginUserData = async (e) => {
    e.preventDefault();
    const { email, password } = inpVal;
    
    if (email === "") {
      Toast.error("Please Enter Email");
    } else if (!email.includes("@")) {
      Toast.error("Please Enter Valid Email");
    } else if (password === "") {
      Toast.error("Please Enter Password");
    } else if (password.length < 6) {
      Toast.error("Password must be 6 char");
    } else {
      let response = await fetch(`https://lemon-carpenter-pevmg.ineuron.app:5000` + '/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inpVal)
      });
      let data  = await response.json();
      if(data.status === 200 || data.status === 201) {
        localStorage.setItem("token", data.data.token);
        history('/dashboard');
        setInpVal({ ...inpVal, email: "", password: "" });
        Toast.success(data.message);
      } else {
        Toast.error(data.message);
      }
    }
  }


  return (
    <div className="row">
      <div className='col-md-4'></div>
      <div className='login col-md-4 mt-5'>
        <section>
          <div className="form-data">
            <div className="form_heading text-center">
              <h1>Welcome Back, <br />Log In</h1>
              <p>Hi, we are you glad you are back. Please Login.</p>
            </div>

            <form>
              <div className="mb-3 form-input">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" onChange={setVal} name="email" placeholder="Enter Email" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="two">
                  <input type={!passShow ? "password" : "text" } onChange={setVal} className="form-control" id="password" name="password" placeholder="Enter Password" />
                  <div className="showpass" onClick={() => setPassShow(!passShow)}>{!passShow ?  "Show" : "Hide" }</div>
                  <PasswordStrengthBar password={inpVal.password} />
                </div>
              </div>
              <div className='text-center'>
                <button type="submit" className="btn btn-primary" onClick={loginUserData}>Login</button>
                <p>Don't have an account? <NavLink to={"/register"}>Sign Up</NavLink></p>
                <p>Forgot Password <NavLink to={"/password-reset"}>Click Here</NavLink></p>
              </div>
              </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login