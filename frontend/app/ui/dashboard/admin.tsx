import Link from "next/link";
import { BookList, NewBookField, RequestsTable } from "./table/librarian";
import { getBooks, getRequestList, getUsers } from "@/lib/api";
import { UserList } from "./table/admin";
import LogoutButton from "./logout";

export default async function AdminClient() {
    const requestList = await getRequestList();
    const books = await getBooks("available");
    const users = await getUsers();

    return (
        <div className="w-full min-h-screen bg-sky-100 py-6 px-4 md:px-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                    داشبورد مدیریت
                </h1>
                <LogoutButton />
            </div>

            <div className="flex flex-col gap-8">
                <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-center text-slate-800 mb-4">
                        درخواست ها
                    </h2>
                    <RequestsTable requestList={requestList} />
                </section>

                <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-center text-slate-800 mb-4">
                        افزودن کتاب به کتابخانه
                    </h2>
                    <NewBookField />
                </section>

                <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-center text-slate-800 mb-4">
                        مدیریت کتاب ها
                    </h2>
                    <BookList books={books} />
                </section>

                <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-center text-slate-800 mb-4">
                        مدیریت کاربران
                    </h2>
                    <UserList users={users} />
                </section>
            </div>
        </div>
    );
}
