import { getServerUserData } from "@/lib/auth"
import AdminClient from "../ui/dashboard/admin"
import LibrarianClient from "../ui/dashboard/librarian"
import MemberClient from "../ui/dashboard/member"

export default async function Dashboard(){
    const {role:user_role} = await getServerUserData() 
    return(<>{
        user_role == "admin"? <AdminClient/> : user_role == "librarian" ? <LibrarianClient/> : <MemberClient/>
    }</>)
}