"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { signupModal, userState } from "@/stores/zustand.store";

  
export default function Navigation(){
    // State access and modify
    const toggle=signupModal((state:any)=>state.toggle)
    const open=signupModal((state:any)=>state.open)

    const user=userState((state)=>state.user)
    const {isLoggedIn,name}=user

    function openLoginSignup(){
        toggle()
    }
    return(
        <div className=" h-[70px] flex justify-between items-center bg-black text-white px-[10px]">
            <Image src={"/logo.jpeg"} width={50} height={50} alt="logo" />

            {
                isLoggedIn&&<div className=" flex gap-5 items-center">
                    <Link href={"/blog"} className=" hover:bg-white/30 py-2 px-3">Create blog</Link>
                    <Link href={"/dashboard"} className="hover:bg-white/30 py-2 px-3">Dashboard</Link>
                </div>
            }
            
            {/* <Dialog>
            <DialogTrigger className=" bg-white hover:bg-dimwhite rounded-none py-2 px-3 text-black">Login/Signup</DialogTrigger>
            <DialogContent className=" absolute flex w-auto max-w-none">
                <div className=" absolute">
                <SignupLogin/>
                </div>
            </DialogContent>
            </Dialog> */}

            {
                !isLoggedIn?<Button onClick={openLoginSignup} size={"lg"}>{open?"close":"Signup | Login"}</Button>
                :
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>{name}</AvatarFallback>
                    </Avatar>

            }

        </div>
    )
}