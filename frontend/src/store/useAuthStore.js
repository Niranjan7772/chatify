import { create } from "zustand";

export const useAuthStore = create((set)=>({
    authUser:{name:"John",_id:23,age:25},
    isLoggedIn:false,
    login:()=>{
        console.log("We jus logged In")
        set({isLoggedIn:true})
    }
}))