import Data.Char

some = let
    x = 10
    y = 15 in
    x + y

something = x + y
    where 
    x = 10
    y = 15

fun x
    | x == 0 = 9998 + y
    | otherwise = x + y
    where y = 1

area :: Double -> Double
area x = c + s
    where
    c = (x / 2) ^ 2 * pi / 2
    s = x ^ 2

safeRecip 0 = Nothing
safeRecip x = Just $ 1 / x

safeRecip2 :: Double -> Maybe Double
safeRecip2 = \x -> case x of
    0 -> Nothing
    _ -> Just $ 1 / x

checkAnswer :: Char -> Maybe Bool
checkAnswer  c = case toLower c of
    'y' -> Just True
    'n' -> Just False
    _ -> Nothing

diffRecip :: Double -> Double -> Maybe Double
diffRecip = \x -> \y -> case x - y of
    0 -> Nothing
    d   | d > 0 -> Just $ recip d
        | otherwise -> Just $ recip (- d)
