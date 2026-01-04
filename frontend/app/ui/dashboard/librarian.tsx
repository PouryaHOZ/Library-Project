import Link from "next/link";
import { BookList, NewBookField, RequestsTable } from "./table/librarian";
import { getBooks, getRequestList } from "@/lib/api";

export default async function LibrarianClient() {
    const requestList = await getRequestList();
    const books = await getBooks("available");

    return (
        <main className="w-full min-h-screen bg-sky-100 py-6 px-4 md:px-12 flex flex-col gap-8">
            <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 w-full md:w-4/5 mx-auto">
                <h2 className="text-xl md:text-2xl font-semibold text-center text-slate-800 mb-4">
                    درخواست ها
                </h2>
                <RequestsTable requestList={requestList} />
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 w-full md:w-4/5 mx-auto">
                <h2 className="text-xl md:text-2xl font-semibold text-center text-slate-800 mb-4">
                    افزودن کتاب به کتابخانه
                </h2>
                <NewBookField />
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 w-full md:w-4/5 mx-auto">
                <h2 className="text-xl md:text-2xl font-semibold text-center text-slate-800 mb-4">
                    مدیریت کتاب ها
                </h2>
                <BookList books={books} />
            </section>
        </main>
    );
}
