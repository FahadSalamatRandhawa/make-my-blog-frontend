
import BlogsDisplay from "@/components/dashboard/blog-display";
import { userState } from "@/stores/zustand.store";
import { readStoreStorageOnReload } from "@/utils/localStorage";
import { useEffect } from "react";

export default function Home(){
    
    return(
        <div className=" min-h-screen flex flex-col bg-darkbrown p-[20px] lg:p-[40px]">
            <BlogsDisplay />
        </div>
    )
}