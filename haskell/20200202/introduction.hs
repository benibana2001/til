myCurry :: ((a, b) -> c) -> a -> b -> c
myCurry f x y = f (x, y)

introduction :: (String, Integer) -> String
introduction (n, a) = "My name is " ++ n ++ ". I'm " ++ show a ++ " years old."

introductionSushi :: Integer -> String
introductionSushi = curry introduction "Sushi"

age :: (Integer, Bool) -> String
age (i, b)
    | b == True = show i
    | otherwise = "secret"

age39 :: Bool -> String
age39 = curry age 39

triangle :: (Integer, Integer, Integer) -> Bool
triangle (x, y, z)
    | x > 0 && y > 0 && z > 0 && x < y + z && y < z + x && z < x + y = True
    | otherwise = False

curry3 :: ((a, b, c) -> d) -> a -> b -> c -> d
curry3 f x y z = f (x, y, z)

