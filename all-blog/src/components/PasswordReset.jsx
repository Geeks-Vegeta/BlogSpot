import React, { useState } from "react";
import { MDBContainer, MDBInput  } from 'mdb-react-ui-kit';
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'; //importing react toastify to show error message
import 'react-toastify/dist/ReactToastify.css'; //importing toastify css file

const PasswordReset=()=>{
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const navigate = useNavigate();


    const changePassword = async(e)=>{
        e.preventDefault();

        if(password !== confirmPassword){
            toast.warning("Password Does not Match", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

        }

        try {
            const userpassword = await axios.put(`/user/changepassword`,{
                password:password
            })
            toast.success(userpassword.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            await setTimeout(function(){ navigate('/login'); }, 3000);
            
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

    return (
        <>
         <MDBContainer>
            <h5 className="m-4">BlogSpot</h5>
            <div className="boxs mt-5 mb-5">
                <div className="heading-login">
                Add a new password
                </div>
                <form onSubmit={changePassword}>  
                    <div className="login-form">
                        <MDBInput type="text" label='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className="w-100 mb-4 p-2" id='form1' required={true}/>
                        <MDBInput type="text" label='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="w-100 mb-4 p-2" id='form2'  required={true}/>
                    </div>
                    <button type="submit" className="login-button">Confirm Change</button>
                </form>
            </div>
            
        </MDBContainer>
        <ToastContainer/>
        </>
    )
}

export default PasswordReset;