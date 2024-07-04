"use client"
import BlogsDisplay from "@/components/dashboard/blog-display";
import { userState } from "@/stores/zustand.store";

export default function Home(){
    const user=userState((state)=>state.user)
    
    return(
        <div className=" min-h-screen flex flex-col bg-darkbrown">
            <BlogsDisplay user={user} />
        </div>
    )
}