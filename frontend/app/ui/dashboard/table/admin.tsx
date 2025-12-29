'use client'
import { changeUserRole } from "@/lib/api";
import { userType } from "@/lib/placeholder";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export function UserList({users}: {users: {status: "success" | "failure", data : userType[]}}){
    return(<table className="w-full p-2 bg-slate-50 text-center">
                <thead className="bg-slate-200 text-slate-500">
                    <tr>
                    <th>
                        نام کاربری
                    </th>
                    <th>
                        نام کامل
                    </th>
                    <th>
                        موقعیت
                    </th>
                    <th>
                        حذف
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {users.status == "success" ? users.data.map((user:userType,i:number) => {
                        return <UserRow user={user} key={`user-row-${i}`}/>
                    }):""}
                </tbody>
            </table>);
}

export function UserRow({user}: {user: userType}){
    const [role, setRole] = useState(user.role)
    const roleHandle = (newRole: string, username: string) => {
        const confirm = window.confirm("از ایجاد این تغییر مطمئن هستید؟")
        if (confirm){
            setRole(newRole as "member" | "librarian" | "admin")
            changeUserRole(newRole, username)
        }
    }
    const removeHandle = () => {

    }
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.full_name}
            </td>
            <td>
                <label>
                    عضو
                    <input type="checkbox" value="member" checked={role == "member"}
                    onChange={(e)=>{roleHandle(e.target.value, user.username)}}/>
                </label>
                <label>
                    کتابخانه دار
                    <input type="checkbox" value="librarian" checked={role == "librarian"}
                    onChange={(e)=>{roleHandle(e.target.value, user.username)}}/>
                </label>
                <label>
                    ادمین
                    <input type="checkbox" value="admin" checked={role == "admin"}
                    onChange={(e)=>{roleHandle(e.target.value, user.username)}}/>
                </label>
            </td>
            <td>
                <TrashIcon className="size-5 mx-auto" onClick={()=>removeHandle()}/>
            </td>
        </tr>
    )
}