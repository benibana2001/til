package main

import "testing"

func TestIsEven(t *testing.T) {
	cases := []struct{
		input int
		result bool
	}{
		{input: 1, result: true},
		{input: 3, result: false},
	}

	for _, c := range cases {
		if isEven(c.input) != c.result {
			t.Errorf("Test is failed. expected %v, got %v", c.result, isEven(c.input))
		}
	}
}
