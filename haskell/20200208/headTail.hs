myHead :: [a] -> a
myHead (x : _) = x
myHead [] = error "Bonehead!"

myTail :: [a] -> [a]
myTail (_ : xs) = xs

myNull :: [a] -> Bool
myNull [] = True
myNull (_ : _) = False

plural :: [a] -> Bool
plural [] = True
plural (_ : []) = False
plural (_ : _) = True
