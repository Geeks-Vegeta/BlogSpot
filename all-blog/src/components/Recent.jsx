import axios from "axios";
import React, { useState, useEffect } from "react";
import { Audio } from  'react-loader-spinner'
import { MDBCard, MDBCardTitle, MDBTooltip, MDBContainer, MDBCardFooter, MDBCardText, 
    MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBModal,MDBModalDialog, MDBBtn,
    MDBModalContent,MDBModalHeader,MDBModalTitle,MDBModalBody,MDBModalFooter,
} from 'mdb-react-ui-kit';
import { AiOutlineHeart  } from "react-icons/ai";
import { BiComment  } from "react-icons/bi";
import { AiOutlineDelete,  AiOutlineEdit, AiFillHeart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import moment from "moment";


const Recent=()=>{
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [deleteModal, setDeleteModal] = useState(false);
    const [posts, setPosts] = useState([]);
    const [idx, setIdx] = useState();
    const [id, setid] = useState();

    useEffect(()=>{

        const getRecentData=async()=>{
            setLoading(true);
            let {data} = await axios.get(`/post/getAllRecentPosts`);
            let users = await axios.get("/user/currentuser");
            setUser(users.data);
            setPosts(data);
            setLoading(false);

        }
        getRecentData();

    },[])


    const getRecentData=async()=>{
        setLoading(true);
        let {data} = await axios.get(`/post/getAllRecentPosts`);
        let users = await axios.get("/user/currentuser");
        setUser(users.data);
        setPosts(data);
        setLoading(false);

    }

    const deleteShowOpen = (idx, id) =>{
        setDeleteModal(true);
        setid(id);
        setIdx(idx);
    } 

    const deleteShowClose=()=>{
        setDeleteModal(false);
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
            getRecentData()
            
        } catch (error) {
            console.log(error);
        }

       
    }


    const unLike=async(post_id)=>{
        try {

            await axios.delete(`/like/unlike/${post_id}`);
            getRecentData()
            
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <>
        {loading?(
            <>
                <Audio
                    height="100"
                    width="100"
                    color='grey'
                    ariaLabel='loading'
                    />
            </>
        ):(
            <>
                <h4 className="text-center">Recent</h4>
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

export default Recent;