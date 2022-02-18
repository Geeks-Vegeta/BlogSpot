import React, {useContext, useEffect} from "react";
import axios from "axios";
import { LoginContext } from "../App";

import { useNavigate } from "react-router-dom";

const Logout=()=>{
    const {dispatch} = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const logout=async()=>{
            await axios.get("/userlogin/logout"); 
            dispatch({type:"isLogin",payload:false});
            navigate("/login")
        }
        logout();

    },[dispatch,navigate])
    return(
        <>
        </>
    )
}

export default Logout;