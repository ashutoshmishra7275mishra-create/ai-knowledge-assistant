import sqlite3

conn = sqlite3.connect("data.db")
cursor = conn.cursor()

rows = cursor.execute("SELECT * FROM chats").fetchall()

for row in rows:
    print(row)

conn.close()
