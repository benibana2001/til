mySum :: [Integer] -> Integer
mySum [] = 0
mySum (x : xs) = x + mySum xs

myProduct :: [Integer] -> Integer
myProduct [] = 1
myProduct (x : xs) = x * myProduct xs

myMaximum :: [Integer] -> Integer
myMaximum [] = 0
myMaximum (x : xs) = max x (myMaximum xs)

myLength :: [a] -> Int
myLength [] = 0
myLength (_ : xs) = 1 + myLength xs

myLength' :: [a] -> Int
myLength' [] = 0
myLength' (x : xs) = 1 + (sum $ map (const 1) xs)
