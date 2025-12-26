import Link from "next/link";

export default function AdminClient(){
    return(<>
        <nav>
            <Link href="./requests">مشاهده و مدیریت درخواست ها</Link>
            <Link href="./books/add">افزودن کتاب</Link>
            <Link href="./books/edit">ویرایش یا حذف کتاب</Link>
            <Link href="./users">کاربران</Link>
        </nav>
    </>)
}