import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:null,
    isAuthenticated:false
}
const authSlice=createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        userLoggedIn: (state,action)=>{
            //console.log("From authSlice ", action.payload.user);
            state.user=action.payload.user,
            //console.log("user is ", state.user);
            state.isAuthenticated=true
        },
        userLoggedOut:(state)=>{
            state.user=null,
            state.isAuthenticated=false
        }
    }
})

export const {userLoggedIn,userLoggedOut} = authSlice.actions;
export default authSlice.reducer;