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
c.execute('DROP VIEW IF EXISTS wordList')
c.execute('CREATE VIEW IF NOT EXISTS wordList (word, usage, timestamp, book_key)\
	AS\
        SELECT DISTINCT W.word, LU.usage, LU.timestamp, LU.book_key\
	        FROM WORDS AS W LEFT OUTER JOIN LOOKUPS AS LU\
		ON W.id = LU.word_key\
			WHERE W.lang = "en"\
                ORDER BY LU.timestamp DESC')
c.execute('SELECT word, usage, timestamp, title, authors\
	FROM wordList AS WL LEFT OUTER JOIN BOOK_INFO AS BI\
		ON WL.book_key = BI.id')
rows = c.fetchall()
#
# Iterate Date
def addDictionary(row):# row
    d = {}
    l = list()
    for i, v in enumerate(row.keys()):
        l.append((v, row[i]))
    d[l[0][1]] = dict(l)
    return d
L = list(map(addDictionary, rows))
f = open("output.json", "w")
json.dump(L, f, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))
conn.close()