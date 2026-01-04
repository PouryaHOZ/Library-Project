import { bookType, userCreationType, userType } from "./placeholder";

export async function getLoans(username: string) {
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, type: "user_loans" }),
  });
  return response.json();
}

export async function getBooks(data: string) {
  if (data != "available" && data != "all")
    throw Error("Undefined data type.")
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "get_books", data: "available" }),
  });
  return response.json();
}

export async function getUsers() {
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "get_users" }),
  });
  return response.json();
}

export async function loanProlongReq(loanId: string) {
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loan_id: loanId, type: "loan_req", req: "prolong" }),
  });
  location.replace("/dashboard")
  return response.json();
}

export async function loanReturnReq(loanId: string) {
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loan_id: loanId, type: "loan_req", req: "return" }),
  });
  location.replace("/dashboard")
  return response.json();
}

export async function loanReq(username: string, bookId: number) {
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, book_id: bookId, type: "loan_req", req: "loan" }),
  });
  location.replace("/dashboard")
  return response.json();
}

export async function setLoanState(loanId: number, state: string) {
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loan_id: loanId, type: "loan_req", req: "set_state", data: state }),
  });
  location.replace("/dashboard")
  return response.json();
}

export async function getRequestList() {
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "get_request_list" }),
  });
  return response.json();
}

export async function addBook(details: bookType) {
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "add_book", details }),
  });
  location.replace("/dashboard")
  return response.json();
}

export async function updateBook(data: bookType) {
  console.log(data)
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "update_book", details: data }),
  });
  location.replace("/dashboard")
  return response.json();
}

export async function removeBook(book_id: number) {
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "remove_book", book_id: book_id }),
  });
  location.replace("/dashboard")
  return response.json();
}

export async function changeUserRole(newRole: string, username: string) {
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "user_change_role", details: { new_role: newRole, username: username } }),
  });
  location.replace("/dashboard")
  return response.json();
}

export async function setUserActive(active: boolean, username: string) {
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "user_change_active", details: { active: active, username: username } }),
  });
  location.replace("/dashboard")
  return response.json();
}

export async function removeUser(username: string) {
  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "user_remove", username: username }),
  });
  location.replace("/dashboard")
  return response.json();
}

export async function createUser(details: userCreationType) {

  const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "user_create", details: details }),
  });
  location.replace("/dashboard")
  return response.json();
}