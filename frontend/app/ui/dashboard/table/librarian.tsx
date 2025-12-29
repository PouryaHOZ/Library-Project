'use client'

import { addBook, updateBook, setLoanState, removeBook } from "@/lib/api";
import { BOOK_CATEGORIES, BookCategory, bookType, userType } from "@/lib/placeholder";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

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

export function NewBookField(){
    const [details, setDetails] = useState<bookType>({
        book_id:0,
        title:"",
        author:"",
        category:"رمان",
        available_count:0,
        total_count:0
    })
    return(<table className="w-1/2">
                <thead>
                    <tr>
                    <th>
                        نام کتاب
                    </th>
                    <th>
                        نام نویسنده
                    </th>
                    <th>
                        دسته بندی
                    </th>
                    <th>
                        تعداد موجودی
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input required placeholder="نام کتاب" onChange={(e)=>{setDetails((details) => ({...details,title:e.target.value}))}}/>
                        </td>
                        <td>
                            <input required placeholder="نویسنده" onChange={(e)=>{setDetails((details) => ({...details,author:e.target.value}))}}/>
                        </td>
                        <td>
                        <select name="category" onChange={(e)=>{setDetails((details)=>({...details, category:e.target.value as BookCategory}))}}>
                            {
                            BOOK_CATEGORIES.map((e:string,i)=>{
                                return <option value={e}>{e}</option>
                            })
                            }
                        </select>
                        </td>
                        <td>
                            <input required placeholder="تعداد موجودی" onChange={(e)=>{setDetails((details) => ({...details,available_count:Number(e.target.value)}))}}/>
                        </td>
                        <td>
                            <button onClick={()=>addBook(details)}>افزودن</button>
                        </td>
                    </tr>
                </tbody>
            </table>);
}


export function BookList({books}: {books: any}){
    return(<table className="w-1/2 shadow-2xl p-2 border-2 border-slate-100 text-center">
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
                        تعداد کل
                    </th>
                    <th>
                        ویرایش
                    </th>
                    <th>
                        حذف
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {books.status == "success" ? books.data.map((e:bookType,i:number) => {
                        return <BookRow book={e} key={`book-row-${i}`}/>
                    }):""}
                </tbody>
            </table>);
}

export function BookRow({book}: {book:bookType}){
    const [editState, setEditState] = useState(false)
    const [fieldsState, setFieldsState] = useState<bookType>(book)

    const editSwitch = (state: boolean) =>{
        if(book == fieldsState)
            setEditState(state)
        else{
            const confirmation = window.confirm("آیا میخواهید تغییراتتان ذخیره شود؟");
            if (confirmation == true)
                edit_handle()
            else
                setFieldsState(book)
                setEditState(state)
        }
    }
    const edit_handle = ()=>{
        console.log(fieldsState)
          updateBook(fieldsState);
          setEditState(false)
    }
    
    const removeHandle = ()=>{
        if (book.total_count != book.available_count){
            alert("تعدادی از این کتاب امانت گرفته شده. شما نمیتوانید آن را حذف کنید!")
        } else {

            removeBook(book.book_id)
        }
    }
    return (
        <tr>
            <td className="w-32">
                {editState ? (<input className="input-box" name="title" placeholder="نام کتاب" value={fieldsState.title} onChange={(e)=>{setFieldsState((fieldsState)=>({...fieldsState, title:e.target.value}))}}/>)
                :
                fieldsState.title}
            </td>
            <td className="w-32">
                {editState ? (<input className="input-box" name="author" placeholder="نویسنده" value={fieldsState.author} onChange={(e)=>{setFieldsState((fieldsState)=>({...fieldsState, author:e.target.value}))}}/>)
                :
                fieldsState.author}
            </td>
            <td className="w-32">
                {editState ? (<select className="input-box" name="category" onChange={(e)=>{setFieldsState((fieldsState)=>({...fieldsState, category:e.target.value as BookCategory}))}}>
                    {
                    BOOK_CATEGORIES.map((e:string,i)=>{
                        return <option selected={e == book.category? true : false} value={e}>{e}</option>
                    })
                    }
                </select>)
                :
                fieldsState.category}
            </td>
            <td className="w-32">
                {editState ? (<input className="input-box" name="number" placeholder="تعداد کل" value={fieldsState.total_count}
                onChange={(e)=>{
                    (Number(e.target.value) - book.available_count) >= 0 ?
                    setFieldsState((fieldsState)=>({...fieldsState, total_count:Number(e.target.value),
                        available_count: fieldsState.available_count - fieldsState.total_count + Number(e.target.value)}))
                    :
                    alert("تعداد کل نمی تواند کمتر از تعداد امانات باشد!")
                    }}/>)
                :
                fieldsState.total_count}
            </td>
            <td>
                <PencilIcon className="size-8 mx-auto" onClick={()=>editState?editSwitch(false):editSwitch(true)}/>
            </td>
            <td>
                <TrashIcon className="size-8 mx-auto" onClick={()=>removeHandle()}/>
            </td>
        </tr>
    )
}