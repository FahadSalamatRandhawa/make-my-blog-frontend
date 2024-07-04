"use client"

import BlogsDisplay from "@/components/dashboard/blog-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { userState } from "@/stores/zustand.store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home(){
    const user=userState((state)=>state.user)

    const {toast}=useToast()
    const router=useRouter()

    const [topic,setTopic]=useState("")
    const [instructions,setInstructions]=useState("")
    const [pages,setPages]=useState(0)

    async function createBlog(){
        try{
            const Req=await fetch(process.env.NEXT_PUBLIC_API_URL+`/create_blog`,{
                method:"POST",
                body:JSON.stringify({topic,additionl_instructions:instructions,pages}),
                headers:{
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin":"*",
                    "bearer":user.token as string
                }
            })
            const Response=await Req.json()
            // Toast
            if(Req.ok){
                toast({
                    title:"Success",
                    description:"blog created"
                })
                router.refresh()
            }else{
                toast({
                    title:"Error",
                    description:Response.detail,
                    variant:"destructive"
                })
            }
        }catch(err:any){
            console.log("error in signup api call\n",err)
            toast({
                title:"Error",
                description:"please contact support",
                variant:"destructive"
            })
        }
    
    }
    return(
        <div className=" min-h-screen flex flex-col bg-darkbrown">
            <div className=" grid grid-cols-1 bg-white/80 gap-4">
            <Input value={topic} onChange={((e)=>setTopic(e.target.value))} />
            <Input value={instructions} onChange={((e)=>setInstructions(e.target.value))} />
            <Input type="number" value={pages} onChange={((e)=>setPages(parseInt(e.target.value)))} />
            </div>

            <Button onClick={createBlog} >Create</Button>
        </div>
    )
}