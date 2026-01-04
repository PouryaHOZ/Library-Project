"use client"
import Link from "next/link"
import Image from "next/image"
import logo from "@/public/icons/site/web-app-manifest-192x192.png"

export default function Main() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-sky-50 overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 size-[500px] bg-blue-200 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-0 right-0 size-[400px] bg-sky-100 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        <div className="mb-8 flex items-center justify-center size-28 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <Image src={logo} alt="Library Logo" className="size-20" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          سامانه مدیریت <span className="text-blue-600">کتابخانه یارا</span>
        </h1>

        <p className="text-base md:text-lg text-slate-500 max-w-xl mb-10 leading-relaxed">
          جستجوی کتاب، مدیریت امانت‌ها، تمدید آنلاین و مشاهده تاریخچه، همه در یک محیط ساده و شفاف
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            href="/login"
            className="px-8 py-3 rounded-lg bg-slate-900 text-white font-medium shadow-md hover:bg-slate-800 transition-all active:scale-95"
          >
            ورود به سیستم
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
          <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="text-slate-900 font-semibold mb-2">جستجوی سریع</div>
            <div className="text-sm text-slate-500">
              پیدا کردن کتاب بر اساس عنوان، نویسنده یا دسته‌بندی
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="text-slate-900 font-semibold mb-2">مدیریت امانت</div>
            <div className="text-sm text-slate-500">
              مشاهده وضعیت کتاب‌های امانت‌گرفته‌شده و تاریخ تحویل
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="text-slate-900 font-semibold mb-2">تمدید آنلاین</div>
            <div className="text-sm text-slate-500">
              تمدید کتاب‌ها بدون مراجعه حضوری و اتلاف وقت
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 text-xs text-slate-400">
        Managed by: Pourya Habibolahzadeh
      </div>
    </main>
  )
}
