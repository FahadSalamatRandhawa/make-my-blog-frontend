import { create } from 'zustand'

export const signupModal=create((set)=>({
    open:false,
    toggle:()=>set((state:{open:boolean})=>({open:!state.open}))
}))


interface userState{
    user:{
        isLoggedIn:boolean,
        email:string|null,
        name:string|null,
        token:string|null,
        apikey:string|null,
    }
    login:(email:string,name:string,token:string,apikey:string)=>void
}
export const userState=create<userState>((set)=>({
    user:{
        isLoggedIn:false,
        email:null,
        name:null,
        token:null,
        apikey:null
    },
    login:(email:string,name:string,token:string,apikey:string)=>set((state:{user:any})=>({user:{isLoggedIn:true,email:email,name:name,token:token,apikey:apikey}}))
}))