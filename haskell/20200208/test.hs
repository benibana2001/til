-- Which is big?
--  1) x ^ (x + 1)
--  2) (x + 1) ^ x
checkList n = filter (\x -> ((x ^ (x + 1)) - ((x + 1) ^ x) < 0)) (take n [1 ..])
