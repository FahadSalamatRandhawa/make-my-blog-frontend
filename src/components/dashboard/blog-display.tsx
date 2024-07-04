"use client"

import { blogs } from "@/testing data/blogs";
import BlogCard from "./blog-card";
import { useEffect, useState } from "react";

export default function BlogsDisplay(user:any){
    const [blogs,setBlogs]=useState<null|any>(null)

    async function getBlogs(){
        const req=await fetch(process.env.NEXT_PUBLIC_API_URL+`/blogs?apikey=${user.apikey}`,{
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*",
                "bearer":user.token as string
            },
        })
        const res=await req.json()
        if(req.ok){
            
            console.log(res)
            return res
        }else{
           console.log("not ok response",res)
        }
    }

    useEffect(()=>{
        getBlogs().then((res)=>setBlogs(res.blogs))
    },[])

    return(
        <div className=" flex flex-wrap gap-8">
            {
                blogs&&blogs.map((blog:any)=>(
                    <BlogCard blog={blog} key={blog._id} />
                ))
            }
        </div>
    )
}