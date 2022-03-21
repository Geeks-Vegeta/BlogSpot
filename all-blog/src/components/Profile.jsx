import axios from "axios";
import {
    MDBContainer, MDBBtn 
  } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardTitle, MDBTooltip, MDBCardFooter, MDBCardText, 
    MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBModal,MDBModalDialog,
    MDBModalContent,MDBModalHeader,MDBModalTitle,MDBModalBody,MDBModalFooter,
} from 'mdb-react-ui-kit';
import React,{ useEffect, useState } from "react";
import Navigation from "./Navigation";
import { FaUserFriends  } from "react-icons/fa";
import { AiOutlineHeart  } from "react-icons/ai";
import { BiComment  } from "react-icons/bi";
import { IoIosSchool  } from "react-icons/io";
import { MdLocationPin  } from "react-icons/md";
import {  AiOutlineInstagram, AiOutlineDelete,  AiOutlineEdit, AiFillHeart, AiOutlineTwitter, AiFillFacebook, AiFillLinkedin  } from "react-icons/ai";
import {  RiUserFollowFill  } from "react-icons/ri";
import {  CgMoreO  } from "react-icons/cg";
import {  GrFormAdd  } from "react-icons/gr";
import {  BsFillFileEarmarkPostFill  } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Audio } from  'react-loader-spinner'



// AiOutlineHeart BiComment AiOutlineDelete, AiOutlineEdit

const Profile=()=>{

    const [user, setUser] = useState();
    const [deleteModal, setDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
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
    const [idx, setIdx] = useState();
    const [id, setid] = useState();
    const [followingModal, setFollowingModal] = useState(false);
    const [followerModal, setFollowerModal] = useState(false);

    const followingShow = () => setFollowingModal(!followingModal);
    const followerShow = () => setFollowerModal(!followerModal)


    const deleteShowOpen = (idx, id) =>{
        setDeleteModal(true);
        setid(id);
        setIdx(idx);
    } 

    const deleteShowClose=()=>{
        setDeleteModal(false);
    }


    useEffect(()=>{
        
        const getUser = async()=>{
            setLoading(true);
            let users = await axios.get("/user/currentuser");
            let allposts = await axios.get("/post/allcurrentuserpost");
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
            setLoading(false);
        }
        getUser();

    },[])


    const getUser = async()=>{
        let users = await axios.get("/user/currentuser");
        let allposts = await axios.get("/post/allcurrentuserpost");
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


    const unfollow=async(user_id, idx)=>{
        setFollowing(data=>data.filter((val,id)=>{
           return idx!==id;
       }))
        await axios.put(`/follow/unfollow/${user_id}`);
        getUser();
    }



    const deletePost = async()=>{
        setPosts((posts)=>
            posts.filter((data, index)=>{
                return index !== idx;

            }))
            await axios.delete(`/userpost/delete/${id}`);
        setDeleteModal(false);
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
                <p>{posts ? posts.length:0} posts</p>
            </div>
            <div className="followers cursur text-center">
                <FaUserFriends onClick={followerShow} size={"1.3rem"}/>
                {followers?(
                    <>
                    <p onClick={followerShow}>{followers.length} followers</p>
                        <MDBModal show={followerModal} setShow={setFollowerModal} tabIndex='-1'>
                        <MDBModalDialog scrollable>
                            <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Followers</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={followerShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                            {followers.map((data, idx)=>{
                                    return (
                                        <>
                                        <div key={idx} className="flex-following">
                                            <div className="name-pic">
                                                <img className="profile-pic-small" src={data.profile_pic} alt="" />
                                                <a href={`/profile/${data._id}/${data.username}`}>
                                                   <span onClick={()=>followerShow} className="mx-2">{data.username}</span>
                                                </a>
                                            </div>
                                            {data.followers.includes(user._id)?(
                                                <>
                                                    {/* <button className="follow-btn-following mx-1">Unfollow</button> */}
                                                </>
                                            ):(
                                                <>
                                                    <button onClick={()=>follow(data._id)} className="follow-btn-following mx-1">follow</button>
                                                </>
                                            )}
                                        </div>
                                        <hr />
                                        </>
                                    )
                                })}
                           
                            </MDBModalBody>

                    
                    </MDBModalContent>
                    
                </MDBModalDialog>
                </MDBModal>

                    </>
                ):(
                    <>
                    </>
                )}
            </div>
            <div className="following cursur text-center">
                <RiUserFollowFill  onClick={followingShow} size={"1.3rem"}/>
                {following?(
                    <>
                       <p onClick={followingShow}>{following.length} following</p>
                        <MDBModal show={followingModal} setShow={setFollowingModal} tabIndex='-1'>
                        <MDBModalDialog scrollable>
                            <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Following</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={followingShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                {following.map((data, idx)=>{
                                    return (
                                        <>
                                        <div key={idx} className="flex-following">
                                            <div className="name-pic">
                                                <img className="profile-pic-small" src={data.profile_pic} alt="" />
                                                <a href={`/profile/${data._id}/${data.username}`}>
                                                <span className="mx-2">{data.username}</span>
                                                </a>
                                            </div>
                                            <button onClick={()=>unfollow(data._id, idx)} className="follow-btn-following mx-1">Unfollow</button>
                                        </div>
                                        <hr />
                                            

                                        </>
                                    )
                                })}
                      
                            </MDBModalBody>

                            
                            </MDBModalContent>
                        </MDBModalDialog>
                        </MDBModal>
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
                                        {data.meta_content.slice(0, 110)}...
                                        </MDBCardText>
                                        <div className="">
                                            <NavLink exact to={`/blog/${data._id}/${data.slug.replace(/\s+/g,'-')}`}>
                                            readmore
                                            </NavLink>
                                        </div>
                                        {/* action buttons */}
                                        {user._id === data.user?(
                                            <>
                                            <div className="action-buttons my-3 float-lg-end cursur">
                                               <MDBTooltip tag='a' className='text-dark' title="Edit">
                                                    {' '}
                                                    <NavLink exact to={`/editpost/${data._id}/${data.slug.replace(/\s+/g,'-')}`}>
                                                        <AiOutlineEdit className="mx-2 text-dark" size={"1.3rem"}/>
                                                    </NavLink>
                                                </MDBTooltip>
                                                <MDBTooltip tag='a' className='text-dark' title="Delete">
                                                   <AiOutlineDelete onClick={()=>deleteShowOpen(idx, data._id)} className="mx-2" size={"1.3rem"}/>
                                                   <MDBModal show={deleteModal} setShow={setDeleteModal} tabIndex='-1'>
                                                    <MDBModalDialog>
                                                    <MDBModalContent>
                                                        <MDBModalHeader>
                                                        <MDBModalTitle>Delete Blog</MDBModalTitle>
                                                        <MDBBtn className='btn-close' color='none' onClick={deleteShowClose}></MDBBtn>
                                                        </MDBModalHeader>
                                                        <MDBModalBody>Are You Sure Want To Delete This.</MDBModalBody>

                                                        <MDBModalFooter>
                                                        <MDBBtn color='secondary' onClick={deleteShowClose}>
                                                            Close
                                                        </MDBBtn>
                                                        <MDBBtn onClick={deletePost}>Delete</MDBBtn>
                                                        </MDBModalFooter>
                                                    </MDBModalContent>
                                                    </MDBModalDialog>
                                                </MDBModal>
                                                </MDBTooltip>


                                            </div>
                                            </>
                                        ):(
                                            <>
                                            </>
                                        )}
                                    </MDBCardBody>
                                    <MDBCardFooter>
                                        <div className='text-muted card-footer-section'>
                                            <div className="icons">
                                                <div className="like">
                                                    {data.likes.includes(user._id)?(
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

export default Profile;