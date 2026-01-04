"use client"
import Image from "next/image"
import { login } from "@/lib/login"
import logo from "@/public/icons/site/web-app-manifest-192x192.png"

export default function LoginPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const username = (form.username as HTMLInputElement).value
    const password = (form.password as HTMLInputElement).value
    const response = await login(username, password)

    if (response.status === "success") {
      document.cookie = `username=${response.user.username}; path=/`
      document.cookie = `role=${response.user.role}; path=/`
      localStorage.setItem("username", response.user.username)
      localStorage.setItem("role", response.user.role)
      location.replace("/dashboard")
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-sky-50 overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 size-[500px] bg-blue-200 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-0 right-0 size-[400px] bg-sky-100 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white border border-slate-200 shadow-lg p-8">
        
        <div className="flex flex-col items-center mb-6">
          <div className="mb-4 flex size-20 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
            <Image src={logo} alt="Library Logo" className="size-14" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">ورود به سیستم</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="نام کاربری"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="رمز عبور"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-slate-900 py-2.5 text-white font-medium hover:bg-slate-800 transition-all active:scale-95"
          >
            ورود
          </button>
        </form>
      </div>
    </main>
  )
}
