"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TestPage() {

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold'>به سیستم کتابخانه یارا خوش آمدید!</h1>
      <Link href="/login" className="text-blue-500 hover:text-blue-700">برای ورود به سیستم، کلیک کنید!</Link>
    </div>
  );
}