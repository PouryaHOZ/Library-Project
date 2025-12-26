import { getAvailableBooks, getLoans } from "@/lib/api";
import { getServerUserData } from "@/lib/auth";
import { AvailableTable, LoanTable } from "./table/member";

export default async function MemberClient() {
    const { username } = await getServerUserData()
    const loanedBooks = await getLoans(username || "")
    const availableBooks = await getAvailableBooks()
    return(<div className="w-full h-screen">
        <header className="flex">
            <input placeholder="کتاب متاب حوس کردی؟" className="w-3/5 h-16 text-2xl p-4"/>
        </header>
        <main>
            <h2>جدول امانت ها</h2>
            <LoanTable loanedBooks={loanedBooks}/>
            <br/>
            <h2>لیست کتاب های موجود</h2>
            <AvailableTable username={username} availableBooks={availableBooks}/>
        </main>
    </div>)
}