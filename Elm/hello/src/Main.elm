module Main exposing (add, output)

output = 
    "1 + 1 = " ++ String.fromInt (add 1 1)

add a b = 
    a + b
