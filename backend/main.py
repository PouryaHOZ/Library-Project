from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from placeholder import LoginRequest
from storage import check_user

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