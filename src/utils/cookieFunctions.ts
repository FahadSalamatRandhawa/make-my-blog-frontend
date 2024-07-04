import { cookies } from "next/headers";

function setCookies(...keys:[{[x:string]:string}]){
    const cookieStore=cookies()

    console.log("cookies stored : ")
    keys.forEach((key)=>{
        cookieStore.set(key.key,key.value)
        console.log(key.key," : ",key.value)
    })
}