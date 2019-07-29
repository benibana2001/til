package main

import "fmt"

func isEven(s int) bool{
	if s % 2 == 0 {
		return true
	}
	return false
}

func main()  {
	fmt.Println(isEven(124))
}
