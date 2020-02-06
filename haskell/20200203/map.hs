sum3N :: Integer -> Integer
sum3N n = sum $ map (* 3) [0 .. n]

sum3N5 :: Integer -> Integer
sum3N5 n = sum . map (* 3) $ filter ((/= 0) . (`mod` 5)) [0 .. n]

productOdd3 :: Integer -> Integer
productOdd3 n = product . map (* 3)  $ filter ((== True) . (odd))  [1 .. n]
