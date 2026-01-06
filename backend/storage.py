from datetime import datetime, timedelta
import hashlib
import json
import uuid


#Get JSON
def get_database(file_name:str):
    with open(f'storage/{file_name}', 'r', encoding='utf-8') as f:
        db = json.load(f)

        if db:
            db_filtered = list(filter(lambda row: row['is_removed'] == False, db))
            return db_filtered
        return {}
    
def get_users():
    return get_database("users.json")

def get_loans():
    return get_database("loans.json")

def get_books():
    return get_database("books.json")

def get_reqs():
    return get_database("reqs.json")

#Dump JSON
def dump_database(file_name: str, data):
    with open(f'storage/{file_name}', 'w', encoding='utf-8') as f:
        return json.dump(data, f, ensure_ascii=False, indent=2)
    
def dump_users(data):
    return dump_database("users.json", data)

def dump_loans(data):
    return dump_database("loans.json", data)

def dump_books(data):
    return dump_database("books.json", data)

def dump_reqs(data):
    return dump_database("reqs.json", data)

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
    return dump_users(users)

def user_change_active(active: bool, username: str):
    users = get_users()
    updated_users = []
    for user in users:
        if user['username'] == username:
            user["is_active"] = active
        updated_users.append(user)
    return dump_users(users)
    
def user_remove(username):
    users = get_users()
    updated_users = []
    for user in users:
        if user['username'] == username:
            user["is_removed"] = True
        updated_users.append(user)
    
    return dump_users(updated_users)

def user_create(data):
    users = get_users()
    if (get_user_by_username(data['username']) != None):
        return 0
        
    users.append({
        "username": data['username'],
        "password": data['password'],
        "full_name": data['full_name'],
        "role": data['role'],
        "is_removed": False,
        "is_active": data['is_active']
    })
    
    return dump_users(users)


#Book related functions
def get_available_books():
    books = get_books()
    return [
        book
        for book in books
        if book['available_count'] > 0
    ]

def get_book_by_id(book_id):
    books = get_books()
    for book in books:
        if book['book_id'] == book_id:
            return book
    return None

def add_book(details):
    books = get_books()
    new_book = {
        "book_id": str(uuid.uuid4()),
        "title": details['title'],
        "author": details['author'],
        "category": details["category"],
        "total_count": details["available_count"],        
        "available_count": details["available_count"],
        "is_removed": False
    }
    books.append(new_book)
    
    return dump_books(books)

def remove_book(book_id):
    books = get_books()
    updated_books = []

    for book in books:
        if book["book_id"] == book_id:
            book["is_removed"] = True
            print(book)
        updated_books.append(book)
    
    return dump_books(updated_books)

def update_book(update):
    books = get_books()
    updated_books = []
    for book in books:
        if book['book_id'] == update["book_id"]:
            book = update
        updated_books.append(book)
    return dump_books(updated_books)
        

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

def req_loan(username, bookId):
    reqs = get_reqs()
    books = get_books()
    new_req = {
        "req_id": str(uuid.uuid4()),
        "username": username,
        "book_id": bookId,
        "book_amount": 1,
        "rention_date": datetime.now().strftime("%Y-%m-%d"),
        "return_date": (datetime.now() +timedelta(weeks=1)).strftime("%Y-%m-%d"),
        "status": "pending",
        "is_removed": False
    }
    reqs.append(new_req)
    
    new_books = []
    for book in books:
        if book["book_id"] == bookId:
            book["available_count"] -= 1
        new_books.append(book)

    dump_reqs(reqs)
    dump_books(new_books)

def loan_return(loan_id):
    loans = get_loans()
    books = get_books()
    
    new_loans = []
    book_id = ""
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

def get_loan_by_id(loan_id):
    loans = get_loans()
    for loan in loans:
        if loan["loan_id"] == loan_id:
            return loan
    return None

def get_request_list():
    loan_reqs = get_reqs()
    request_list = []
    
    for req in loan_reqs:
        if req["request"] == "rention":
            book = get_book_by_id(req["book_id"])
            user = get_user_by_username(req["username"])
            if book and user:
                request_list.append(book | user | req)
                
        elif req["request"] == "return":
            loan = get_loan_by_id(req["loan_id"])
            book = get_book_by_id(loan["book_id"])
            user = get_user_by_username(loan["username"])
            if book and user and loan:
                request_list.append(book | user | loan | req)

    if len(request_list) > 0:
        return request_list
    return False

def req_change_status(req, loan_reqs, new_status):
    req["status"] = new_status
    new_loan_reqs = []

    for loan_req in loan_reqs:
        if loan_req["req_id"] == req["req_id"]:
            loan_req = req
        new_loan_reqs.append(loan_req)

    return dump_reqs(new_loan_reqs)


def req_application(req_id):
    loan_reqs = get_reqs()
    req = {}

    for loan_req in loan_reqs:
        if loan_req["req_id"] == req_id:
            loan_req = req
    
    if req["request"] == "rention": #Rention request
        if req["status"] == "approved": 
            new_loan = {
                "loan_id": str(uuid.uuid4()),
                "username": req["username"],
                "book_id": req["book_id"],
                "book_amount": 1,
                "rention_date": datetime.now().strftime("%Y-%m-%d"),
                "return_date": (datetime.now() +timedelta(weeks=1)).strftime("%Y-%m-%d"),
                "status": "approved",
                "is_removed": False
            }
            loans = get_loans()
            loans.append(new_loan)
            dump_loans(loans)
            return req_change_status(req, loan_reqs, "approved")
        else:
            books = get_books()
            for book in books:
                if book["book_id"] == req["book_id"]:
                    book["available_count"] += 1
            dump_books(books)

            return req_change_status(req, loan_reqs, "disapproved")
            
    elif req["request"] == "return": #Return request
        if req["status"] == "approved":
            loan_return(req["loan_id"])
            return req_change_status(req, loan_reqs, "approved")
        else:
            return req_change_status(req, loan_reqs, "disapproved")
        
    elif req["request"] == "prolong": #Prolong request
        if req["status"] == "approved":
            loan = get_loan_by_id(req["loan_id"])
            loan["return_date"] = (datetime.now() +timedelta(weeks=1)).strftime("%Y-%m-%d")
            dump_loans(loan)
            return req_change_status(req, loan_reqs, "approved")
        else:
            return req_change_status(req, loan_reqs, "disapproved")

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