import React, { useState, useContext } from "react";
import { MDBContainer, MDBInput  } from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; //importing react toastify to show error message
import 'react-toastify/dist/ReactToastify.css'; //importing toastify css file
import axios from "axios";
import { LoginContext } from "../App";


const Login=()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {dispatch}=useContext(LoginContext); 




    const login= async(e)=>{
        e.preventDefault()

        const data = {
            "email":email,
            "password":password
        }

        try {
            await axios.post("/userlogin", data);
            dispatch({type:"isLogin",payload:true});
            navigate('/');
            
        } catch (error) {
            console.log(error);
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
            <h5 className="m-4">BlogSpot</h5>
            <div className="boxs mt-5 mb-5">
                <div className="heading-login">
                Sign in to your BlogSpot account
                </div>
                <form onSubmit={login}>  
                    <div className="login-form">
                        <MDBInput type="email" label='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className="w-100 mb-4 p-2" id='form1' />
                        <MDBInput type="password" label='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className="w-100 mb-4 p-2" id='form2'  />
                    </div>
                    <button type="submit" className="login-button">Sign in</button>
                    <Link to="/forgot">
                    <p className="text-center m-4">Forgot Password</p>
                    </Link>
                    <p className="text-center m-4">Don't have an account? <Link to="/register">Create one</Link> </p>
                </form>
            </div>
            
        </MDBContainer>
        <ToastContainer/>
        </>
    )
}

export default Login;