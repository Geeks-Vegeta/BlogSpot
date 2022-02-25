import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
} from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSetting  } from "react-icons/ai";
import { CgProfile  } from "react-icons/cg";
import { BiLogOut  } from "react-icons/bi";
import { MDBTooltip } from 'mdb-react-ui-kit';


export default function Navigation() {
  return (
      <>
    <MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
        <a className='navbar-brand'>Public Blog</a>
        <div className='d-flex input-group w-auto'>
            <MDBTooltip tag='a' className='text-dark' title="Home">
                {' '}
                <NavLink to="/">
                    <AiOutlineHome className='mx-1 text-dark' size={"1.5rem"}/>
                </NavLink>
            </MDBTooltip>
            <MDBTooltip tag='a' title="Profile">
                {' '}
                <NavLink to="/profile">
                   <CgProfile className='mx-1 text-dark' size={"1.5rem"}/>
                </NavLink>
            </MDBTooltip>
            <MDBTooltip tag='a' title="Settings">
                {' '}
                <NavLink to="/setting">
                   <AiOutlineSetting className='mx-1 text-dark' size={"1.5rem"}/>
                </NavLink>
            </MDBTooltip>
            <MDBTooltip tag='a' title="logout">
                {' '}
                <NavLink to="/logout">
                   <BiLogOut className='mx-1 text-dark' size={"1.5rem"}/>
                </NavLink>
            </MDBTooltip>
        </div>
        
      </MDBContainer>
    </MDBNavbar>
    </>
  );
}