import sqlite3
#
# Check the document:
#   https://docs.python.org/2/library/sqlite3.html
#
# VARIABLE
DB_NAME = 'vocab.db'
# Connect db
conn = sqlite3.connect(DB_NAME)
# Create Cursor Object to call SQL.
c = conn.cursor()

# Threw SQL
s = ('gulped',)
c.execute('SELECT * FROM WORDS WHERE word = ?', s)
print (c.fetchone())
conn.close()
