import { getBooks, getLoans } from "@/lib/api";
import { getServerUserData } from "@/lib/auth";
import { AvailableTable, LoanTable } from "./table/member";

export default async function MemberClient() {
    const { username } = await getServerUserData()
    const loanedBooks = await getLoans(username || "")
    const availableBooks = await getBooks("available")
    return(<div className="w-full h-screen">
        <main className="w-full h-full gap-5 pt-5 pb-5 min-h-screen flex flex-col justify-evenly bg-sky-100">
                <div className="bg-slate-50 w-2/3 text-center mx-auto rounded-lg shadow-lg px-4 py-2">
                    <h2 className="font-bold">امانت گرفته شده ها</h2>
                    <LoanTable loanedBooks={loanedBooks}/>
                </div>
            <div className="bg-slate-50 w-2/3 text-center mx-auto rounded-lg shadow-lg px-4 py-2">
                    <h2 className="font-bold">لیست کتاب های کتابخانه</h2>
                    <AvailableTable username={username} availableBooks={availableBooks}/>
            </div>
        </main>
    </div>)
}