import React ,{ useState } from "react";
import Navigation from "./Navigation";

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
  } from 'mdb-react-ui-kit';

import Recent from "./Recent";
import Popular from "./Popular";
import Liked from "./Liked";



const Home = () =>{

    const [basicActive, setBasicActive] = useState('recent');
   
    const handleBasicClick = (value) => {
      if (value === basicActive) {
        return;
      }
  
      setBasicActive(value);
    };
    
    return(
        <>
        <Navigation/>
        <div className="background-image-home" style={{backgroundImage: "url(/blacktheme.jpg)"}}>
            <h2 className="text-center big-text text-capitalize pt-5">4 ways group can stifle creativity</h2>
        </div>
        <MDBTabs fill  className='mb-3 bg-info '>
        <MDBTabsItem>
          <MDBTabsLink  onClick={() => handleBasicClick('recent')} active={basicActive === 'recent'}>
            Most Recent
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('popular')} active={basicActive === 'popular'}>
           Popular
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('liked')} active={basicActive === 'liked'}>
            Liked
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === 'recent'}> <Recent/> </MDBTabsPane>
        <MDBTabsPane show={basicActive === 'popular'}> <Popular/> </MDBTabsPane>
        <MDBTabsPane show={basicActive === 'liked'}> <Liked/> </MDBTabsPane>
      </MDBTabsContent>
        </>
    )
}

export default Home;