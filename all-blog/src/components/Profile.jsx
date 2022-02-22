import axios from "axios";
import {
    MDBContainer, MDBBtn 
  } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardTitle, MDBCardFooter, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navigation from "./Navigation";
import { FaUserFriends  } from "react-icons/fa";
import { AiOutlineHeart  } from "react-icons/ai";
import { BiComment  } from "react-icons/bi";
import { IoIosSchool  } from "react-icons/io";
import { MdLocationPin  } from "react-icons/md";
import {  AiOutlineInstagram, AiOutlineTwitter, AiFillFacebook, AiFillLinkedin  } from "react-icons/ai";
import {  RiUserFollowFill  } from "react-icons/ri";
import {  CgMoreO  } from "react-icons/cg";
import {  GrFormAdd  } from "react-icons/gr";
import {  BsFillFileEarmarkPostFill  } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import moment from "moment";



// AiOutlineHeart BiComment

const Profile=()=>{

    const [user, setUser] = useState();
    const [username, setUserName] = useState();
    const [posts, setPosts] = useState([]);
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
            let allposts = await axios.get("/userpost/allpost");
            setPosts(allposts.data);
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
                <p>{posts.length} posts</p>
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


        {/* post cards */}
        <MDBContainer className="my-4">

            <MDBRow className="g-4">
                {posts?(
                    <>
                    {posts.map((data, idx)=>{
                        return(
                            <>
                         
                                <MDBCol key={idx} sm={12} md={6} lg={4}>
                                    <MDBCard className="shadow-lg h-100 gy-3">
                                    <MDBCardImage
                                        className="profile-post-card-image"
                                        
                                        src={data.image?data.image:process.env.PUBLIC_URL+"bg.jpg"}
                                        alt='...'
                                        position='top'
                                    />
                                    <MDBCardBody>
                                        <MDBCardTitle>{data.title}</MDBCardTitle>
                                        <MDBCardText>
                                        {data.meta_content.slice(0, -170)}...
                                        </MDBCardText>
                                        <div className="">
                                            <a href="#">
                                            readmore
                                            </a>
                                            
                                        </div>
                                    </MDBCardBody>
                                    <MDBCardFooter>
                                        <div className='text-muted card-footer-section'>
                                            <div className="icons">
                                                <div className="like">
                                                    <AiOutlineHeart size={"1.5rem"} className="mx-2"/>
                                                    <p className="text-center">0</p>
                                                </div>

                                                <div className="comment">
                                                <BiComment size={"1.5rem"} className="mx-2"/>
                                                <p className="text-center">0</p>
                                                </div> 
                                            </div>
                                            <div className="date-section">
                                                <small>{moment(data.postDateUpdate).fromNow()}</small>
                                            </div>                       
                                        </div>
                                    </MDBCardFooter>
                                    </MDBCard>
                                </MDBCol>
                            </>
                        )

                    })}
                    </>
                ):(
                    <>
                    </>
                )}
            
            </MDBRow>
       </MDBContainer>
       


        </>
    )
}

export default Profile;