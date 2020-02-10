import json
import sqlite3
import subprocess
import sys
#
# 1. Copy file from Kindle
#
#   1.1 Define copy command as a subprocess.
COMMAND = "cp"
FILE_NAMES = {
    "INPUT": "vocab.db",
    "OUTPUT": {
        "WORDS": "look_ups.json",
        "BOOKS": "books.json"
    }
}
PATH_FROM = "/Volumes/Kindle/system/vocabulary/" + FILE_NAMES["INPUT"]
PATH_TO = "./" + FILE_NAMES["INPUT"]
def after_func(n):
    def succ_cmd():
        return None
    def fail_cmd():
        sys.exit()
    return succ_cmd if n == 0 else fail_cmd
def list2str(*args):
    cmd = ""
    for str in args:
        cmd += str + " "
    return cmd[:-1]
def do_cmd(cmd):
    is_success = -1
    try:
        subprocess.run([cmd], shell=True)
        is_success = 0
    except FileNotFoundError:
        print("Err: ファイルが存在しません。", "端末のマウントを確認ください。")
        is_success = -2
    except Exception as other:
        print("Err: ", other)
        is_success = -3
    return is_success
# 1-2. Exec command.
after_func(do_cmd(list2str(COMMAND, PATH_FROM, PATH_TO)))()
#
# 2. Fetch SQLite and exort JSON.
#
# 2-1. Fetch SQLite.
STTMT = {
    "DDL": {
        "CREATE_VIEW_WORDS": 
            'CREATE VIEW UNIQUE_ENGLISH_WORDS\
	            AS SELECT word_key, book_key, usage, timestamp\
		                FROM LOOKUPS\
	                WHERE word_key LIKE "en:%"\
	                GROUP BY word_key;',
        "DROP_VIEW_WORDS":
            'DROP VIEW IF EXISTS UNIQUE_ENGLISH_WORDS',
    },
    "DML": {
        "SELECT_WORDS": 'SELECT * FROM UNIQUE_ENGLISH_WORDS',
        "SELECT_BOOKS": 'SELECT id, title, authors FROM BOOK_INFO WHERE lang = "en"',
    }}
record = {
    "look_ups": {},
    "books": {}
}
conn = sqlite3.connect(FILE_NAMES["INPUT"])
conn.row_factory = sqlite3.Row
cur = conn.cursor()
cur.execute(STTMT["DDL"]["DROP_VIEW_WORDS"])
cur.execute(STTMT["DDL"]["CREATE_VIEW_WORDS"])
cur.execute(STTMT["DML"]["SELECT_WORDS"])
rows_words = cur.fetchall()
cur.execute(STTMT["DML"]["SELECT_BOOKS"])
rows_books = cur.fetchall()
# 2-2. Manupulate list for writing JSON.
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
for row in rows_words:
    addDictionary(record["look_ups"])(row)
for row_book in rows_books:
    addDictionary(record["books"])(row_book)
write_file(record["look_ups"])(FILE_NAMES["OUTPUT"]["WORDS"])
write_file(record["books"])(FILE_NAMES["OUTPUT"]["BOOKS"])
cur.close()
conn.close()
#
# END
#
# Check the document:
#   はじめに — pep8-ja 1.0 ドキュメント:
#       https://pep8-ja.readthedocs.io/ja/latest/
#   subprocess — Subprocess management — Python 3.8.1 documentation:
#       https://docs.python.org/3/library/subprocess.html
#   11.13. sqlite3 — DB-API 2.0 interface for SQLite databases — Python 2.7.17 documentation:
#       https://docs.python.org/2/library/sqlite3.html
#
# Tips:
#   subprocess.run():
#       There is two way to set Args;
#           1) List
#           2) String
#       - If set String, must set "check=True" to 2nd arg.
#       - When use command with authority - like cp, rm -
#           must need 2nd arg "check=True".
#   SQL - Create View:
#       We cannnot use placefolder with a create view statement.
#