"use client"
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/icons/site/web-app-manifest-192x192.png"


export default function Main() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sky-50 relative overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-[120px] opacity-75" />
      </div>

      <div className="z-10 flex flex-col items-center text-center px-4">
        
        <div className="mb-8 p-4 bg-white rounded-full size-32 shadow-sm border border-slate-300">
           
           <Image 
            src={logo}
            alt="Library Logo"
            className="rounded-full"
           />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          به <span className="text-blue-600">کتابخانه یارا</span> خوش آمدید!
        </h1>
        
        <p className="text-lg text-slate-500 mb-10 max-w-md">
          وسیله دیجیتالی شما برای گرفتن کتاب های ناب و جذاب!
        </p>

        <Link 
          href="/login" 
          className="px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          ورود به سیستم
        </Link>
      </div>

      <div className="absolute bottom-8 text-slate-400 text-sm">
        Managed by: Pourya Habibolahzadeh
      </div>
    </main>
  );
}