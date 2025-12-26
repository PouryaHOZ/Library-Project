import router from "next/router";

export const login = async (username: string, password: string) => {
    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
}

export const logout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("role")
    router.push('/')
}