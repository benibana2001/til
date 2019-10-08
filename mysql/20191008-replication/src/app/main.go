package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
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
	msg := "Hello world"
	// DB接続のテスト
	db, dbErr := connectDB()

	if dbErr != nil {
		msg = dbErr.Error()
	}
	if db != nil {
		var id string
		var name string
		var mail string

		rows, err := db.Query("select * from User where id < ?", 5)
		if err != nil {
			fmt.Fprintf(w, err.Error())
		}

		defer rows.Close()

		for rows.Next() {
			err := rows.Scan(&id, &name, &mail)
			if err != nil {
				fmt.Fprintf(w, err.Error() + "\n")
			}
			fmt.Fprintf(w, "%v\n%v\n%v\n\n", id, name, mail)
		}
	}

	fmt.Fprintf(w, msg + "\n")
}

func connectDB() (*sql.DB, error) {
	//[username[:password]@][protocol[(address)]]/dbname[?param1=value1&...&paramN=valueN]
	db, openErr := sql.Open("mysql", "root@tcp(192.168.99.11)/test")
	if openErr != nil {
		return nil, openErr
	}

	pingErr := db.Ping()
	if pingErr != nil {
		return nil, pingErr
	}

	return db, nil
}
