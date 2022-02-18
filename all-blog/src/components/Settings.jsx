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


    useEffect(()=>{

        const getUserDetails=async()=>{

            const userDetails = await axios.get("/user/currentuser");
            setName(userDetails.data.username);
            setEmail(userDetails.data.email);
            setGender(userDetails.data.gender);
            setLocation(userDetails.data.location);
            setEducation(userDetails.data.education);
            setMobile(userDetails.data.mobile);
            setBio(userDetails.data.bio);
            setInstagram(userDetails.data.instagram_link);
            setTwitter(userDetails.data.twitter_link);
            setLinkedIn(userDetails.data.linkedIn_link);
            setFacebook(userDetails.data.facebook_link)

        }
        getUserDetails();

    },[])

    return (
        <>
        <Navigation/>
        <MDBContainer className="my-5">
            <GrLinkPrevious className="cursur mb-5" size={"1.5rem"} onClick={() => navigate(-1)}/>
            <div className="my-4">
                <h5>Update Profile Pic</h5>
                <img className="round-circle" src={profilepic?URL.createObjectURL(profilepic):null} alt="pic" />
                <br />
                <br />
                <div class="parent-div">
                    <button class="btn-upload">Choose file</button>
                    <input type="file" name="upfile" onChange={(e)=>setProfilePic(e.target.files[0])} />
                </div>
                <div>
                   <MDBBtn className="my-3">Update Profile Pic</MDBBtn>
                </div>

            </div>
           


            <h5>Update Profile Details</h5>
            <form>
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
                   <MDBBtn>Update Profile</MDBBtn>
                </div>

            </form>

        </MDBContainer>
        
        </>
    )
}

export default Setting;