package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"net/http"
	"os"
)

type MyHandler struct{}

const (
	driverName    = "mysql"
	user          = "root"
	ipMaster      = "@tcp(192.168.99.11)/"
	ipReplica     = "@tcp(192.168.99.12)/"
	dbName        = "test"
	sourceMaster  = user + ipMaster + dbName
	sourceReplica = user + ipReplica + dbName
)

func main() {
	handler := MyHandler{}
	server := http.Server{
		Addr:    ":8081",
		Handler: &handler,
	}

	err := server.ListenAndServe()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func (h *MyHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// DB接続
	dbM, dbErrM := connectDB(sourceMaster)
	dbS, dbErrS := connectDB(sourceReplica)

	if dbErrM != nil {
		fmt.Fprintf(w, dbErrM.Error())
		os.Exit(1)
	}
	if dbErrS != nil {
		fmt.Fprintf(w, dbErrS.Error())
		os.Exit(1)
	}

	// DBを作成
	DB := NewDB(dbM, dbS)
	pErr := DB.Ping()
	if pErr != nil {
		fmt.Fprintf(w, pErr.Error())
	}

	var id string
	var name string
	var mail string

	// MasterへUPDATE文を発行
	_, upErr := DB.Exec("update User set name = ? where id = ?", "Yamada Bob2", 2)
	if upErr != nil {
		fmt.Fprintf(w, upErr.Error())
	}

	// MasterへINSERT文を発行
	//_, instErr := DB.Exec("insert User (id, name, mail) values (null, ?, ?)", "Ogawa Yoko", "ogawa@jp")
	//if instErr != nil {
	//	fmt.Fprintf(w, instErr.Error())
	//}
	// ReplicaへSELECT文を発行
	rows, err := DB.Query("select * from User where id < ?", 5)
	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&id, &name, &mail)
		if err != nil {
			fmt.Fprintf(w, err.Error()+"\n")
		}
		fmt.Fprintf(w, "%v\n%v\n%v\n\n", id, name, mail)
	}
}

func connectDB(source string) (*sql.DB, error) {
	//[username[:password]@][protocol[(address)]]/dbname[?param1=value1&...&paramN=valueN]
	db, openErr := sql.Open(driverName, source)
	if openErr != nil {
		return nil, openErr
	}

	pingErr := db.Ping()
	if pingErr != nil {
		return nil, pingErr
	}

	return db, nil
}
