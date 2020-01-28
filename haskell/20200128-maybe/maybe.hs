maybe0 (Just x) = x
maybe0 Nothing = 0

nothingness Nothing = True
nothingness (Just _) = False

safeRecip 0 = Nothing
safeRecip x = Just (1/x)

friend (Just name) = name ++ " is" ++ " friend"
friend Nothing = "Im alone"

notZero 0 = Nothing
notZero x = (Just x)
