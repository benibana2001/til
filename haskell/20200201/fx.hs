import Data.Char

(.$.) :: (a -> b) -> a -> b
f .$. x = f x

apply :: a -> (a -> b) -> b
apply x f = f x

apply3 :: (a -> b) -> (c -> a) -> c -> b
apply3 f g x = f (g (x)) 

xxcrypt n ed = (`mod` n) . (^ ed)

toLowerOrd = ord . toLower
