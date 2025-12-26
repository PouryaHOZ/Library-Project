'use client'

import { loanProlongReq, loanReq, loanReturnReq, setLoanState } from "@/lib/api";
import { stat } from "fs";
import { useState } from "react";

export function RequestsTable({requestList}:{requestList: any}){
    return(<table className="w-1/2">
                <thead>
                    <tr>
                    <th>
                        نام کاربری
                    </th>
                    <th>
                        نام کامل
                    </th>
                    <th>
                        نام کتاب
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
                        تعیین وضعیت
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {requestList.status == "success"? requestList.data.map((ent:any,i:number) => {
                        const [status, setStatus] = useState(ent.status)
                        const checked = {pending: status == "pending",
                            approved: status == "approved",
                            disapproved: status == "disapproved"
                        }
                        const changeStatus = (e:any)=>{
                            setStatus(e.target.value)
                            setLoanState(ent.loan_id, e.target.value)
                        }
                        return (
                            <tr key={`loan-${i}`}>
                                <td>
                                    {ent.username}
                                </td>
                                <td>
                                    {ent.full_name}
                                </td>
                                <td>
                                    {ent.title}
                                </td>
                                <td>
                                    {ent.author}
                                </td>
                                <td>
                                    {ent.category}
                                </td>
                                <td>
                                    {ent.book_amount}
                                </td>
                                <td>
                                    {ent.date}
                                </td>
                                <td>
                                    <label>در انتظار<input type="checkbox" onClick={(e)=>{changeStatus(e)}} value="pending" checked={checked.pending}/></label>
                                    <label>قبول<input type="checkbox" onClick={(e)=>{changeStatus(e)}} value="approved" checked={checked.approved}/></label>
                                    <label>رد<input type="checkbox" onClick={(e)=>{changeStatus(e)}} value="disapproved" checked={checked.disapproved}/></label>
                                </td>
                            </tr>
                        )
                    }): ""}
                </tbody>
            </table>);
}

export function AvailableTable({availableBooks, username}: {availableBooks: any, username: string}){
    availableBooks = availableBooks
    return(<table className="w-1/2">
                <thead>
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
                    {availableBooks.data.map((e:any,i:number) => {
                        return (
                            <tr key={`book-${i}`}>
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
                                    {e.available_count}
                                </td>
                                <td>
                                    <button onClick={()=>loanReq(username, e.id)}>امانت؟</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>);
}