import Link from "next/link";
import { NewBookField, RequestsTable } from "./table/librarian";
import { getRequestList } from "@/lib/api";

export default async function AdminClient(){
    const requestList = await getRequestList()
    return(<>
            <main>
                <h2>درخواست ها!</h2>
                <RequestsTable requestList={requestList}/>
                <br/>
                <h2>افزودن کتاب به کتابخانه</h2>
                <NewBookField/>
            </main>
        <nav>
            <Link href="./books/edit">ویرایش یا حذف کتاب</Link>
            <Link href="./users">کاربران</Link>
        </nav>
    </>)
}