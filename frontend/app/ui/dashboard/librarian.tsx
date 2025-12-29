import Link from "next/link";
import { BookList, NewBookField, RequestsTable } from "./table/librarian";
import { getBooks, getRequestList } from "@/lib/api";

export default async function LibrarianClient(){
    const requestList = await getRequestList()
    const books = await getBooks("available")
    return(<>
            <main className="w-full h-full gap-5 pt-5 pb-5 min-h-screen flex flex-col justify-evenly bg-sky-100">
                <div className="bg-slate-50 w-2/3 text-center mx-auto rounded-lg shadow-lg px-4 py-2">
                    <h2 className="font-bold">درخواست ها!</h2>
                    <RequestsTable requestList={requestList}/>
                </div>
                <div className="bg-slate-50 w-2/3 text-center mx-auto rounded-lg shadow-lg px-4 py-2">
                    <h2 className="font-bold">افزودن کتاب به کتابخانه</h2>
                    <NewBookField/>
                </div>
                <div className="bg-slate-50 w-2/3 text-center mx-auto rounded-lg shadow-lg px-4 py-2">
                    <h2 className="font-bold">مدیریت کتاب ها</h2>
                    <BookList books={books}/>
                </div>
            </main>
    </>)
}