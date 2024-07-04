"use client"
import SignupLogin from "@/components/SignupLogin";
import { signupModal } from "@/stores/zustand.store";
import Image from "next/image";

export default function Home() {
  const open=signupModal((state:any)=>state.open)

  return (
    <div className=" h-screen flex flex-col justify-center items-center gap-[80px] bg-darkbrown ">

      {/* TopTextLayout */}
      <div className="w-[80%]  grid items-start mt-16">
        <div className="  grid grid-rows-2">

          {/* using invisible to get desired layout */}
          <div className=" flex">
            <h1 className=" row-span-2 ">You go do art, let the AI work</h1>
            <p className=" invisible left-[50%] -bottom-[35%] self-end bg-green-500 ">its time to kick back and relax</p>
          </div>
          <div className=" flex">
            <h1 className=" invisible row-span-2 bg-green-500">You go do art, let the AI work</h1>
            <p className=" left-[50%] -bottom-[35%] -pr-4 ">its time to kick back and relax</p>
          </div>
        </div>

        <h3>Get 20% off with CODE: EarlyBird</h3>
      </div>

      <div className=" relative w-[80%] h-[800px] opacity-35 mt-10">
        <Image src={"/background.png"} fill alt="background" />
      </div>
      {
        open&&<SignupLogin/>
      }
    </div>
  );
}
