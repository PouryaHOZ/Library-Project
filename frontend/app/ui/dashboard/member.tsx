import { getBooks, getLoans } from "@/lib/api";
import { getServerUserData } from "@/lib/auth";
import { AvailableTable, LoanTable } from "./table/member";
import LogoutButton from "./logout";

export default async function MemberClient() {
  const { username } = await getServerUserData();
  const loanedBooks = await getLoans(username || "");
  const availableBooks = await getBooks("available");

  return (
    <div className="w-full min-h-screen bg-sky-100 py-6 px-4 md:px-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 md:gap-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          خوش آمدید، <span className="text-blue-600">{username}</span>
        </h1>
        <LogoutButton />
      </header>

      <main className="flex flex-col md:flex-row gap-8">
        <section className="flex-1 bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 overflow-x-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-slate-800 mb-6">
            امانت گرفته شده‌ها
          </h2>
          <LoanTable loanedBooks={loanedBooks} />
        </section>

        <section className="flex-1 bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 overflow-x-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-slate-800 mb-6">
            لیست کتاب‌های کتابخانه
          </h2>
          <AvailableTable username={username} availableBooks={availableBooks} />
        </section>
      </main>
    </div>
  );
}
