import React,{ useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import Toast from "react-hot-toast";

const ForgotPassword = () => {

  const { id } = useParams();
  const history = useNavigate();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const userValid = async () => {
    const res = await fetch(`https://lemon-carpenter-pevmg.ineuron.app:5000` + `/users/forgotpassword/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    let data = await res.json();
    if(data.status === 201) {
      // Toast.success("User Valid");
      setToken(data.data.verifytoken);
    } else {
      Toast.success("User Not Valid");
      history("/login");
    }
    console.log(data);
  }

  const setVal = (e) => {
    setPassword(e.target.value);
  }

  const sendPassword = async (e) => {
    e.preventDefault();

const res = await fetch(`https://lemon-carpenter-pevmg.ineuron.app:5000` + `/users/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, token })
    })

    let data = await res.json();
    if(data.status === 201) {
      setPassword("");
      Toast.success(data.message);
    } else {
      Toast.success(data.message);
      history("/login");
    }
  }

  useEffect(()=> {
    userValid()
  }, []);

  // console.log(id, token);
  return (
    <div>
      <form>
        <div className="card mt-5 mb-5" style={{ maxWidth: "540px" }}>
          <div className="row g-0">
            <h1 className="color">Enter Your New Password</h1>
            <div className="col-md-8">
              <div className="card-body">
                <label htmlFor="newpassword">New Password</label>
                <input type="password" className="form-control" value={password} onChange={setVal} placeholder="Enter Password" />
                <div className='mt-2'>
                  <button className="btn btn-primary" onClick={sendPassword}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword