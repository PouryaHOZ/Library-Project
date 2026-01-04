'use client'
import { changeUserRole, createUser, removeUser, setUserActive } from "@/lib/api";
import { userCreationType, userRoleType, userType } from "@/lib/placeholder";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function UserList({ users }: { users: { status: "success" | "failure"; data: userType[] } }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300 w-full md:w-4/5 mx-auto">
      <table className="min-w-full text-center divide-y divide-slate-200">
        <thead className="bg-slate-200 text-slate-700 font-medium">
          <tr>
            <th className="py-2 px-3">نام کاربری</th>
            <th className="py-2 px-3">نام کامل</th>
            <th className="py-2 px-3">موقعیت</th>
            <th className="py-2 px-3">فعال/غیرفعال</th>
            <th className="py-2 px-3">حذف</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.status === "success"
            ? users.data.map((user, i) => <UserRow key={`user-row-${i}`} user={user} />)
            : null}
        </tbody>
      </table>
    </div>
  )
}

export function UserRow({ user }: { user: userType }) {
  const [role, setRole] = useState(user.role)
  const [active, setActive] = useState(user.is_active ?? true)

  const roleHandle = (newRole: string, username: string) => {
    if (window.confirm("از ایجاد این تغییر مطمئن هستید؟")) {
      setRole(newRole as "member" | "librarian" | "admin")
      changeUserRole(newRole, username)
    }
  }

  const activeHandle = (isActive: boolean, username: string) => {
    if (user.role === "admin") {
      alert("مجاز به غیرفعال کردن ادمین نیستید!")
      return
    }
    if (window.confirm("آیا مطمئن هستید؟")) {
        setActive(isActive)
        setUserActive(isActive, username)
    }
  }

  const removeHandle = () => {
    if (user.role === "admin") {
      alert("مجاز به حذف ادمین نیستی!")
      return
    }
    if (window.confirm("آیا مطمئن هستید؟")) {
      removeUser(user.username)
    }
  }

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="py-2 px-3">{user.username}</td>
      <td className="py-2 px-3">{user.full_name}</td>
      <td className="py-2 px-3 flex justify-center gap-4">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name={`role-${user.username}`}
            value="member"
            checked={role === "member"}
            onChange={(e) => roleHandle(e.target.value, user.username)}
          />
          عضو
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name={`role-${user.username}`}
            value="librarian"
            checked={role === "librarian"}
            onChange={(e) => roleHandle(e.target.value, user.username)}
          />
          کتابخانه دار
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name={`role-${user.username}`}
            value="admin"
            checked={role === "admin"}
            onChange={(e) => roleHandle(e.target.value, user.username)}
          />
          ادمین
        </label>
      </td>
      <td className="py-2 px-3">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => activeHandle(e.target.checked, user.username)}
          className="w-5 h-5 mx-auto cursor-pointer"
        />
      </td>
      <td className="py-2 px-3">
        <TrashIcon
          className="h-5 w-5 mx-auto text-red-500 cursor-pointer hover:text-red-700 transition-colors"
          onClick={removeHandle}
        />
      </td>
    </tr>
  )
}


export default function NewUserField() {
    const [user, setUser] = useState<userCreationType>({
      username: "",
      password: "",
      full_name: "",
      role: "member",
      is_active: true
    })
  
    const handleAdd = () => {
      if (!user.username || !user.password || !user.full_name) {
        alert("تمام فیلدها باید پر شوند!")
        return
      }
      createUser(user)
      setUser({ username: "", password: "", full_name: "", role: "member", is_active: true })
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md text-center divide-y divide-slate-200">
          <thead className="bg-slate-200 text-slate-700 font-medium">
            <tr>
              <th className="py-2 px-3">نام کاربری</th>
              <th className="py-2 px-3">رمز عبور</th>
              <th className="py-2 px-3">نام کامل</th>
              <th className="py-2 px-3">نقش</th>
              <th className="py-2 px-3">فعال؟</th>
              <th className="py-2 px-3">افزودن</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="py-2 px-3">
                <input
                  className="input-box w-full rounded-lg border border-slate-300 px-2 py-1"
                  value={user.username}
                  onChange={e => setUser({ ...user, username: e.target.value })}
                  placeholder="نام کاربری"
                />
              </td>
              <td className="py-2 px-3">
                <input
                  type="password"
                  className="input-box w-full rounded-lg border border-slate-300 px-2 py-1"
                  value={user.password}
                  onChange={e => setUser({ ...user, password: e.target.value })}
                  placeholder="رمز عبور"
                />
              </td>
              <td className="py-2 px-3">
                <input
                  className="input-box w-full rounded-lg border border-slate-300 px-2 py-1"
                  value={user.full_name}
                  onChange={e => setUser({ ...user, full_name: e.target.value })}
                  placeholder="نام کامل"
                />
              </td>
              <td className="py-2 px-3">
                <select
                  className="input-box w-full rounded-lg border border-slate-300 px-2 py-1"
                  value={user.role}
                  onChange={e => setUser({ ...user, role: (e.target.value) as userRoleType })}
                >
                  <option value="member">عضو</option>
                  <option value="librarian">کتابخانه دار</option>
                  <option value="admin">ادمین</option>
                </select>
              </td>
              <td className="py-2 px-3">
                <input
                  type="checkbox"
                  checked={user.is_active}
                  onChange={e => setUser({ ...user, is_active: e.target.checked })}
                  className="w-5 h-5 mx-auto"
                />
              </td>
              <td className="py-2 px-3">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 transition-colors"
                  onClick={handleAdd}
                >
                  افزودن
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }