import { cookies } from 'next/headers';

export async function getServerUserData() {
    const cookieStore = await cookies();
    return {
        username: cookieStore.get('username')?.value || "",
        role: cookieStore.get('role')?.value || ""
    };
}

