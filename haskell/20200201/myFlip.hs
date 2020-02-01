myFlip :: (a -> b -> c ) -> b -> a -> c
myFlip f x y = f y x
