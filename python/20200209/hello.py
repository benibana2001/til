import sqlite3
import json
#
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
look_ups = {}
books = {}
conn = sqlite3.connect(DB_NAME)
conn.row_factory = sqlite3.Row
c = conn.cursor()
# Fetch word
c.execute(STTMT["DDL"]["DROP_VIEW_WORD"])
c.execute(STTMT["DDL"]["CREATE_VIEW_WORD"])
c.execute(STTMT["DML"]["SELECT_WORD"])
rows_word = c.fetchall()
# Fetch books
c.execute(STTMT["DML"]["SELECT_BOOK"])
rows_books = c.fetchall()
# Manupulate list for writing JSON.
def addDictionary(accumlator):
    l = list()
    def add(row):
        for i, v in enumerate(row.keys()):
            l.append((v, row[i]))
        accumlator[l[0][1]] = dict(l)
        return None
    return add
def write_file(list):
    def open_fille(name):
        f = open(name, "w")
        json.dump(list, f, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))
        f.close()
        return None
    return open_fille
for row in rows_word:
    addDictionary(look_ups)(row)
for row_book in rows_books:
    addDictionary(books)(row_book)
write_file(look_ups)('look_ups.json')
write_file(books)('books.json')
conn.close()
#
# Check the document:
#   11.13. sqlite3 — DB-API 2.0 interface for SQLite databases — Python 2.7.17 documentation:
#       https://docs.python.org/2/library/sqlite3.html
#
# Tips:
#   Create View:
#       We cannnot use placefolder with a create view statement.
#