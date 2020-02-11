estPi :: Int -> Double
estPi n = 4 * estPi4 n

estPi4 :: Int -> Double
estPi4 0 = 1
estPi4 n = estPi4(n - 1) + (- 1) ^ n / (2 * fromIntegral n + 1)

myHead :: [a] -> a
myHead (x : _) = x
myHead [] = error "Bone head!"

myTail :: [a] -> [a]
myTail (_ : x) = x

mySum :: [Integer] -> Integer
mySum [] = 0
mySum (x : xs) = x + mySum xs


myProduct :: [Integer] -> Integer
myProduct [] = 1
myProduct (x : xs) = x * myProduct xs

myLength :: [Integer] -> Integer
myLength [] = 0
myLength (_ : xs) = 1 + myLength xs

l = [9, 4, 2, 12]
