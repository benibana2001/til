introduction :: (String, Integer) -> String
introduction (n, a) = "My name is " ++ n ++ ". I'm " ++ show a ++ " years old."

introductionSushi :: Integer -> String
introductionSushi = curry introduction "Sushi"
