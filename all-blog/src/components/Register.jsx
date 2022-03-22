import React from "react";
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn  } from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; //importing react toastify to show error message
import 'react-toastify/dist/ReactToastify.css'; //importing toastify css file
import {Helmet} from "react-helmet";


const Register=()=>{

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const register=async(e)=>{
        e.preventDefault();

        const data = {
            "username": username,
            "email": email,
            "password": password
        }
        
        try {
            await axios.post("/register", data);
            toast.success("User Created Successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            await setTimeout(function(){ navigate('/login'); }, 5000);
            
            
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
           <Helmet>
                <meta charSet="utf-8" />
                <title>BlogSpot - sign up</title>
            </Helmet>
        <MDBContainer>
            <h5 className="m-4">BlogSpot</h5>

            <div className="register-heading">
                <h4>Create an account for free</h4>
                <p>Free forever. No payment needed.</p>
            </div>
            
            <form onSubmit={register}>
                <div className="form"> 
                    <MDBInput label='Username' value={username} onChange={(e)=>setUserName(e.target.value)} className="w-100 mb-4 p-2" id='form1' type='text' required={true}/>
                    <MDBInput type="email" label='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className="w-100 mb-4 p-2" id='form1'  />
                    <MDBInput label='Password' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-100 mb-4 p-2" id='form1'  required={true}/>
                    <div className="mt-5 mb-4">
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='By creating an account you are agreeing to our Terms and Conditions' required={true}/>
                    </div>
                    <MDBBtn type="submit" outline rounded className='mx-auto p-3 w-100' color='dark'>
                    Sign up with email
                    </MDBBtn>
                    <hr />
                    <Link to="/login">
                        <p className="text-center">Already have an account?</p>
                    </Link>
                
                </div>
            </form>
           
        </MDBContainer>
        <ToastContainer/>
        </>
    )
}

export default Register;