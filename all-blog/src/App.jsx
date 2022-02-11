import React, {useReducer, createContext} from "react";   
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import {reducer, initialState} from "./reducer/loginReducer";


const LoginContext = createContext();

const App=()=>{
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return(
    <>
    <LoginContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
      <Nav/>
      </BrowserRouter>
    </LoginContext.Provider>
   
    </>
  )
}

export default App;
export {LoginContext};