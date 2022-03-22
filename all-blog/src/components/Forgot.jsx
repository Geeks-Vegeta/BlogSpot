import React, { useState } from "react";
import { MDBContainer, MDBInput  } from 'mdb-react-ui-kit';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; //importing react toastify to show error message
import 'react-toastify/dist/ReactToastify.css'; //importing toastify css file
import {Helmet} from "react-helmet";


const Forgot = () =>{
    const [email, setEmail] = useState();
    const navigate = useNavigate();


    const sendMail=async(e)=>{
        try {
            e.preventDefault();
        const send = await axios.post("/sendemail/basic",{
            email:email,
            subject:"Reset Password"
        })
        toast.success(send.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            await setTimeout(function(){ navigate('/verifyotp'); }, 5000);
        } catch (error) {
            
        if(error.response.status===404){
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    }

    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>BlogSpot - Forgot Password</title>
            </Helmet>
       <MDBContainer>
       <h5 className="m-4">BlogSpot</h5>

        <div className="center-box mt-5 boxs">
            <h3>Forgot your Password ?</h3>
            <p>Please enter you email you used to sign in</p>
        <form onSubmit={sendMail}>
            <MDBInput type="email" label='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className="w-100 mb-4 p-2" id='form1' />
            <button type="submit" className="login-button">Request Password Reset</button>
        </form>
        <Link to="/login">
            <p className="text-center m-4">Back to sign in</p>
        </Link>

        </div>
       </MDBContainer>
       <ToastContainer/>

        </>
    )

}

export default Forgot;