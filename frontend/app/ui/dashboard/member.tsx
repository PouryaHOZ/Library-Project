import Link from "next/link";

export default function MemberClient() {
    return(<>
    <nav>
        <Link href="./search">جستجوی کتاب</Link>
        <Link href="./loan">درخواست امانت</Link>
        <Link href="./list">لیست کتاب های گرفته شده</Link>
        <Link href="./extend">درخواست تمدید</Link>
        <Link href="./return">درخواست بازگشت</Link>
    </nav>
    </>)
}