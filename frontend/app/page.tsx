"use client"
import { useEffect, useState } from 'react';

export default function TestPage() {
  const [msg, setMsg] = useState("در حال اتصال...");

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then(res => res.json())
      .then(data => setMsg(data.status))
      .catch(err => setMsg("خطا در اتصال به بک‌اند پایتون!"));
  }, []);

  return (
    <div className="p-10 text-2xl font-bold">
      وضعیت سیستم: {msg}
    </div>
  );
}