import axios from "axios";
import {
    MDBContainer, MDBBtn 
  } from 'mdb-react-ui-kit';
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navigation from "./Navigation";
import { FaUserFriends  } from "react-icons/fa";
import { MdLocationPin  } from "react-icons/md";
import {  AiOutlineInstagram, AiOutlineTwitter, AiFillFacebook, AiFillLinkedin  } from "react-icons/ai";
import {  RiUserFollowFill  } from "react-icons/ri";
import {  CgMoreO  } from "react-icons/cg";
import {  GrFormAdd  } from "react-icons/gr";
import {  BsFillFileEarmarkPostFill  } from "react-icons/bs";
import { NavLink } from "react-router-dom";



// FaUserFriends CgMoreO BsFillFileEarmarkPostFill GrFormAdd AiOutlineInstagram MdLocationPin

const Profile=()=>{

    const [user, setUser] = useState();
    const [username, setUserName] = useState();
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(()=>{
        
        const getUser = async()=>{
            let users = await axios.get("/user/currentuser");
            setFollowers(users.data.followers);
            setFollowing(users.data.following);
            setUser(users.data); 
            setUserName(users.data.username)
        }
        getUser();

    },[user])



    return(
        <>
        <Navigation/>
        <div className="background-image" style={{backgroundImage: "url(/bg.jpg)"}}>
        </div>
        <div className="text-center">
            <img className="profile-pic" src={process.env.PUBLIC_URL+"profile.jpg"} alt="" />
        </div>
        <div className="user-information">
            {user?(
                <>
                <h3 className="text-center">{username}</h3>

                </>
            ):(
                <>
                </>
            )}
        </div>

        {/* address and bout */}
        <MDBContainer className="my-3">
            <p className="text-center"><MdLocationPin/> Khopoli</p>
        </MDBContainer>

         {/* social media */}
         <MDBContainer className="my-3">
            <div className="social-media-icons text-center">
                <div className="flex-media">
                <AiOutlineInstagram size={"1.8rem"}/>
                <AiOutlineTwitter size={"1.8rem"}/>
                <AiFillFacebook size={"1.8rem"}/>
                <AiFillLinkedin size={"1.8rem"}/>
                </div>
            </div>
        </MDBContainer>

        {/* user information */}
        <div className="flex-info">
          <div className="followers cursur text-center">
                <BsFillFileEarmarkPostFill  size={"1.3rem"}/>
                <p>0 posts</p>
            </div>
            <div className="followers cursur text-center">
                <FaUserFriends  size={"1.3rem"}/>
                {followers?(
                    <>
                    <p>{followers.length} followers</p>

                    </>
                ):(
                    <>
                    </>
                )}
            </div>
            <div className="following cursur text-center">
                <RiUserFollowFill size={"1.3rem"}/>
                {following?(
                    <>
                       <p>{following.length} following</p>
                    </>
                ):(
                    <>
                    </>
                )}
            </div>
            <div className="more cursur text-center">
                <NavLink exact to="/setting">
                    <CgMoreO className="text-dark"  size={"1.3rem"}/>
                    <p className="text-dark">more</p> 
                </NavLink>
                                
            </div>
        </div>


        {/* bloging */}
        <hr className="w-75 mx-auto" />
        <div className="bloging">
            <MDBContainer className="my-3">
                <div className="text-center">
                    <NavLink exact to="/addpost">
                        <MDBBtn><GrFormAdd size={"1.6rem"} className="text-white"/> Add Posts</MDBBtn>
                    </NavLink>
                </div>
            </MDBContainer>
        </div>
        </>
    )
}

export default Profile;