import React,{useState} from "react";
import Navigation from "./Navigation";
import {
    MDBBtn,
    MDBContainer,
  } from 'mdb-react-ui-kit';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'
import ReactHtmlParser from 'react-html-parser'; //converting react to html
import { GrLinkPrevious  } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const AddPost=()=>{
    const [text, setText] = useState()

    const navigate = useNavigate();


    const handleChange=e=>{
        setText(e)
    }


    return (
        <>
        <Navigation/>
        <MDBContainer className="my-5">
            <GrLinkPrevious className="cursur mb-5" size={"1.5rem"} onClick={() => navigate(-1)}/>
            <h3>Add Post</h3>
            <ReactQuill 
            value={text}
            onChange={handleChange}
            modules={AddPost.modules}
            formats={AddPost.formats}
            size={"1rem"}
            theme={'snow'}
            placeholder="Enter your Content Here"
        />

        <MDBBtn className="text-center my-3">Add Post</MDBBtn>

        <h5 className="my-4">Preview</h5>
        <div className="border p-3">
        {ReactHtmlParser(text)}

        </div>
        </MDBContainer>
        
        </>
    )
}

AddPost.modules = {
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

AddPost.formats = [
'header', 'font', 'size',
'bold', 'italic', 'underline', 'strike', 'blockquote',
'list', 'bullet', 'indent',
'link', 'image', 'video','code-block'
]



export default AddPost;