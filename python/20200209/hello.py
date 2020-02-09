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
# c.execute('CREATE VIEW IF NOT EXISTS wordList (id, word, timestamp) AS SELECT id, word, timestamp FROM WORDS WHERE lang = "en"')
c.execute('DROP VIEW IF EXISTS wordList')
c.execute('CREATE VIEW IF NOT EXISTS wordList (word, usage, timestamp, book_key)\
	AS\
        SELECT DISTINCT W.word, LU.usage, LU.timestamp, LU.book_key\
	        FROM WORDS AS W LEFT OUTER JOIN LOOKUPS AS LU\
		ON W.id = LU.word_key\
			WHERE W.lang = "en"\
                ORDER BY LU.timestamp DESC')
# Threw SELECT
# c.execute('SELECT * FROM wordList where word = :word', {"word": 'meadow'})
# c.execute('SELECT DISTINCT * FROM wordList AS WL LEFT OUTER JOIN LOOKUPS AS LU ON WL.id = LU.word_key')
c.execute('SELECT DISTINCT WL.word, LU.usage, LU.timestamp FROM wordList AS WL LEFT OUTER JOIN LOOKUPS AS LU ON WL.word = LU.word_key')
c.execute('SELECT word, usage, timestamp, title, authors\
	FROM wordList AS WL LEFT OUTER JOIN BOOK_INFO AS BI\
		ON WL.book_key = BI.id')
# rows = c.fetchall()
# print(rows)
# print(rows[0][0])
row = c.fetchone() # row は辞書型?
print (tuple(row))
# print (row['id'])
# print (row.keys())
# print (len(row))
# for i, v in enumerate(row.keys()):
    # print(v, row[i])
# Parse to JSON
# print(json.dumps(tuple(row)))
# Close Connection
conn.close()