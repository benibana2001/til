halve :: Double -> Double
halve = (/ 2)

convert :: (Double -> Double) -> Integer -> Double
convert f = f . fromIntegral 

seven :: Integer
seven = 7
