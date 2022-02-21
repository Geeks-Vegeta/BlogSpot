import React,{ useEffect, useState} from "react";
import Navigation from "./Navigation";
import {
    MDBContainer, MDBInput, MDBRadio, MDBBtn
  } from 'mdb-react-ui-kit';

import { GrLinkPrevious  } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Setting = () =>{

    const navigate = useNavigate();

    // stage
    const [username, setName] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState();
    const [location, setLocation] = useState();
    const [education, setEducation] = useState();
    const [mobile, setMobile] = useState();
    const [bio, setBio] = useState();
    const [instagram, setInstagram] = useState();
    const [twitter, setTwitter] = useState();
    const [linkedIn, setLinkedIn] = useState();
    const [facebook, setFacebook] = useState();
    const [profilepic, setProfilePic] = useState();
    const [profileFile, setProfileFile] = useState();
    const [backgroundFile, setBackGroundFile] = useState();
    const [background, setBackGround] = useState();


    const url = 'https://api.cloudinary.com/v1_1/getcomix/image/upload';
    const preset = 'e6lsvuui';



    useEffect(()=>{

        const getUserDetails=async()=>{

            const userDetails = await axios.get("/user/currentuser");
            setName(userDetails.data.username);
            setEmail(userDetails.data.email);
            setGender(userDetails.data.gender);
            setLocation(userDetails.data.location);
            setEducation(userDetails.data.education);
            setMobile(userDetails.data.mobile_number);
            setBio(userDetails.data.bio);
            setProfilePic(userDetails.data.profile_pic);
            setBackGround(userDetails.data.background_image)
            setInstagram(userDetails.data.instagram_link);
            setTwitter(userDetails.data.twitter_link);
            setLinkedIn(userDetails.data.linkedIn_link);
            setFacebook(userDetails.data.facebook_link)

        }
        getUserDetails();

    },[])




    const updateProfile=async(e)=>{
        e.preventDefault();

        await axios.put("/user/updateprofile",{
            username:username,
            email:email,
            location:location,
            education:education,
            bio:bio,
            instagram_link:instagram,
            twitter_link:twitter,
            linkedIn_link:linkedIn,
            facebook_link:facebook,
            gender:gender,
            mobile_number:mobile
        });
        navigate("/profile");


    }



    const ProfileInput=(e)=>{
        setProfileFile(e.target.files[0]);
        setProfilePic(URL.createObjectURL(e.target.files[0]));

    }


      // upload profile pic
      const uploadProfilePic = async()=>{
        const formdata=new FormData();
        formdata.append('file', profileFile);
        formdata.append('upload_preset', preset);


        const res = await axios.post(url, formdata);

        const article_img = res.data.secure_url;

        await axios.put(`/user/updateprofile`,{
            profile_pic:article_img 
        });
        navigate("/profile");
    }



    // 
    
    const BackgroundInput=(e)=>{
        setBackGroundFile(e.target.files[0]);
        setBackGround(URL.createObjectURL(e.target.files[0]));

    }


    // upload background pic
    const uploadBackgroundPic = async()=>{
        const formdata=new FormData();
        formdata.append('file', backgroundFile);
        formdata.append('upload_preset', preset);


        const res = await axios.post(url, formdata);

        const article_img = res.data.secure_url;

        await axios.put(`/user/updateprofile`,{
            background_image:article_img 
        });
        navigate("/profile");
    }

    return (
        <>
        <Navigation/>
        <MDBContainer className="my-5">
            <GrLinkPrevious className="cursur mb-5" size={"1.5rem"} onClick={() => navigate(-1)}/>
            <div className="my-4">
                <h5>Update Profile Pic</h5>
                <img className="round-circle" src={profilepic?profilepic:process.env.PUBLIC_URL+"profile.jpg"} alt="pic" />
                <br />
                <br />
                <div class="parent-div">
                    <button class="btn-upload">Choose file</button>
                    <input type="file" name="upfile" onChange={ProfileInput} />
                </div>
                <div>
                   <MDBBtn onClick={uploadProfilePic} className="my-3">Update Profile Pic</MDBBtn>
                </div>

            </div>


            <div className="my-4">
                <h5>Update Background Picture</h5>
                <img className="round-circle" src={background?background:process.env.PUBLIC_URL+"bg.jpg"} alt="pic" />
                <br />
                <br />
                <div class="parent-div">
                    <button class="btn-upload">Choose file</button>
                    <input type="file" name="upfile" onChange={BackgroundInput} />
                </div>
                <div>
                   <MDBBtn onClick={uploadBackgroundPic} className="my-3">Update Background Picture</MDBBtn>
                </div>

            </div>
           


            <h5>Update Profile Details</h5>
            <form onSubmit={updateProfile}>
                <MDBInput className="mb-4" label='Name' value={username} onChange={(e)=>setName(e.target.value)} id='typeText' type='text' />
                <MDBInput className="mb-4" label='Email' value={email} onChange={(e)=>setEmail(e.target.value)} id='typeEmail' type='email' />
                <MDBInput className="mb-4" label='Location' value={location} onChange={(e)=>setLocation(e.target.value)} id='typeText' type='text' />
                <MDBInput className="mb-4" label='Education' value={education} onChange={(e)=>setEducation(e.target.value)} id='typeText' type='text' />
                <MDBInput className="mb-4" label='Mobile Number' value={mobile} onChange={(e)=>setMobile(e.target.value)} id='typeText' type='text' />
                <MDBInput className="mb-4" label='Instagram link' value={instagram} onChange={(e)=>setInstagram(e.target.value)} id='typeText' type='text' />
                <MDBInput className="mb-4" label='Twitter link' value={twitter} onChange={(e)=>setTwitter(e.target.value)} id='typeText' type='text' />
                <MDBInput className="mb-4" label='LinkedIn link' value={linkedIn} onChange={(e)=>setLinkedIn(e.target.value)} id='typeText' type='text' />
                <MDBInput className="mb-4" label='Facebook link' value={facebook} onChange={(e)=>setFacebook(e.target.value)} id='typeText' type='text' />



                <MDBInput wrapperClass='mb-4' value={bio} onChange={(e)=>setBio(e.target.value)} textarea id='form4Example3' rows={4} label='Bio' />
                <h6>Gender</h6>
                <div>
                    <MDBRadio name='flexRadioDefault' checked={gender === 'Male'} id='flexRadioDefault1' label='Male' onClick={() => setGender('Male')}/>
                    <MDBRadio name='flexRadioDefault' checked={gender === 'Female'} id='flexRadioDefault2' label='Female' onClick={() => setGender('Female')} />
                </div>
                <div className="text-center">
                   <MDBBtn type="submit">Update Profile</MDBBtn>
                </div>

            </form>

        </MDBContainer>
        
        </>
    )
}

export default Setting;