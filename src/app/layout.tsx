"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from "react";
import { readStoreStorageOnReload } from "@/utils/localStorage";
import { userState } from "@/stores/zustand.store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Make my blog",
//   description: "The AI does the job for you",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const login=userState((state)=>state.login)

    useEffect(()=>{
        const {email,name,token,apikey}=readStoreStorageOnReload()
        if(!email || !name || !token || !apikey) return
        login(email,name,token,apikey)
    },[])

  return (
    <html lang="en" >
      <body className=" min-h-screen ">
        <Navigation />
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
