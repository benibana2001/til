package main

import (
	"fmt"
	"net/http"
	"os"
)

type MyHandler struct {}

func main() {
	handler := MyHandler{}
	server := http.Server{
		Addr: ":8081",
		Handler: &handler,
	}
	err := server.ListenAndServe()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func(h *MyHandler) ServeHTTP(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "Hallo world\n")
}

