myFldr :: (a -> b -> b) -> b -> [a] -> b
myFldr op v []  = v
myFldr op v (x : xs) = x `op` (myFldr op v) xs

l = [3, 4, 5]

