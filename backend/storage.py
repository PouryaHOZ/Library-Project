from datetime import datetime
import hashlib
import json


def get_users():
    with open('storage/users.json', 'r', encoding='utf-8') as f:
        users = json.load(f)
    return users

def get_loans():
    with open('storage/loans.json', 'r', encoding='utf-8') as f:
        loans = json.load(f)
    return loans

def get_books():
    with open('storage/books.json', 'r', encoding='utf-8') as f:
        books = json.load(f)
    return books

def get_available_books():
    books = get_books()
    return [
        book
        for book in books
        if book['available_count'] > 0
    ]

def check_user(username: str, password: str):
    users = get_users()
    for user in users:
        if user['username'] == username and password == user['password']:
            return user
    return False

def get_book_by_id(id):
    books = get_books()
    for book in books:
        if book['id'] == id:
            return book
    return False

def get_user_by_username(username):
    users = get_users()
    for user in users:
        if user['username'] == username:
            return user
    return False

def get_user_loans(username: str):
    loans = get_loans()
    loans_list = []
    for loan in loans:
        if loan['username'] == username:
            book_info = get_book_by_id(loan["book_id"])
            loans_list.append(loan | book_info)
    
    if len(loans_list) == 0:
        return False
    else:
        return loans_list
    
def add_loan(username, bookId):
    loans = get_loans()
    books = get_books()
    new_loan = {
        "loan_id": loans[-1]["loan_id"]+1,
        "username": username,
        "book_id": bookId,
        "book_amount": 1,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "status": "pending"
    }
    loans.append(new_loan)
    
    new_books = []
    for book in books:
        if book["id"] == bookId:
            book["available_count"] -= 1
        new_books.append(book)

    with open('storage/loans.json', 'w', encoding='utf-8') as f:
        json.dump(loans, f, ensure_ascii=False, indent=2)
    with open('storage/books.json', 'w', encoding='utf-8') as f:
        json.dump(new_books, f, ensure_ascii=False, indent=2)

def loan_return(loan_id):
    loans = get_loans()
    books = get_books()
    
    new_loans = []
    book_id = 0
    for loan in loans:
        if loan["loan_id"] != loan_id:
            new_loans.append(loan)
        else:
            book_id = loan["book_id"]
    
    new_books = []
    for book in books:
        if book["id"] == book_id:
            book["available_count"] += 1
        new_books.append(book)

    with open('storage/loans.json', 'w', encoding='utf-8') as f:
        json.dump(new_loans, f, ensure_ascii=False, indent=2)
    with open('storage/books.json', 'w', encoding='utf-8') as f:
        json.dump(new_books, f, ensure_ascii=False, indent=2)

def get_request_list():
    loans = get_loans()
    request_list = []
    for loan in loans:
        book = get_book_by_id(loan["book_id"])
        user = get_user_by_username(loan["username"])
        request_list.append(book | user | loan)

    if len(request_list) > 0:
        return request_list
    return False

def set_loan_state(loan_id, data):
    loans = get_loans()
    
    i = 0
    for loan in loans:
        if loan["loan_id"] == loan_id:
            loans[i]["status"] = data
        i += 1

    with open('storage/loans.json', 'w', encoding='utf-8') as f:
        json.dump(loans, f, ensure_ascii=False, indent=2)

def add_book(details):
    books = get_books()
    new_book = {
        "id": books[-1]["id"]+1,
        "title": details.title,
        "author": details.author,
        "category": details.category,
        "total_count": details.available_count,        
        "available_count": details.available_count,        
    }
    books.append(new_book)

    return(new_book)