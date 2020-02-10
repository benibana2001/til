package main

import (
	"fmt"
	"testing"
)

func TestIsEven(t *testing.T) {
	cases := []struct{
		name string
		input int
		result bool
	}{
		{name: "even-1", input: 2, result: true},
		{name: "odd-1", input: 3, result: false},
		{name: "even-2", input: -2, result: true},
		{name: "odd-2", input: -3, result: false},
		{name: "zero", input: 0, result: true},
	}

	/*
	for _, c := range cases {
		if isEven(c.input) != c.result {
			t.Errorf("Test is failed. CASE: [%v] ... expected %v, got %v",c.name, c.result, isEven(c.input))
		}
	}
	*/

	for _, tc := range cases {
		t.Run(fmt.Sprintf("%s", tc.name), func(t *testing.T) {
			if isEven(tc.input) != tc.result {
				t.Errorf("Test is failed. CASE: [%v] ... expected %v, got %v",tc.name, tc.result, isEven(tc.input))
			}
		})
	}
}
