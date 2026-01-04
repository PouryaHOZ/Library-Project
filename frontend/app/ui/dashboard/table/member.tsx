'use client'

import { loanProlongReq, loanReq, loanReturnReq } from "@/lib/api";
import { bookType } from "@/lib/placeholder";
import { useState } from "react";
import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/solid";

export function LoanTable({ loanedBooks }: any) {

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
      <table className="min-w-full text-center divide-y divide-slate-200">
        <thead className="bg-slate-100 text-slate-700 font-semibold">
          <tr>
            <th className="py-3 px-4">نام</th>
            <th className="py-3 px-4">نویسنده</th>
            <th className="py-3 px-4">موضوع</th>
            <th className="py-3 px-4">تعداد درخواست شده</th>
            <th className="py-3 px-4">تاریخ درخواست</th>
            <th className="py-3 px-4">مهلت امانت</th>
            <th className="py-3 px-4">وضعیت</th>
            <th className="py-3 px-4">تمدید</th>
            <th className="py-3 px-4">بازگردانی</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {loanedBooks.status === "success" && loanedBooks.data.map((e: any, i: number) => (
            <tr key={`loan-${i}`} className="hover:bg-slate-50 transition-colors">
              <td className="py-2 px-4">{e.title}</td>
              <td className="py-2 px-4">{e.author}</td>
              <td className="py-2 px-4">{e.category}</td>
              <td className="py-2 px-4">{e.book_amount}</td>
              <td className="py-2 px-4">{e.rention_date}</td>
              <td className="py-2 px-4">{e.return_date}</td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded-full text-white text-sm 
                  ${e.status === "active" ? "bg-green-500" : "bg-gray-400"}`}>
                  {e.status}
                </span>
              </td>
              <td className="py-2 px-4">
                <button
                  className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-all text-sm"
                  onClick={() => loanProlongReq(e.loan_id)}
                >
                  <ArrowPathIcon className="w-4 h-4" /> تمدید
                </button>
              </td>
              <td className="py-2 px-4">
                <button
                  className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition-all text-sm"
                  onClick={() => loanReturnReq(e.loan_id)}
                >
                  <CheckIcon className="w-4 h-4" /> بازگردانی
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AvailableTable({ availableBooks, username }: { availableBooks: any; username: string }) {
  const [search, setSearch] = useState("");
  const [filterText, setFilerText] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          placeholder="کتاب چی هوس کردی؟"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border-2 border-slate-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <label className="flex items-center gap-2 text-slate-700 font-medium">
          براساس:
          <select
            className="border-2 border-slate-300 rounded-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            onChange={(e) => setFilerText(Number(e.target.value))}
          >
            <option value={0}>نام کتاب</option>
            <option value={1}>نام نویسنده</option>
          </select>
        </label>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-center divide-y divide-slate-200">
          <thead className="bg-slate-100 text-slate-700 font-semibold">
            <tr>
              <th className="py-3 px-4">نام</th>
              <th className="py-3 px-4">نویسنده</th>
              <th className="py-3 px-4">موضوع</th>
              <th className="py-3 px-4">تعداد موجود</th>
              <th className="py-3 px-4">درخواست امانت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {availableBooks.data.map((book: bookType, i: number) => {
              let show = search === "" || (filterText === 0 && book.title.includes(search)) || (filterText === 1 && book.author.includes(search));
              if (!show) return null;
              return (
                <tr key={`book-${i}`} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-4">{book.title}</td>
                  <td className="py-2 px-4">{book.author}</td>
                  <td className="py-2 px-4">{book.category}</td>
                  <td className="py-2 px-4">{book.available_count}</td>
                  <td className="py-2 px-4">
                    <button
                      className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-all text-sm"
                      onClick={() => loanReq(username, book.book_id)}
                    >
                      <CheckIcon className="w-4 h-4" /> امانت
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
