import axios from "axios";
import {
    MDBContainer, MDBBtn 
  } from 'mdb-react-ui-kit';
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navigation from "./Navigation";
import { FaUserFriends  } from "react-icons/fa";
import { IoIosSchool  } from "react-icons/io";
import { MdLocationPin  } from "react-icons/md";
import {  AiOutlineInstagram, AiOutlineTwitter, AiFillFacebook, AiFillLinkedin  } from "react-icons/ai";
import {  RiUserFollowFill  } from "react-icons/ri";
import {  CgMoreO  } from "react-icons/cg";
import {  GrFormAdd  } from "react-icons/gr";
import {  BsFillFileEarmarkPostFill  } from "react-icons/bs";
import { NavLink } from "react-router-dom";



// FaUserFriends CgMoreO BsFillFileEarmarkPostFill GrFormAdd AiOutlineInstagram MdLocationPin IoIosSchool

const Profile=()=>{

    const [user, setUser] = useState();
    const [username, setUserName] = useState();
    const [location, setLocation] = useState();
    const [following, setFollowing] = useState([]);
    const [background, setBackground] = useState();
    const [education, setEducation] = useState();
    const [bio, setBio] = useState();
    const [profile_pic, setProfilePic] = useState();
    const [followers, setFollowers] = useState([]);
    const [instagram , setInstagram] = useState();
    const [linkedIn, setLinkedIn] =  useState();
    const [facebook, setFacebook] = useState();
    const [twitter, setTwitter] = useState();




    useEffect(()=>{
        
        const getUser = async()=>{
            let users = await axios.get("/user/currentuser");
            setFollowers(users.data.followers);
            setFollowing(users.data.following);
            setUser(users.data); 
            setBio(users.data.bio);
            setLocation(users.data.location);
            setBackground(users.data.background_image);
            setInstagram(users.data.instagram_link);
            setUserName(users.data.username);
            setProfilePic(users.data.profile_pic);
            setLinkedIn(users.data.linkedIn_link);
            setFacebook(users.data.facebook_link);
            setTwitter(users.data.twitter_link)
            setEducation(users.data.education);
        }
        getUser();

    },[])




    return(
        <>
        <Navigation/>
        {background?(
            <>
            <div className="background-image" style={{backgroundImage: `url(${background})`}}>
            </div>
            </>
        ):(
            <>
            <div className="background-image" style={{backgroundImage: "url(/bg.jpg)"}}>
           </div>
            </>
        )}
        
        <div className="text-center">
            <img className="profile-pic" src={profile_pic?profile_pic:process.env.PUBLIC_URL+"profile.jpg"} alt="" />
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

        {/* bio */}

        <div className="w-50 mx-auto text-center">
            {bio?(
                <>
                <h6>{bio}</h6>
                </>
            ):(
                <>
                </>
            )}

        </div>

        {/* address and bout */}
        {location?(
            <>
            <MDBContainer className="my-3">
                <p className="text-center"><MdLocationPin/> {location}</p>
            </MDBContainer>
            </>
        ):(
            <>
            </>
        )}

        {/* education */}

        {education?(
            <>
            <MDBContainer className="my-3">
                <p className="text-center"><IoIosSchool/> {education}</p>
            </MDBContainer>
            </>
        ):(
            <>
            </>
        )}
       

         {/* social media */}
         <MDBContainer className="my-3">
            <div className="social-media-icons text-center">
                <div className="flex-media">
                    {instagram?(
                        <>
                        <a href={instagram} target="_blank" rel="noopener noreferrer">
                           <AiOutlineInstagram size={"1.8rem"}/>
                        </a>
                        </>
                    ):(
                        <>
                        </>
                    )}
                    {twitter?(
                        <>
                        <a href={twitter} target="_blank" rel="noopener noreferrer">
                        <AiOutlineTwitter size={"1.8rem"}/>
                        </a>
                        </>
                    ):(
                        <>
                        </>
                    )}
                    {facebook?(
                        <>
                        <a href={facebook} target="_blank" rel="noopener noreferrer">
                        <AiFillFacebook size={"1.8rem"}/>
                        </a>
                        </>
                    ):(
                        <>
                        </>
                    )}
                    {linkedIn?(
                        <>
                        <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                        <AiFillLinkedin size={"1.8rem"}/>
                        </a>
                        </>
                    ):(
                        <>
                        </>
                    )}
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