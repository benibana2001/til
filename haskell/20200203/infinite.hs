factor :: Integer -> Integer
factor n
    | n < 2 = 1
    | otherwise = head $ filter ((== 0) . (n `mod`)) [2 ..]

cubes :: [Integer]
cubes = map (^ 3) [0 ..]
