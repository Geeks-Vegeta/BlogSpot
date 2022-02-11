import React,{useContext, useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Cookies from "js-cookie";
import Forgot from "./Forgot";
import { LoginContext } from "../App";

const Nav = () =>{
    const {state, dispatch} = useContext(LoginContext);
    const navigate = useNavigate();


    useEffect(()=>{

        const setLoginSession = async()=>{
            console.log("running");
            let auth = Cookies.get('Authorization');
            if(auth){
                dispatch({type:"isLogin", payload:true})
                navigate("/");
            }
            else{
                navigate("/login");
                dispatch({type:"isLogin", payload:false})


            }

        }
        setLoginSession();

    },[dispatch])

    return (
        <>
        <Routes>
           {state?(
               <>
                <Route exact path="/" element={<Home/>}/>

               </>
           ):(
               <>
                <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/forgot" element={<Forgot/>}/>
               </>
           )}
            <>
           
            </>
          
        </Routes>

        </>
    )
}

export default Nav;