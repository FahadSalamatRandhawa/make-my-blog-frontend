
// read name, email, apikey from localstorage


export function readStoreStorageOnReload(){

    const apikey=localStorage.getItem("apikey")
    const name=localStorage.getItem("name")
    const email=localStorage.getItem("email")
    const token=localStorage.getItem("token")

    return {email,name,token,apikey}
}