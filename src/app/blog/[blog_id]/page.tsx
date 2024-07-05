"use client"

import { useToast } from "@/components/ui/use-toast"
import { userState } from "@/stores/zustand.store"
import { useEffect, useState } from "react"

export default function Blog({params}:{params:{blog_id:string}}) {
    const [blog,setBlog]=useState<null|any>(null)
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState("")

    const user=userState((state)=>state.user)

    const {toast}=useToast()

    async function getBlogs(){
        try{
            const req=await fetch(process.env.NEXT_PUBLIC_API_URL+`/blog/${params.blog_id}?apikey=${user.apikey}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin":"*",
                },
            })
            const res=await req.json()
            setLoading(false)

            if(req.ok){
                
                return res
            }else{
               console.log("not ok response",res)
               toast({
                    title:"Error",
                    description:"please contract support",
                    variant:"destructive"
                })
                setError(res.detail)
            }
        }catch (err){
            console.log("error in api call",err)
        }
    }

    useEffect(()=>{
        getBlogs().then((res)=>setBlog(res.blog))
    },[])

    return(
        <div className=" flex flex-col gap-3 p lg:p-1 xl:p-2">
            {
                loading&&<div> fetching your blog ....</div>
            }
            {
                <div>{error}</div>
            }
            {
                blog&&Object.keys(blog).map((e)=>(
                    <>
                        <div>{e} : {JSON.stringify(blog[e])}</div>
                    </>
                ))
            }
        </div>
    )
}