import Link from "next/link";
import { BookList, NewBookField, RequestsTable } from "./table/librarian";
import { getBooks, getRequestList } from "@/lib/api";

export default async function LibrarianClient(){
    const requestList = await getRequestList()
    const books = await getBooks("available")
    return(<>
            <main>
                <h2>درخواست ها!</h2>
                <RequestsTable requestList={requestList}/>
                <br/>
                <h2>افزودن کتاب به کتابخانه</h2>
                <NewBookField/>
                <h2>مدیریت کتاب ها</h2>
                <BookList books={books}/>
            </main>
    </>)
}