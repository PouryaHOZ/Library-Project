'use client'
export default function getUserData(){
    
    return {
        username: localStorage.getItem("username") || " ",
        role: localStorage.getItem("role") || " "
    }
}