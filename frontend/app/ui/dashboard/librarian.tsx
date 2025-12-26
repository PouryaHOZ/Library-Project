import Link from "next/link";

export default function LibrarianClient(){
    return(<>
        <nav>
            <Link href="./requests">مشاهده و مدیریت درخواست ها</Link>
            <Link href="./books/add">افزودن کتاب</Link>
            <Link href="./books/edit">ویرایش یا حذف کتاب</Link>
        </nav>
    </>)
}