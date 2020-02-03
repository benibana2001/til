tax :: Double -> Double -> Double
tax p t = p * (1 + t)

tax2 :: (Double, Double) -> Double
tax2 = uncurry tax

congruent :: Integer -> Integer -> Integer -> Bool
congruent a x y
    | x `mod` a == y `mod` a = True
    | otherwise = False

uncurry3 :: (a -> b -> c -> d) -> (a, b, c) -> d
uncurry3 f (x, y, z) = f x y z
