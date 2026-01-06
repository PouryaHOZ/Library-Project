'use client'

import { addBook, updateBook, setLoanState, removeBook } from "@/lib/api";
import { BOOK_CATEGORIES, BookCategory, bookType, loanRequestType } from "@/lib/placeholder";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function RequestsTable({ requestList }: { requestList: any }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
      <table className="min-w-full text-center divide-y divide-slate-200">
        <thead className="bg-slate-100 text-slate-700 font-semibold">
          <tr>
            <th className="py-2 px-4">نام کاربری</th>
            <th className="py-2 px-4">نام کامل</th>
            <th className="py-2 px-4">نوع درخواست</th>
            <th className="py-2 px-4">نام کتاب</th>
            <th className="py-2 px-4">نویسنده</th>
            <th className="py-2 px-4">موضوع</th>
            <th className="py-2 px-4">تعداد درخواست شده</th>
            <th className="py-2 px-4">تاریخ درخواست</th>
            <th className="py-2 px-4">تعیین وضعیت</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {requestList.status === "success" &&
            requestList.data.map((ent: any, i: number) => {
              const [status, setStatus] = useState(ent.status);
              const checked = {
                pending: status === "pending",
                approved: status === "approved",
                disapproved: status === "disapproved",
              };
              const changeStatus = (e: any) => {
                setStatus(e.target.value);
                setLoanState(ent.loan_id, e.target.value);
              };
              const request_to_persian = {
                "return": "بازگرداندن",
                "rention": "امانت گرفتن",
                "prolong": "تمدید کردن"
              }
              return (
                <tr key={`loan-${i}`} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-4">{ent.username}</td>
                  <td className="py-2 px-4">{ent.full_name}</td>
                  <td className="py-2 px-4">{request_to_persian[ent.request as loanRequestType]}</td>
                  <td className="py-2 px-4">{ent.title}</td>
                  <td className="py-2 px-4">{ent.author}</td>
                  <td className="py-2 px-4">{ent.category}</td>
                  <td className="py-2 px-4">{ent.book_amount}</td>
                  <td className="py-2 px-4">{ent.date}</td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    <label className="flex items-center gap-1">
                      <input type="checkbox" value="pending" checked={checked.pending} onChange={changeStatus} /> در انتظار
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="checkbox" value="approved" checked={checked.approved} onChange={changeStatus} /> قبول
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="checkbox" value="disapproved" checked={checked.disapproved} onChange={changeStatus} /> رد
                    </label>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export function NewBookField() {
  const [details, setDetails] = useState<bookType>({
    book_id: "",
    title: "",
    author: "",
    category: "رمان",
    available_count: 0,
    total_count: 0,
  });

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white p-4">
      <table className="min-w-full text-center divide-y divide-slate-200">
        <thead className="bg-slate-100 text-slate-700 font-semibold">
          <tr>
            <th className="py-2 px-4">نام کتاب</th>
            <th className="py-2 px-4">نام نویسنده</th>
            <th className="py-2 px-4">دسته بندی</th>
            <th className="py-2 px-4">تعداد موجودی</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-slate-50 transition-colors">
            <td>
              <input required placeholder="نام کتاب" className="input-box w-full" onChange={(e) => setDetails(d => ({ ...d, title: e.target.value }))} />
            </td>
            <td>
              <input required placeholder="نویسنده" className="input-box w-full" onChange={(e) => setDetails(d => ({ ...d, author: e.target.value }))} />
            </td>
            <td>
              <select className="input-box w-full" onChange={(e) => setDetails(d => ({ ...d, category: e.target.value as BookCategory }))}>
                {BOOK_CATEGORIES.map((e, i) => <option key={i} value={e}>{e}</option>)}
              </select>
            </td>
            <td>
              <input required type="number" placeholder="تعداد موجودی" className="input-box w-full" onChange={(e) => setDetails(d => ({ ...d, available_count: Number(e.target.value) }))} />
            </td>
            <td>
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 transition-colors" onClick={() => addBook(details)}>افزودن</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function BookList({ books }: { books: any }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
      <table className="min-w-full text-center divide-y divide-slate-200">
        <thead className="bg-slate-100 text-slate-700 font-semibold">
          <tr>
            <th className="py-2 px-4">نام</th>
            <th className="py-2 px-4">نویسنده</th>
            <th className="py-2 px-4">موضوع</th>
            <th className="py-2 px-4">تعداد کل</th>
            <th className="py-2 px-4">ویرایش</th>
            <th className="py-2 px-4">حذف</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {books.status === "success" && books.data.map((e: bookType, i: number) => <BookRow key={i} book={e} />)}
        </tbody>
      </table>
    </div>
  );
}

export function BookRow({ book }: { book: bookType }) {
  const [editState, setEditState] = useState(false);
  const [fieldsState, setFieldsState] = useState<bookType>(book);

  const editSwitch = (state: boolean) => {
    if (book === fieldsState) setEditState(state);
    else {
      const confirmation = window.confirm("آیا میخواهید تغییراتتان ذخیره شود؟");
      if (confirmation) edit_handle();
      else setFieldsState(book);
      setEditState(state);
    }
  };

  const edit_handle = () => {
    updateBook(fieldsState);
    setEditState(false);
  };

  const removeHandle = () => {
    if (book.total_count !== book.available_count) alert("تعدادی از این کتاب امانت گرفته شده. شما نمی‌توانید آن را حذف کنید!");
    else removeBook(book.book_id);
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="py-2 px-4">{editState ? <input className="input-box w-full" value={fieldsState.title} onChange={e => setFieldsState(f => ({ ...f, title: e.target.value }))} /> : fieldsState.title}</td>
      <td className="py-2 px-4">{editState ? <input className="input-box w-full" value={fieldsState.author} onChange={e => setFieldsState(f => ({ ...f, author: e.target.value }))} /> : fieldsState.author}</td>
      <td className="py-2 px-4">{editState ? <select className="input-box w-full" value={fieldsState.category} onChange={e => setFieldsState(f => ({ ...f, category: e.target.value as BookCategory }))}>{BOOK_CATEGORIES.map((c, i) => <option key={i} value={c}>{c}</option>)}</select> : fieldsState.category}</td>
      <td className="py-2 px-4">{editState ? <input type="number" className="input-box w-full" value={fieldsState.total_count} onChange={e => {
        const newTotal = Number(e.target.value);
        if (book.total_count + book.available_count - newTotal >= 0) setFieldsState(f => ({ ...f, total_count: newTotal, available_count: f.available_count - f.total_count + newTotal }));
        else alert("تعداد کل نمی تواند کمتر از تعداد امانات باشد!");
      }} /> : fieldsState.total_count}</td>
      <td className="py-2 px-4"><PencilIcon className="w-5 h-5 mx-auto cursor-pointer text-slate-600 hover:text-blue-500 transition-colors" onClick={() => editState ? editSwitch(false) : editSwitch(true)} /></td>
      <td className="py-2 px-4"><TrashIcon className="w-5 h-5 mx-auto cursor-pointer text-slate-600 hover:text-red-500 transition-colors" onClick={removeHandle} /></td>
    </tr>
  );
}
