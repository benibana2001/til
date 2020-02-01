dist0 :: (Double, Double) -> Double
dist0 (x, y) = sqrt $ x ^ 2 + y ^ 2

px, py :: Double
px = 9
py = 5

p :: (Double, Double)
p = (9, 5)

dist :: ((Double, Double), (Double, Double)) -> Double
dist ((ax, ay), (bx, by)) = sqrt $ ((ax - bx) ^ 2) + ((ay - by) ^ 2)
