FROM golang:1.12
WORKDIR /go/src/app

RUN go get github.com/pilu/fresh
RUN go get github.com/go-sql-driver/mysql


CMD ["go", "run", "/go/src/app/main.go"]
CMD ["fresh"]
