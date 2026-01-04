'use client'
import { logout } from "@/lib/login"

export default function LogoutButton() {
    return (
        <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
        >
            خروج
        </button>)
}