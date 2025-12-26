from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.storage import check_user

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

@app.post("/login")
def login(username: str, password: str):
    if check_user(username, password):
        return {"status": "Login successful!", "message": "Welcome to the library system!"}
    else:
        return {"status": "Login failed!", "message": "Invalid username or password!"}