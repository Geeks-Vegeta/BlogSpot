import React,{useContext, useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Cookies from "js-cookie";
import Forgot from "./Forgot";
import Profile from "./Profile";
import { LoginContext } from "../App";
import Setting from "./Settings";
import Error from "./Error";
import Logout from "./Logout";
import AddPost from "./AddPost";

const Nav = () =>{
    const {state, dispatch} = useContext(LoginContext);
    const navigate = useNavigate();


    useEffect(()=>{

        const setLoginSession = async()=>{
            console.log("running");
            let auth = Cookies.get('Authorization');
            if(auth){
                dispatch({type:"isLogin", payload:true})
            }
            else{
                navigate("login")
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
                <Route path="" exact element={<Home/>}/>
                <Route path="profile" exact element={<Profile/>}/>
                <Route path="setting" exact element={<Setting/>}/>
                <Route path="logout" exact element={<Logout/>}/>
                <Route path="addpost" exact element={<AddPost/>}/>
                <Route path="*" exact element={<Error/>}/>


               </>
           ):(
               <>
               
                <Route exact path="login" element={<Login/>}/>
                <Route exact path="register" element={<Register/>}/>
                <Route exact path="forgot" element={<Forgot/>}/>
                <Route path="*" exact element={<Error/>}/>
               </>
           )}
            <>
           
            </>
          
        </Routes>

        </>
    )
}

export default Nav;