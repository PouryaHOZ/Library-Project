'use client'

import { loanProlongReq, loanReq, loanReturnReq } from "@/lib/api";
import { bookType } from "@/lib/placeholder";

export function LoanTable(loanedBooks: any){
    loanedBooks = loanedBooks.loanedBooks
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
                                    <button onClick={()=>loanProlongReq(e.loan_id)}>تمدید؟</button>
                                </td>
                                <td>
                                    <button onClick={()=>loanReturnReq(e.loan_id)}>بازگردانی؟</button>
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
                    {availableBooks.data.map((book:bookType,i:number) => {
                        return (
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
                                    <button onClick={()=>loanReq(username, book.book_id)}>امانت؟</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>);
}