safeSqrt x
    | x >= 0 = Just (sqrt x)
    | otherwise = Nothing

div3 x
    | (x `mod` 3) == 0 = x `div` 3
    | otherwise = x
