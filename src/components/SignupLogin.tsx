"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signupModal, userState } from "@/stores/zustand.store"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"


export default function SignupLogin(){
    const login=userState((state)=>state.login)

    const {toast}=useToast()
    const router=useRouter()

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")

    async function handleLogin() {
        try{
            const loginReq=await fetch(process.env.NEXT_PUBLIC_API_URL+`/login`,{
                method:"POST",
                body:JSON.stringify({email,password}),
                headers:{
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin":"*"
                }
            })
            const loginResponse=await loginReq.json()
            // Toast
            if(loginReq.ok){
                toast({
                    title:"Login successful",
                    description:"redirecting..."
                })
                login(loginResponse.email,loginResponse.name,loginResponse.token,loginResponse.apikey)
                router.push("/dashboard")
            }else{
                toast({
                    title:"Error",
                    description:loginResponse.detail,
                    variant:"destructive"
                })
            }
        }catch(err){
            console.log("error in login api call\n",err)
            toast({
                title:"Error",
                description:"please contract support",
                variant:"destructive"
            })
        }
    }

    async function handleSignup() {
        try{
            const Req=await fetch(process.env.NEXT_PUBLIC_API_URL+`/signup`,{
                method:"POST",
                body:JSON.stringify({email,name,password}),
                headers:{
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin":"*"
                }
            })
            const Response=await Req.json()
            // Toast
            if(Req.ok){
                toast({
                    title:"Signup successful",
                    description:"You can now login"
                })
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
                description:"please contract support",
                variant:"destructive"
            })
        }
    }

    return(
        <Tabs defaultValue="login" className=" absolute flex flex-col justify-between w-[400px] min-h-[400px] items-center bg-gradient-to-b from-[#EBE1E1]/90 to-[#000000]/40 gap-[20px] p">
        <TabsList className=" w-full grid grid-cols-2 p-0 bg-black text-white">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>

        {/* login */}
        <TabsContent value="login" className=" h-fit w-[80%] grid gap-5" >
            <div>
                <label>Email</label>
                <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className=" flex gap-5 h-5 items-center">
                <Input type="checkbox" className=" w-fit h-fit" />
                <label>remember me</label>
            </div>

            <Button onClick={handleLogin} className="text-lg ">Login</Button>
        </TabsContent>

        {/* signup */}
        <TabsContent value="signup" className=" h-fit w-[80%] grid gap-5">
            <div>
                <label>Email</label>
                <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <label>Name</label>
                <Input type="password" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className=" flex gap-5 h-5 items-center">
                <Input type="checkbox" className=" w-fit h-fit" />
                <label>I agree to terms and policy</label>
            </div>

            <Button onClick={handleSignup} className=" text-lg mb-14">Sign up</Button>
        </TabsContent>
        </Tabs>

    )
}