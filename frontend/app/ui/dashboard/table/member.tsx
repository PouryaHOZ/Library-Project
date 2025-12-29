'use client'

import { loanProlongReq, loanReq, loanReturnReq } from "@/lib/api";
import { bookType } from "@/lib/placeholder";
import { useState } from "react";

export function LoanTable(loanedBooks: any){
    loanedBooks = loanedBooks.loanedBooks
    return(<table className="w-full p-2 bg-slate-50 text-center">
                <thead className="bg-slate-200 text-slate-500">
                    <tr>
                    <th>
                        نام
                    </th>
                    <th>
                        نویسنده
                    </th>
                    <th>
                        موضوع
                    </th>
                    <th>
                        تعداد درخواست شده
                    </th>
                    <th>
                        تاریخ درخواست
                    </th>
                    <th>
                        مهلت امانت
                    </th>
                    <th>
                        وضعیت
                    </th>
                    <th>
                        درخواست تمدید
                    </th>
                    <th>
                        درخواست بازگردانی
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {loanedBooks.status == "success"? loanedBooks.data.map((e:any,i:number) => {
                        return (
                            <tr key={`loan-${i}`}>
                                <td>
                                    {e.title}
                                </td>
                                <td>
                                    {e.author}
                                </td>
                                <td>
                                    {e.category}
                                </td>
                                <td>
                                    {e.book_amount}
                                </td>
                                <td>
                                    {e.rention_date}
                                </td>
                                <td>
                                    {e.return_date}
                                </td>
                                <td>
                                    {e.status}
                                </td>
                                <td>
                                    <button className="bg-slate-500 rounded-lg text-slate-100 px-2 py-1" onClick={()=>loanProlongReq(e.loan_id)}>تمدید؟</button>
                                </td>
                                <td>
                                    <button className="bg-slate-500 rounded-lg text-slate-100 px-2 py-1" onClick={()=>loanReturnReq(e.loan_id)}>بازگردانی؟</button>
                                </td>
                            </tr>
                        )
                    }): ""}
                </tbody>
            </table>);
}

export function AvailableTable({availableBooks, username}: {availableBooks: any, username: string}){
    const [search, setSearch] = useState("")
    const [filterText, setFilerText] = useState(0)
    return(<>
    <div className="flex gap-5 justify-center items-baseline">
        <input placeholder="کتاب چی هوس کردی؟"
                onChange={(e)=>{setSearch(e.target.value)}}
                className="mb-2 border-2 border-slate-200 rounded-2xl py-1 px-2"/>

        <label>براساس:<select
                                onChange={(e)=>{setFilerText(Number(e.target.value))}}>
            <option value={0}>نام کتاب</option>
            <option value={1}>نام نویسنده</option>
        </select></label>
        
    </div>
                <table className="w-full p-2 bg-slate-50 text-center">
                <thead className="bg-slate-200 text-slate-500">
                    <tr>
                    <th>
                        نام
                    </th>
                    <th>
                        نویسنده
                    </th>
                    <th>
                        موضوع
                    </th>
                    <th>
                        تعداد موجود
                    </th>
                    <th>
                        درخواست امانت
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {availableBooks.data.map((book:bookType,i:number) => {
                        let show = false

                        if (search != ""){
                            if (filterText == 0 && book.title.includes(search)){
                                show = true
                            }
                            else if (filterText == 1 && book.author.includes(search)){
                                show = true
                            }
                        }
                        else show = true

                        if (show) return (
                            <tr key={`book-${i}`}>
                                <td>
                                    {book.title}
                                </td>
                                <td>
                                    {book.author}
                                </td>
                                <td>
                                    {book.category}
                                </td>
                                <td>
                                    {book.available_count}
                                </td>
                                <td>
                                    <button className="bg-slate-500 rounded-lg text-slate-100 px-2 py-1"  onClick={()=>loanReq(username, book.book_id)}>امانت؟</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table></>);
}