from datetime import datetime, timedelta
import hashlib
import json


#Get JSON
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


#Dump JSON
def dump_users(data):
    with open('storage/users.json', 'w', encoding='utf-8') as f:
        return json.dump(data, f, ensure_ascii=False, indent=2)

def dump_loans(data):
    with open('storage/loans.json', 'w', encoding='utf-8') as f:
        return json.dump(data, f, ensure_ascii=False, indent=2)

def dump_books(data):
    with open('storage/books.json', 'w', encoding='utf-8') as f:
        return json.dump(data, f, ensure_ascii=False, indent=2)


#User related functions
def check_user(username: str, password: str):
    users = get_users()
    for user in users:
        if user['username'] == username and password == user['password']:
            return user
    return None

def get_user_by_username(username):
    users = get_users()
    for user in users:
        if user['username'] == username:
            return user
    return None

def user_change_role(new_role: str, username: str):
    users = get_users()
    updated_users = []
    for user in users:
        if user['username'] == username:
            user["role"] = new_role
        updated_users.append(user)
    return user
    


#Book related functions
def get_available_books():
    books = get_books()
    return [
        book
        for book in books
        if book['available_count'] > 0
    ]

def get_book_by_id(id):
    books = get_books()
    for book in books:
        if book['book_id'] == id:
            return book
    return None

def add_book(details):
    books = get_books()
    new_book = {
        "book_id": books[-1]["book_id"]+1,
        "title": details['title'],
        "author": details['author'],
        "category": details["category"],
        "total_count": details["available_count"],        
        "available_count": details["available_count"],        
    }
    books.append(new_book)
    
    return dump_books(books)

def remove_book(book_id):
    books = get_books()
    updated_books = []

    for book in books:
        if book["book_id"] != book_id:
            updated_books.append(book)
    
    return dump_books(updated_books)

def update_book(update):
    books = get_books()
    updated_books = []
    for book in books:
        if book['book_id'] == update["book_id"]:
            book = update
        updated_books.append(book)
    return True
        

#Loan related functions
def get_user_loans(username: str):
    loans = get_loans()
    loans_list = []
    for loan in loans:
        if loan['username'] == username:
            book_info = get_book_by_id(loan["book_id"])
            if book_info is None:
                continue
            loans_list.append(loan | book_info)
    
    if len(loans_list) == 0:
        return None
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
        "rention_date": datetime.now().strftime("%Y-%m-%d"),
        "return_date": (datetime.now() +timedelta(weeks=1)).strftime("%Y-%m-%d"),
        "status": "pending"
    }
    loans.append(new_loan)
    
    new_books = []
    for book in books:
        if book["book_id"] == bookId:
            book["available_count"] -= 1
        new_books.append(book)

    dump_loans(loans)
    dump_books(new_books)

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
        if book["book_id"] == book_id:
            book["available_count"] += 1
        new_books.append(book)

    dump_books(new_books)
    dump_loans(new_loans)

def get_request_list():
    loans = get_loans()
    request_list = []
    for loan in loans:
        if loan["status"] == "pending":
            book = get_book_by_id(loan["book_id"])
            user = get_user_by_username(loan["username"])
            if type(book) == dict and type(user) == dict:
                request_list.append(book | user | loan)

    if len(request_list) > 0:
        return request_list
    return False

def set_loan_state(loan_id, data):
    loans = get_loans()
    books = get_books()
    new_books = []
    
    i = 0
    for loan in loans:
        if loan["loan_id"] == loan_id:
            if data == "disapproved":
                loans.pop(i)
                for book in books:
                    if book["book_id"] == loan["book_id"]:
                        book["available_count"] += 1
                    new_books.append(book)
            else:
                    loans[i]["status"] = data
        i += 1

    dump_loans(loans)
    dump_books(new_books)