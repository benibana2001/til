import Funpaala
len :: a -> Int -> Int
len _ l = 1 + l

len' = const (1 +)

mySum, myProduct :: [Integer] -> Integer
mySum = fldr (+) 0
myProduct = fldr (*) 1

myLength :: [a] -> Integer
-- myLength = fldr (const (1 +)) 0
