bmi :: Double -> Double -> Double
bmi h w = w / (h / 100) ^ 2

isObse :: Double -> Double -> Bool
isObse h w = bmi h w > 25
