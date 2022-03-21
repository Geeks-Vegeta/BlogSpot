import React, { useState } from "react";
import { MDBContainer, MDBInput  } from 'mdb-react-ui-kit';
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'; //importing react toastify to show error message
import 'react-toastify/dist/ReactToastify.css'; //importing toastify css file



const VerifyToken=()=>{
    const [otp, setOtp] = useState();
    const navigate = useNavigate();


    const verify=async(e)=>{
        e.preventDefault();

        try {
            let verifytoken = await axios.post(`/verifytoken`, {
                token:otp
            })
            toast.success(verifytoken.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            await setTimeout(function(){ navigate('/resetpassword'); }, 3000);

        } catch (error) {
            if(error.response.status===401){
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

    return(
        <>
        <MDBContainer>
            <div className="center-box mt-5 boxs">
                <h3>OTP Verification</h3>
                <p>Please enter otp of your email.</p>
            <form onSubmit={verify}>
                <MDBInput type="text" label='OTP' value={otp} onChange={(e)=>setOtp(e.target.value)} className="w-100 mb-4 p-2" id='form1' required={true}/>
                <button type="submit" className="login-button">Verify</button>
            </form>
            </div>
        </MDBContainer>
        <ToastContainer/>

        </>
    )
}

export default VerifyToken;