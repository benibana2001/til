myFromMaybe :: b -> (a -> b) -> Maybe a -> b
myFromMaybe _ f (Just x) = f x
myFromMaybe d f Nothing = d

