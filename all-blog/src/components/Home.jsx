import React ,{ useEffect, useState } from "react";
import Navigation from "./Navigation";
import {Helmet} from "react-helmet";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Audio } from  'react-loader-spinner'
import { AiOutlineHeart, AiFillHeart  } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import {
    MDBContainer, MDBRow, MDBCol
  } from 'mdb-react-ui-kit';

import './home.css';



const Home = () =>{

  const [randomSingly, setRandomSingly] = useState([]);
  const [randomPosts, setRandomPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostLiked, setMostLiked] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [user, setUser] = useState();


  useEffect(()=>{

    const callAllPosts = async()=>{

      try {
        setLoading(true);
        const getSinglyPosts = await axios.get("/post/getsinglerandompost");
        const getRandomPost = await axios.get("/post/getrandompost");
        const currentUser = await axios.get("/user/currentuser");
        const getMostLike = await axios.get("/post/getmostlikepost");
        const getMostPopular = await axios.get("/post/getmostcommentpost");
        setMostLiked(getMostLike.data);
        setMostPopular(getMostPopular.data);
        setRandomPosts(getRandomPost.data);
        setUser(currentUser.data);
        setRandomSingly(getSinglyPosts.data);
        setLoading(false);
        
      } catch (error) {
        console.log(error);
      }
  
    }
  
  callAllPosts();
  },[]);

  const callAllPosts = async()=>{

    try {
      const getSinglyPosts = await axios.get("/post/getsinglerandompost");
      const getRandomPost = await axios.get("/post/getrandompost");
      const currentUser = await axios.get("/user/currentuser");
      setRandomPosts(getRandomPost.data);
      setUser(currentUser.data);
      setRandomSingly(getSinglyPosts.data);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
    }

  }


  const isLike=async(post_id)=>{

    try {
        await axios.post("/like/islike", {
            post_id:post_id
        })
        callAllPosts()
        
    } catch (error) {
        console.log(error);
    }

   
}



  const unLike=async(post_id)=>{
    try {

        await axios.delete(`/like/unlike/${post_id}`);
        callAllPosts();
        
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
            <Helmet>
                <meta charSet="utf-8" />
                <title>BlogSpot</title>
            </Helmet>

        <Navigation/>
        <MDBContainer className="my-5">
          <h3 className="welcome">Welcome To Public Blogging</h3>
          <MDBRow>
            <MDBCol size='md' lg={8} sm={12} className='col-example'>
              {randomSingly.map((data, idx)=>{
                return (
                  <>
                  <div key={idx} className="card my-3">
                    <img className="medium-image" src={data.image} alt="" />
                    
                    <NavLink exact ClassName="link-color" to={`/blog/${data._id}/${data.slug.replace(/\s+/g,'-')}`}>
                      <h5 className="text-center mx-auto p-3 w-75 link-color text-dark">
                        {data.title}
                      </h5>
                    </NavLink>

                    <div className="icons ms-auto p-1">
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
                    
                    
                    <div className="user-profile">
                      <img className="small-profile-card m-3" src={data.user.profile_pic} alt="profile-pic" />
                      {user._id === data.user._id?(
                          <>
                              <NavLink exact to="/profile">
                              <span className="mx-2 name text-dark">{data.user.username}</span>
                              </NavLink>   
                          </>
                      ):(
                          <>
                              <NavLink exact to={`/profile/${data.user._id}/${data.user.username}`}>
                              <span className="mx-2 name text-dark">{data.user.username}</span>
                              </NavLink>
                          </>
                      )}
                    </div>  
                  </div>
                  
                   
                  </>
                )
              })}
            </MDBCol>
            <MDBCol size='md' lg={4} className='col-example d-none d-sm-block'>
              <MDBRow>
               
                {randomPosts.map((data, idx)=>{
                return (
                  <>
                   <MDBCol size="md" lg={6}>
                     <img className="small-images" src={data.image} alt="" />
                     <NavLink exact ClassName="link-color" to={`/blog/${data._id}/${data.slug.replace(/\s+/g,'-')}`}>
                     <p className="text-dark cursur"><u>{data.title}</u></p>
                     </NavLink>
                   </MDBCol>
                  </>
                )
              })}
              </MDBRow>

              <h5 className="text-center mt-5">Most Popular</h5>
              <MDBRow>
               
                {mostPopular.map((data, idx)=>{
                return (
                  <>
                   <MDBCol size="md" lg={6}>
                     <img className="small-images" src={data.image} alt="" />
                     <NavLink exact ClassName="link-color" to={`/blog/${data._id}/${data.slug.replace(/\s+/g,'-')}`}>
                     <p className="text-dark cursur"><u>{data.title}</u></p>
                     </NavLink>
                   </MDBCol>
                  </>
                )
              })}
              </MDBRow>


              <h5 className="text-center mt-5">Most Liked</h5>
              <MDBRow>
               
                {mostLiked.map((data, idx)=>{
                return (
                  <>
                   <MDBCol size="md" lg={6}>
                     <img className="small-images" src={data.image} alt="" />
                     <NavLink exact ClassName="link-color" to={`/blog/${data._id}/${data.slug.replace(/\s+/g,'-')}`}>
                     <p className="text-dark cursur"><u>{data.title}</u></p>
                     </NavLink>
                   </MDBCol>
                  </>
                )
              })}
              </MDBRow>

              
            </MDBCol>
          </MDBRow>
          
        </MDBContainer>

        </>
        )}
      </>
        
    )
}

export default Home;