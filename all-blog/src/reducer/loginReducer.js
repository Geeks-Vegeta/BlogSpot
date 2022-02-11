//initial state is false then it will show register and login in navigation
//initial state is created here

export const initialState=false;

//an reducer function will get all the dispatching function and their states
//that will return the state
export const reducer=(state,action)=>{
    if(action.type==="isLogin"){
        return action.payload;
    }
    return state;
}