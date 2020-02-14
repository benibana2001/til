sumIter :: Integer -> [Integer] -> Integer

sumIter s [] = s
sumIter s (x : xs) = sumIter (s + x) xs

fldl :: (a -> b -> a) -> a -> [b] -> a
fldl op s (x : xs) = fldl op (s `op` x) xs
fldl _ s [] = s

myFldl' :: (a -> b -> a) -> a -> [b] -> a
myFldl' _ s [] = s
myFldl' op s (x : xs) = s `seq` myFldl' op (s `op` x) xs
