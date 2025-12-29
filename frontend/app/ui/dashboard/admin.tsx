import Link from "next/link";
import { BookList, NewBookField, RequestsTable } from "./table/librarian";
import { getBooks, getRequestList, getUsers } from "@/lib/api";
import { UserList } from "./table/admin";

export default async function AdminClient(){
    const requestList = await getRequestList()
    const books = await getBooks("available")
    const users = await getUsers()
    return(<>
            <main>
                <h2>درخواست ها!</h2>
                <RequestsTable requestList={requestList}/>
                <br/>
                <h2>افزودن کتاب به کتابخانه</h2>
                <NewBookField/>
                <h2>مدیریت کتاب ها</h2>
                <BookList books={books}/>
                <h2>مدیریت کاربران</h2>
                <UserList users={users}/>
            </main>
    </>)
}