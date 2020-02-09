import sqlite3
import json

DB_NAME = 'vocab.db'
STTMT = {
    "DDL": {
        "CREATE_VIEW_WORD": 
            'CREATE VIEW UNIQUE_ENGLISH_WORD\
	            AS SELECT word_key, book_key, usage, timestamp\
		                FROM LOOKUPS\
	                WHERE word_key LIKE "en:%"\
	                GROUP BY word_key;',
        "DROP_VIEW_WORD":
            'DROP VIEW IF EXISTS UNIQUE_ENGLISH_WORD',
    },
    "DML": {
        "SELECT_WORD": 'SELECT * FROM UNIQUE_ENGLISH_WORD',
        "SELECT_BOOK": 'SELECT id, title, authors FROM BOOK_INFO WHERE lang = "en"',
    }}
# Manipulate Dictionary
def addDictionary(accumlator, row):
    l = list()
    for i, v in enumerate(row.keys()):
        l.append((v, row[i]))
    from collections import OrderedDict
    accumlator[l[0][1]] = dict(l)
    return None
#
look_ups = {}
books = {}
conn = sqlite3.connect(DB_NAME)
conn.row_factory = sqlite3.Row
c = conn.cursor()
c.execute(STTMT["DDL"]["DROP_VIEW_WORD"])
c.execute(STTMT["DDL"]["CREATE_VIEW_WORD"])
c.execute(STTMT["DML"]["SELECT_WORD"])
rows = c.fetchall()
for row in rows:
    addDictionary(look_ups, row)
c.execute(STTMT["DML"]["SELECT_BOOK"])
rows_books = c.fetchall()
for row_book in rows_books:
    addDictionary(books, row_book)
f1 = open("look_ups.json", "w")
json.dump(look_ups, f1, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))
f1.close()
f2 = open("books.json", "w")
json.dump(books, f2, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))
f2.close()
#
conn.close()
#
#
# Check the document:
#   11.13. sqlite3 — DB-API 2.0 interface for SQLite databases — Python 2.7.17 documentation:
#       https://docs.python.org/2/library/sqlite3.html
#
# Create View:
#   We cannnot use placefolder with a create view statement.
#