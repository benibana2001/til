initBoard = lambda row: lambda column: ( [[0] * column] * row)
getRow = lambda ary: lambda row: ary[row]
getColumn = lambda ary: lambda n: list(map(lambda elem: elem[n], ary))
getSquare = lambda ary: lambda row: lambda column: (getRow(ary)(row))[column]
# def setSquare(n):
    
# setSquare = lambda ary: lambda n: lambda row: lambda column: ary[row][column] = n
reverse = lambda x: - x

# Under the hear, We write domain specific
ROW = 8
COLUMN = 8
BOARD = initBoard(8)(8)
TEST_BOARD = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
# print(BOARD)
print(getSquare(TEST_BOARD)(1)(2))
# print(getColumn(BOARD)(0))
# getColumn = lambda ary: lambda n: list(map(lambda elem: elem[n], ary))
# def f(): x = 1; y = 2; return x + y
def g(): x = 1; y = 2; return lambda z: x + y + z
