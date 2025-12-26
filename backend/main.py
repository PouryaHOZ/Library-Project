from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from placeholder import FetchRequest, LoginRequest
from storage import add_loan, check_user, get_available_books, get_request_list, get_user_loans, loan_return, set_loan_state

app = FastAPI()
# Adding premissions for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Backend is running!"}

@app.api_route("/login", methods=["GET", "POST"])
def login(data:LoginRequest):
    user_check = check_user(data.username, data.password)
    if user_check:
        return {"status": "success", "user": user_check}
    else:
        return {"status": "failure"}
    
@app.post("/api")
def api(data:FetchRequest):

    if data.type == "user_loans":
        user_loans = get_user_loans(data.username)
        if user_loans:
            return {"status": "success", "data": user_loans}
        else:
            return {"status": "failure"}
        
    elif data.type == "get_available_books":
        available_books = get_available_books()
        if len(available_books) > 0:
            return {"status": "success", "data": available_books}
        else:
            return {"status": "failure"}
        
    elif data.type == "loan_req":
        if data.req == "return":
            loan_return(data.loan_id)
        elif data.req == "loan":
            add_loan(data.username, data.book_id)
        elif data.req == "set_state":
            set_loan_state(data.loan_id, data.data)
    
    elif data.type == "get_request_list":
        request_list = get_request_list()
        if request_list:
            return {"status": "success", "data": request_list}
        else:
            return {"status": "failure"}
