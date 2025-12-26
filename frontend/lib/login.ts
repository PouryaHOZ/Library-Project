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
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/"
}