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
import ReadBlog from "./ReadBlog";
import EditPost from "./EditPost";
import ViewProfile from "./ViewProfile";
import PasswordReset from "./PasswordReset";
import VerifyToken from "./VerifyToken";

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
                navigate("login");
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
                <Route path ="profile/:id/:username" exact element={<ViewProfile/>}/>
                <Route path="editpost/:id/:slug" exact element={<EditPost/>}/>
                <Route path="logout" exact element={<Logout/>}/>
                <Route exact path="resetpassword" element={<PasswordReset/>}/>
                <Route path="addpost" exact element={<AddPost/>}/>
                <Route path="blog/:id/:slug" exact element={<ReadBlog/>}/>
                <Route path="*" exact element={<Error/>}/>

               </>
           ):(
               <>
                <Route exact path="login" element={<Login/> }/>
                <Route exact path="/verifyotp" element={<VerifyToken/>}/>
                <Route exact path="register" element={<Register/>}/>
                <Route exact path="forgot" element={<Forgot/>}/>
                <Route exact path="resetpassword" element={<PasswordReset/>}/>
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