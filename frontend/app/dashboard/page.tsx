'use client'
import AdminClient from "../ui/dashboard/admin"
import LibrarianClient from "../ui/dashboard/librarian"
import MemberClient from "../ui/dashboard/member"

export default function Dashboard(){
    const user_role = localStorage.getItem("role")
    return(<>{
        user_role == "admin"? <AdminClient/> : user_role == "librarian" ? <LibrarianClient/> : <MemberClient/>
    }</>)
}