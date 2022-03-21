import axios from "axios";
import {useParams} from "react-router-dom";

import {
    MDBContainer 
  } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardTitle, MDBCardFooter, MDBCardText, 
    MDBCardBody, MDBCardImage, MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import React,{ useEffect, useState } from "react";
import Navigation from "./Navigation";
import { FaUserFriends  } from "react-icons/fa";
import { AiOutlineHeart  } from "react-icons/ai";
import { BiComment  } from "react-icons/bi";
import { IoIosSchool  } from "react-icons/io";
import { MdLocationPin  } from "react-icons/md";
import {  AiOutlineInstagram,  AiFillHeart, AiOutlineTwitter, AiFillFacebook, AiFillLinkedin  } from "react-icons/ai";
import {  RiUserFollowFill  } from "react-icons/ri";
import {  CgMoreO  } from "react-icons/cg";
import {  BsFillFileEarmarkPostFill  } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Audio } from  'react-loader-spinner'



// AiOutlineHeart BiComment AiOutlineDelete, AiOutlineEdit

const ViewProfile=()=>{
    const {id} = useParams();
    const [currentId, setCurrentId] = useState();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [usernames, setUserName] = useState();
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
    const [isFollow, setFollow] = useState(true);
    const [twitter, setTwitter] = useState();



    useEffect(()=>{
        
        const getUser = async()=>{
            setLoading(true);
            let currentuser = await axios.get("/user/currentuser");
            let users = await axios.get(`/user/getuserbyid/${id}`);
            let allposts = await axios.get(`/post/getUserPostsById/${id}`);
            setPosts(allposts.data);
            setCurrentId(currentuser.data._id);
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
            setLoading(false);
        }
        getUser();

    },[id])


    const getUser = async()=>{
        let currentuser = await axios.get("/user/currentuser");
        let users = await axios.get(`/user/getuserbyid/${id}`);
        let allposts = await axios.get(`/post/getUserPostsById/${id}`);
        setCurrentId(currentuser.data._id);
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



    const follow = async(user_id)=>{
        await axios.put(`/follow/${user_id}`);
        getUser();
    }

    const unfollow = async(user_id)=>{
        await axios.put(`/follow/unfollow/${user_id}`);
        getUser();
    }


    const isLike=async(post_id)=>{

        try {
            await axios.post("/like/islike", {
                post_id:post_id
            })
            getUser()
            
        } catch (error) {
            console.log(error);
        }

       
    }


    
    const unLike=async(post_id)=>{
        try {

            await axios.delete(`/like/unlike/${post_id}`);
            getUser();
            
        } catch (error) {
            console.log(error);
        }
    }



    return(
        <>
        {loading?(
            <>
                <div className="loading-center">
                <Audio
                    height="100"
                    width="100"
                    color='grey'
                    ariaLabel='loading'
                    />
                </div>
            </>
        ):(
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
                <div className="text-center mx-auto">
                    <div className="flex-name">
                       <h5 className="mx-1">{usernames}</h5>
                       {followers.includes(currentId)?(
                           <>
                            <button className="follow-btn mx-1" onClick={()=>unfollow(user._id)}>Unfollow</button>
                           </>
                       ):(
                           <>
                            <button className="follow-btn-follow mx-1" onClick={()=>follow(user._id)}>follow</button>
                           </>
                       )}
                    </div>

                </div>

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
        <MDBContainer className="my-2">
        <div className="w-50 text-center mx-auto">
            <div className="flex-info">
                {/* address and bout */}
                {location?(
                    <>
                        <p><MdLocationPin/> {location}</p>
                    </>
                ):(
                    <>
                    </>
                )}

                {/* education */}

                {education?(
                    <>
                        <p><IoIosSchool/> {education}</p>
                    </>
                ):(
                    <>
                    </>
                )}
            

            </div>
        </div>
        </MDBContainer>
       
       

         {/* social media */}
         <MDBContainer className="my-2">
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
                <p>{posts ? posts.length:0} posts</p>
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
                                        {data.meta_content.slice(0, 110)}...
                                        </MDBCardText>
                                        <div className="">
                                            <NavLink exact to={`/blog/${data._id}/${data.slug.replace(/\s+/g,'-')}`}>
                                            readmore
                                            </NavLink>
                                        </div>
                                    </MDBCardBody>
                                    <MDBCardFooter>
                                        <div className='text-muted card-footer-section'>
                                            <div className="icons">
                                                <div className="like">
                                                    {data.likes.includes(currentId)?(
                                                        <>
                                                        <AiFillHeart onClick={()=>unLike(data._id)}  size={"1.5rem"} className="mx-2 pink cursur"/>
                                                        <p className="text-center">{data.likes?data.likes.length:0}</p>
                                                        </>
                                                    ):(
                                                        <>
                                                        <AiOutlineHeart onClick={()=>isLike(data._id)}  size={"1.5rem"} className="mx-2 cursur"/>
                                                        <p className="text-center">{data.likes?data.likes.length:0}</p>
                                                        </>
                                                    )}
                                                    
                                                </div>

                                                <div className="comment">
                                                <BiComment size={"1.5rem"} className="mx-2 cursur"/>
                                                <p className="text-center">{data.comments?data.comments.length:0}</p>
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
        )}

        </>
    )
}

export default ViewProfile;