import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBTooltip, MDBModal,MDBModalDialog,
    MDBModalContent,MDBModalHeader,MDBModalTitle,MDBModalBody,MDBModalFooter
  } from 'mdb-react-ui-kit';

import { GrLinkPrevious  } from "react-icons/gr";
import { useNavigate, NavLink } from "react-router-dom";
import { Audio } from  'react-loader-spinner'
import ReactHtmlParser from 'react-html-parser'; //converting react to html
import moment from "moment";
import {  AiOutlineDelete, AiOutlineEdit  } from "react-icons/ai";


const ReadBlog=()=>{

    const {id} = useParams();
    const [deleteModal, setDeleteModal] = useState(false);
    const [post, setPost] = useState();
    const [allcomment, setAllComment] = useState([]);
    const [comment, setComment] = useState();
    const [cindex, setCIndex] = useState();
    const [user, setUser] = useState();
    const [commentId, setCommentId] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    
    const deleteShowOpen = (idx, id) =>{
        setDeleteModal(true);
        setCIndex(idx);
        setCommentId(id);
        // setid(id);
        // setIdx(idx);
    } 

    const deleteShowClose=()=>{
        setDeleteModal(false);
    }


    useEffect(()=>{

        const getPost = async() =>{
            try {
                setLoading(true)
                let posts = await axios.get(`/userpost/getpostbytitle?_id=${id}`);
                let user = await axios.get('/user/currentuser');
                setUser(user.data);
                setAllComment(posts.data.comments);
                setPost(posts.data);
                setLoading(false);
                
            } catch (error) {
                console.log(error);
                
            }
           
        }
        getPost();

    },[id])


    const addComments = async(id, e) =>{
        e.preventDefault();

        try {

            const addcomment = await axios.post(`/comment/addcomment/${id}`,{
                comment:comment
            });

            setAllComment((preval)=>{
                return [addcomment.data, ...preval]
            });
            setComment("");

        } catch (error) {
            console.log(error);
        }

    }


    const EditCommentLink=(id, idx, data)=>{
        setComment(data);
        setCIndex(idx);
        setCommentId(id);
        setIsEdit(true);

    }

    const EditComment=async(e)=>{
        e.preventDefault();

        const updateComment = allcomment.map((data, idx)=>{
            if(idx === cindex){
                return {
                    ...data,
                    "comment":comment
                }
            }
            else{
                return data;
            }

        })
        await axios.put(`/comment/updatecomment/${commentId}`,{
            comment:comment
        });
        setIsEdit(false);
        setComment("");
        setAllComment(updateComment);

    }


    const DeleteCommentLink=async()=>{
        setAllComment(data=>data.filter((val, id)=>{
            return cindex!==id;
        }))
        await axios.delete(`/comment/deletecomment/${commentId}/${post._id}`);
        setDeleteModal(false);

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
                <MDBContainer className="my-5">
                <GrLinkPrevious className="cursur mb-5" size={"1.5rem"} onClick={() => navigate(-1)}/>
                    
                    {post?(
                        <>
                        <div className="user-blog-profile">
                            <div className="username-profile">
                                <img className="small-profile" src={post.user.profile_pic} alt="profile-pic" />
                                {post.user._id === user._id ?(
                                    <>
                                    <NavLink exact to="/profile">
                                        <h5 className="my-2 mx-2">{post.user.username}</h5>
                                    </NavLink>
                                    </>
                                ):(
                                    <>
                                    <NavLink exact to="/profile">
                                        <h5 className="my-2 mx-2">{post.user.username}</h5>
                                    </NavLink>
                                    </>
                                )}
                                

                            </div>
                            <div className="time">
                                <small>{moment(post.postDateUpdate).fromNow()}</small>
                            </div>
                        </div>
                            <h1 className="text-center my-5">{post.title}</h1>

                            <div className="image">
                                <img className="image-read-blog w-100" src={post.image} alt="" />
                            </div>

                            <div className="my-3">
                            {ReactHtmlParser(post.content)}
                            </div>



                            {/* comments */}
                            <div className="comments my-5">
                                
                                <h5>Comments :-</h5>
                                <hr />
                                <div className="comment-section">
                                    <div>
                                        <img className="profile-pic-small" src={user.profile_pic} alt="" />
                                    </div>
                                    {isEdit?(
                                        <>
                                          <form onSubmit={(e)=>EditComment(e)}>
                                           <input className="comment_input" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="add a comment" type="text" required/>
                                            <MDBBtn type="submit">Edit</MDBBtn>
                                           </form>
                                        </>
                                    ):(
                                        <>
                                        <form onSubmit={(e)=>addComments(post._id, e)}>
                                        <input className="comment_input" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="add a comment" type="text" required/>
                                
                                            <MDBBtn type="submit">Add</MDBBtn>

                                     
                                        </form>
                                        </>
                                    )}
                                   
                                    
                                </div>
                            </div>

                            {allcomment.map((data, idx)=>{
                                return (
                                    < >
                                    <div key={idx}>
                                       <hr />
                                       <div className="comment-by-user">
                                           <img className="profile-pic-small" src={data.user.profile_pic?data.user.profile_pic:user.profile_pic} alt="" />
                                           <span className="mx-2">{data.user.username?data.user.username:post.user.username}</span>
                                           <span className="mx-2">{moment(data.commentDateUpdate).fromNow()}</span>
                                           <p className="mx-5">{data.comment}</p>
                                           {user._id === data.user._id || data.user?(
                                               <>
                                               <div className="mx-5">
                                                <MDBTooltip tag='a' className='text-dark' title="Edit">
                                                    {' '}
                                                    <AiOutlineEdit onClick={()=>EditCommentLink(data._id, idx, data.comment)} className="mx-2 cursur" size={"1.5rem"}/>
                                                </MDBTooltip>
                                                <MDBTooltip tag='a' className='text-dark' title="Delete">
                                                    {' '}
                                                    <AiOutlineDelete onClick={()=>deleteShowOpen(idx, data._id)}  className="mx-2 cursur" size={"1.5rem"}/>
                                                    <MDBModal show={deleteModal} setShow={setDeleteModal} tabIndex='-1'>
                                                    <MDBModalDialog>
                                                    <MDBModalContent>
                                                        <MDBModalHeader>
                                                        <MDBModalTitle>Delete Comment</MDBModalTitle>
                                                        <MDBBtn className='btn-close' color='none' onClick={deleteShowClose}></MDBBtn>
                                                        </MDBModalHeader>
                                                        <MDBModalBody>Are You Sure Want To Delete This.</MDBModalBody>

                                                        <MDBModalFooter>
                                                        <MDBBtn color='secondary' onClick={deleteShowClose}>
                                                            Close
                                                        </MDBBtn>
                                                        <MDBBtn onClick={DeleteCommentLink}>Delete</MDBBtn>
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
                                       </div>
                                    </div>

                                    </>
                                )
                            })}
                            
                        </>
                    ):(
                        <>
                        </>
                    )}
                    

                </MDBContainer>
            </>
        )}
        
        </>
    )
}

export default ReadBlog;