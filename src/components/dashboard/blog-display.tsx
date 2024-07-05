"use client"

import { blogs as bg } from "@/testing data/blogs";
import BlogCard from "./blog-card";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { userState } from "@/stores/zustand.store";
import Link from "next/link";
import { Blog } from "@/utils/interfaces";

export default function BlogsDisplay(){
    const [blogs,setBlogs]=useState<null|any>(null)
    const [loading,setLoading]=useState(true)

    const {toast}=useToast()
    const user=userState((state)=>state.user)


    async function getBlogs(){
        try{
            const req=await fetch(process.env.NEXT_PUBLIC_API_URL+`/blogs?apikey=${user.apikey}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin":"*",
                    "bearer":user.token as string
                },
            })
            const res=await req.json()
            setLoading(false)

            if(req.ok){
                
                console.log(res)
                return res
            }else{
               console.log("not ok response",res)
               toast({
                    title:"Error",
                    description:"please contract support",
                    variant:"destructive"
                })
            }
        }catch (err){
            console.log("error in api call",err)
        }
    }

    useEffect(()=>{
        getBlogs().then((res)=>setBlogs(res.blogs))
    },[])

    return(
        <div className=" flex flex-wrap gap-8 items-stretch">
            {
                loading&&<div> fetching your blogs ....</div>
            }
            {
                blogs?blogs.map((blog:Blog)=>(
                    <Link href={`/blog/${blog._id}`} key={blog._id}>
                        <BlogCard blog={blog} key={blog._id} />
                    </Link>
                )):
                !loading&&<div>could not fetch your blogs</div>
            }
        </div>
    )
}