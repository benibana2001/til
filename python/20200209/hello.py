import sqlite3
import json
#
# Check the document:
#   https://docs.python.org/2/library/sqlite3.html
#
# VARIABLE
DB_NAME = 'vocab.db'
# Connect db
#   Create Row Instance:
#       https://docs.python.org/ja/3/library/sqlite3.html?highlight=sql#row-objects
#   Create Cursor Object to call SQL.
conn = sqlite3.connect(DB_NAME)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Create View
#   We cannnot use placefolder to create view statement.
c.execute('DROP VIEW IF EXISTS wordList')
c.execute('CREATE VIEW IF NOT EXISTS wordList (word, usage, timestamp, book_key)\
	AS\
        SELECT DISTINCT W.word, LU.usage, LU.timestamp, LU.book_key\
	        FROM WORDS AS W LEFT OUTER JOIN LOOKUPS AS LU\
		ON W.id = LU.word_key\
			WHERE W.lang = "en"\
                ORDER BY LU.timestamp DESC')
#
# Throw SELECT
#
c.execute('SELECT word, usage, timestamp, title, authors\
	FROM wordList AS WL LEFT OUTER JOIN BOOK_INFO AS BI\
		ON WL.book_key = BI.id')
rows = c.fetchall()
print(type(rows))
# row = rows[0]
#
# L = list()
def addDictionary(row):# row
    d = {}
    l = list()
    for i, v in enumerate(row.keys()):
        l.append((v, row[i]))
    d[l[0][1]] = dict(l)
    return d

L = list(map(addDictionary, rows))
# print(L)
# Parse to JSON
f = open("output.json", "w")
json.dump(L, f, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))
# print(json.dumps(d))
# Close Connection
conn.close()