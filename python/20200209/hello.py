import sqlite3
import json
#
# Check the document:
#   https://docs.python.org/2/library/sqlite3.html
#
# Connect db
#   Create Row Instance:
#       https://docs.python.org/ja/3/library/sqlite3.html?highlight=sql#row-objects
#   Create Cursor Object to call SQL.
#
# Create View
#   We cannnot use placefolder to create view statement.
#
# Throw SELECT
#
# Parse to JSON
#
# Close Connection
#
DB_NAME = 'vocab.db'
conn = sqlite3.connect(DB_NAME)
conn.row_factory = sqlite3.Row
c = conn.cursor()
c.execute('DROP VIEW IF EXISTS UNIQUE_ENGLISH_WORD')
c.execute('CREATE VIEW UNIQUE_ENGLISH_WORD\
	AS SELECT word_key, book_key, usage, timestamp\
		    FROM LOOKUPS\
	    WHERE word_key LIKE "en:%"\
	    GROUP BY word_key;')
c.execute('SELECT * FROM UNIQUE_ENGLISH_WORD')
rows = c.fetchall()
#
# print(rows)
# print(rows[0])
#
# Iterate Date
# 
LOOK_UPS = {}
def addDictionary(row):
    l = list()
    for i, v in enumerate(row.keys()):
        l.append((v, row[i]))
    LOOK_UPS[l[0][1]] = dict(l)
    return None
L = list(map(addDictionary, rows))
f = open("output.json", "w")
json.dump(LOOK_UPS, f, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))
#
# c.execute('SELECT id, title, authors FROM BOOK_INFO WHERE lang = "en"')
# books = c.fetchall()
#
conn.close()