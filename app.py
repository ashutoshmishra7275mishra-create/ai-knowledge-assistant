import sqlite3
import os
import shutil

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from utils.pdf_loader import load_pdf
from rag.embedder import get_embeddings
from db.vector_store import create_store

# ================= DATABASE =================
conn = sqlite3.connect("data.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT,
    answer TEXT
)
""")
conn.commit()

# ================= APP =================
app = FastAPI(title="AI Knowledge Assistant (RAG - Local)")

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= GLOBAL VECTOR STORE =================
vector_store = None

# ================= ROOT =================
@app.get("/")
def root():
    return {
        "status": "Backend running successfully 🚀",
        "mode": "Fully Local RAG (No OpenAI, No API Key)",
        "endpoints": ["/upload-pdf", "/ask"]
    }

# ================= UPLOAD PDF =================
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    global vector_store

    temp_path = f"temp_{file.filename}"

    # Save file temporarily
    with open(temp_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # Load PDF text
    docs = load_pdf(temp_path)

    # ✅ SAFETY CHECK (MOST IMPORTANT)
    if not docs or len(docs) == 0:
        os.remove(temp_path)
        return {
            "error": "No readable text found in PDF. Please upload a text-based PDF."
        }

    # Create embeddings + FAISS
    embeddings = get_embeddings()
    vector_store = create_store(docs, embeddings)

    # Cleanup
    os.remove(temp_path)

    return {"message": "PDF uploaded and indexed successfully"}

# ================= ASK QUESTION =================
@app.get("/ask")
def ask(q: str):
    if vector_store is None:
        return {"answer": "Please upload a PDF first"}

    docs = vector_store.similarity_search(q, k=3)

    if not docs:
        return {"answer": "No relevant information found in the document."}

    # ✅ Extractive Answer (SAFE)
    answer = "\n\n".join(
        [d.page_content.strip() for d in docs if d.page_content.strip()]
    )[:800]

    if not answer:
        answer = "Answer not found in the document."

    # Save to DB
    cursor.execute(
        "INSERT INTO chats (question, answer) VALUES (?, ?)",
        (q, answer)
    )
    conn.commit()

    return {"answer": answer}
