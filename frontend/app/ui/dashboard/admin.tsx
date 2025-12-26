import Link from "next/link";
import { RequestsTable } from "./table/librarian";
import { getRequestList } from "@/lib/api";

export default async function AdminClient(){
    const requestList = await getRequestList()
    return(<>
            <main>
                <h2>درخواست ها!</h2>
                <RequestsTable requestList={requestList}/>
            </main>
        <nav>
            <Link href="./books/add">افزودن کتاب</Link>
            <Link href="./books/edit">ویرایش یا حذف کتاب</Link>
            <Link href="./users">کاربران</Link>
        </nav>
    </>)
}