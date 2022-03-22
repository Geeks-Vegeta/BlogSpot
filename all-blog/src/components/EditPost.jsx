import React,{useState} from "react";
import Navigation from "./Navigation";
import {
    MDBBtn,
    MDBContainer, MDBInput
  } from 'mdb-react-ui-kit';
import {useParams} from "react-router-dom";
import { Audio } from  'react-loader-spinner'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'
import ReactHtmlParser from 'react-html-parser'; //converting react to html
import { GrLinkPrevious  } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify'; //importing react toastify to show error message
import 'react-toastify/dist/ReactToastify.css'; //importing toastify css file
import {Helmet} from "react-helmet";


const EditPost=()=>{
    const [text, setText] = useState();
    const [title, setTitle] = useState();
    const [slugs, setSlug] = useState();
    const [meta_content, setMetaContent] = useState();
    const [blogImage, setBlogImage] = useState();
    const [loading, setLoading]  = useState(false);
    const [blogImageCloud, setBlogImageCloud] = useState();

    const {id} = useParams();




    useEffect(()=>{

        const getPost = async()=>{
        setLoading(true);
        let posts = await axios.get(`/post/getpostbytitle?_id=${id}`);
        setText(posts.data.content);
        setTitle(posts.data.title);
        setSlug(posts.data.slug.replace(/-/g,' '));
        setMetaContent(posts.data.meta_content);
        setBlogImage(posts.data.image);
        setLoading(false);

        }
        getPost();

    },[id])



    
    const url = 'https://api.cloudinary.com/v1_1/getcomix/image/upload';
    const preset = 'e6lsvuui';



    const navigate = useNavigate();


    const handleChange=e=>{
        setText(e)
    }

    const setImageFile=(ve)=>{
        setBlogImageCloud(ve.target.files[0]);
        setBlogImage(URL.createObjectURL(ve.target.files[0]));
    }
    

    const editBlogPic=async(e)=>{
        e.preventDefault();

        try {
            const formdata=new FormData();
            formdata.append('file', blogImageCloud);
            formdata.append('upload_preset', preset);


            const res = await axios.post(url, formdata);
            console.log(res);

            const article_img = res.data.secure_url;

            await axios.put(`/post/update/${id}`,{
                image:article_img,
            });

            navigate("/profile")
            
        } catch (error) {
            console.log(error);
        }
    }

    const EditBlogPost=async(e)=>{
        e.preventDefault();


        try {

            await axios.put(`/post/update/${id}`,{
                title:title,
                content:text,
                slug:slugs,
                meta_content:meta_content,
            });
            toast.success("Post Edited Successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

           
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const slugEvent=(e)=>{
        setSlug(e.target.value);;
    }


    return (
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
                    <title>Edit Post</title>
                </Helmet>
        <Navigation/>
        <MDBContainer className="my-5">
            <GrLinkPrevious className="cursur mb-5" size={"1.5rem"} onClick={() => navigate(-1)}/>
            <h3>Edit Post</h3>

            <div className="my-4">
                <h5>Blog image</h5>
                <img className="blog-image-set" src={blogImage?blogImage:process.env.PUBLIC_URL+"bg.jpg"} alt="pic" />
                <br />
                <br />
                <div class="parent-div">
                    <button className="btn-upload">Choose file</button>
                    <input type="file" name="make" onChange={setImageFile} />
                </div>
                <div>
                   <MDBBtn onClick={editBlogPic} className="my-3">Update Background Picture</MDBBtn>
                </div>

            </div>
     

            {/* title */}
            <form onSubmit={EditBlogPost}>
            <MDBInput className="mb-4" label='Title' value={title} onChange={(e)=>setTitle(e.target.value)} id='typeText' type='text' required />
            <MDBInput className="mb-4" value={slugs} onChange={slugEvent} type='text' required/>

            <MDBInput wrapperClass='mb-4' value={meta_content} onChange={(e)=>setMetaContent(e.target.value)} textarea id='form4Example3' rows={4} label='Meta Content' required />

            <ReactQuill 
            value={text || ''}
            onChange={handleChange}
            modules={EditPost.modules}
            formats={EditPost.formats}
            size={"1rem"}
            theme={'snow'}
            placeholder="Enter your Content Here"
        />

        <MDBBtn type="submit" className="text-center my-3">Edit Post</MDBBtn>
        </form>


        <h5 className="my-4">Preview</h5>
        <div className="border p-3">
        {ReactHtmlParser(text)}

        </div>
        </MDBContainer>
        <ToastContainer/>
        </>
        )}
        </>
    )
}

EditPost.modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
        {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
}

EditPost.formats = [
'header', 'font', 'size',
'bold', 'italic', 'underline', 'strike', 'blockquote',
'list', 'bullet', 'indent',
'link', 'image', 'video','code-block'
]



export default EditPost;