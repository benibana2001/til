# We have to use 'def' declare when use Statement
# because 'lamda' doesn't support statment only expression.
def funcTimes(f):
    def times(n):
        for i in range(n):
            f(i)
    return times
# setNum function is destructive !
def setNum(ary, i):
    def setAry(v):
        ary[i] = v
    return setAry
initBoard = lambda ary: lambda row: lambda column: funcTimes(lambda x: ary.append(list(map(lambda x : 0, range(column)))))(row)
getRow = lambda ary: lambda row: ary[row]
getColumn = lambda ary: lambda n: list(map(lambda elem: elem[n], ary))
getSquare = lambda ary: lambda row: lambda column: (getRow(ary)(row))[column]
funcSquare = lambda ary: lambda f: lambda row: lambda column: f(ary[row], column)
reverse = lambda x: - x
# Under the hear, We write domain specific
ROW = 8
COLUMN = 8
BOARD = []
initBoard(BOARD)(8)(8)
putWhite = lambda row: lambda column : funcSquare(BOARD)(setNum)(row)(column)(1)
putBlack = lambda row: lambda column : funcSquare(BOARD)(setNum)(row)(column)(-1)
putWhite(3)(3)
putWhite(4)(4)
putBlack(3)(4)
putBlack(4)(3)
print(BOARD)