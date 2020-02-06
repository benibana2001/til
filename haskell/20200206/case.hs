format :: String -> [(String, Int)] -> String
format k d = case lookup k d of
    Just n -> replicate (5 - length s) ' ' ++ s
        where s = show n
    Nothing -> "NO VALUE"

oneToFive :: Integer -> Integer
oneToFive x = case x - c * (x `div` c) of
    0 -> 5
    d -> d
    where c = 5

fool x = if x `mod` 3 == 0 then "aho" else "normal"

myFst (x, y) = x
mySnd (x, y) = y
