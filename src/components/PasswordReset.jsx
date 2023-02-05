import React, { useState } from 'react'
import Toast from "react-hot-toast";

const PasswordReset = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(false);
    const setVal = (e) => {
        setEmail(e.target.value);
    }

    const sendLink = async (e) => {
        e.preventDefault();
        const res = await fetch(`https://lemon-carpenter-pevmg.ineuron.app:5000` + '/users/sendpasswordlink', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        });

        let data = await res.json();

        if (data.status == 201) {
            setEmail("");
            setMessage(true);
            Toast.success(data.message);
        } else {
            Toast.error(data.message);
        }
    }

    return (
        <>
            {
                message ?
                    <p className='bg-success color-white text-bold'>Password reset link successfully sent in your email</p> :
                    ""
            }
            <form>
                <div className="card mt-5 mb-5" style={{ maxWidth: "540px" }}>
                    <div className="row g-0">
                        <h1 className="color">Enter Your Email</h1>
                        <div className="col-md-8">
                            <div className="card-body">
                                <input type="text" className="form-control" name="email" id="email" onChange={setVal} placeholder="Enter Email" />
                                <div className='mt-2'>
                                    <button className="btn btn-primary" onClick={sendLink}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default PasswordReset