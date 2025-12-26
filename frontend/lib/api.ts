export async function getLoans(username: string){
    const response = await fetch('http://localhost:8000/api', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, type: "user_loans" }),
    });
    return response.json();
}

export async function getAvailableBooks(){
    const response = await fetch('http://localhost:8000/api', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({type: "get_available_books" }),
    });
    return response.json();
}

export async function loanProlongReq(loanId: string){
    const response = await fetch('http://localhost:8000/api', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loan_id: loanId, type: "loan_req" , req: "prolong"}),
    });
    location.replace("/dashboard")
    return response.json();
}

export async function loanReturnReq(loanId: string){
    const response = await fetch('http://localhost:8000/api', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loan_id: loanId, type: "loan_req" , req: "return"}),
    });
    location.replace("/dashboard")
    return response.json();
}

export async function loanReq(username: string, bookId: number){
    const response = await fetch('http://localhost:8000/api', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, book_id: bookId, type: "loan_req" , req: "loan"}),
    });
    location.replace("/dashboard")
    return response.json();
}