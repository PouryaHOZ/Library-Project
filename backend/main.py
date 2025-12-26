from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# این بخش حیاتی است؛ اجازه می‌دهد Next.js به پایتون وصل شود
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # در حالت تست همه را اجازه می‌دهیم
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Backend is running!"}

@app.get("/test")
def read_root():
    return {"status": "Working!"}