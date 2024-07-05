"use client"

import { userState } from "@/stores/zustand.store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";
import { useRouter } from "next/navigation";

export function UserModal(){
    const user=userState((state)=>state.user)
    const logout=userState((state)=>state.logout)

    const router=useRouter()
    
    function handleLogout(){
        localStorage.removeItem("apikey")
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        logout()

        router.push("/")
    }
    return(
        <Dialog>
            <DialogTrigger>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
        </DialogTrigger>
            <DialogContent>
                <DialogHeader className=" text-lightblack">{user.name}</DialogHeader>
                <DialogDescription>api : {user.apikey}</DialogDescription>

                <DialogClose className=" bg-maroon py-2 px-3 text-center hover:opacity-80" onClick={handleLogout}>Logout</DialogClose>
            </DialogContent>
        </Dialog>
    )
}