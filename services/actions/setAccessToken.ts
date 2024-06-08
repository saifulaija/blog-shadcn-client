"use server"

import { authKey } from "@/constants/authKey";
import {cookies} from "next/headers"

import { redirect } from "next/navigation";


 const setAccessToken=(token:string,options?:any)=>{
cookies().set(authKey,token);



if(options && options?.role ==="SUBSCRIBER"){
    redirect('/')
}

if(options && options?. needPasswordChanged){
    redirect('/dashboard/change-password')
}
if(options && !options?. needPasswordChanged && options?.redirect){

    redirect(options.redirect)
}
}

export default setAccessToken;

