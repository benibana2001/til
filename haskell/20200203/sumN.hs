sumN :: Integer -> Integer
sumN n = sum [0 .. n]

multipleN :: Integer -> Integer
multipleN n = product [1 .. n]

sum3N :: Integer -> Integer
sum3N n = sum $ filter ((== 0) . (`mod` 3)) [0 .. 3 * n]

productOdds :: Integer -> Integer
productOdds n = product $ filter ((== True) . odd) [0 .. (2 * n + 1)]
