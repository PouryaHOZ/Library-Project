'use client'
import { login } from "@/lib/login";

export default function LoginPage() {
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = (e.target as HTMLFormElement).username.value;
        const password = (e.target as HTMLFormElement).password.value;
        const response = await login(username, password);
        if (response.status == "success"){
          document.cookie = `username=${response.user.username}; path=/`;
          document.cookie = `role=${response.user.role}; path=/`;
          localStorage.setItem("username", response.user.username)
          localStorage.setItem("role", response.user.role)
          location.replace("/dashboard")
        }
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold'>ورود به سیستم</h1>
      <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <input type='text' name='username' placeholder='نام کاربری' className='w-full p-2 border border-gray-300 rounded-md' />
        <input type='password' name='password' placeholder='رمز عبور' className='w-full p-2 border border-gray-300 rounded-md' />
        <button type='submit' className='w-full p-2 bg-blue-500 text-white rounded-md'>ورود</button>
      </form>
    </div>
  );
}