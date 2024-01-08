package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers() 
	
}

func Routers() {
	InitDB() 
	defer db.Close() 
	log.Println("Starting the HTTP server on port 9080") 
	router := mux.NewRouter() 
	router.HandleFunc("/api/pasien", GetUsers).Methods("GET")
	router.HandleFunc("/api/pasien", CreateUser).Methods("POST")
	router.HandleFunc("/api/pasien/{id}", GetUser).Methods("GET")
	router.HandleFunc("/api/pasien/{id}", UpdateUser).Methods("PUT")
	router.HandleFunc("/api/pasien/{id}", DeleteUser).Methods("DELETE")
	http.ListenAndServe(":9080", &CORSRouterDecorator{router})
}

/***************************************************/

// Get all users
func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var users []User

	result, err := db.Query("SELECT id, nama, usia, jenis_kelamin, alamat, deskripsi FROM pasien_puskesmas_ersa")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var user User
		err := result.Scan(&user.ID, &user.Nama, &user.Usia, &user.JenisKelamin, &user.Alamat, &user.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
		users = append(users, user)
	}
	json.NewEncoder(w).Encode(users)
}

// Create user
func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO pasien_puskesmas_ersa(nama, usia, jenis_kelamin, alamat, deskripsi) VALUES(?, ?, ?, ?, ?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	nama := keyVal["nama"]
	usia := keyVal["usia"]
	jenis_kelamin := keyVal["jenis_kelamin"]
	alamat := keyVal["alamat"]
	deskripsi := keyVal["deskripsi"]
	// print jenis_kelamin
	fmt.Println(jenis_kelamin)
	_, err = stmt.Exec(nama, usia, jenis_kelamin, alamat, deskripsi)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New user was created")
}

// Get user by ID
func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, nama, usia, jenis_kelamin, alamat, deskripsi FROM pasien_puskesmas_ersa WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var user User
	for result.Next() {
		err := result.Scan(&user.ID, &user.Nama, &user.Usia, &user.JenisKelamin, &user.Alamat, &user.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(user)
}

// Update user
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE pasien_puskesmas_ersa SET nama= ?, usia=?, jenis_kelamin=?, alamat=?, deskripsi=? WHERE id = ?")

	if err != nil {
		panic(err.Error())
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)

	nama := keyVal["nama"]
	usia := keyVal["usia"]
	alamat := keyVal["alamat"]
	jenis_kelamin := keyVal["jenis_kelamin"]
	deskripsi := keyVal["deskripsi"]
	_, err = stmt.Exec(nama, usia, jenis_kelamin, alamat, deskripsi, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "User with ID = %s was updated",
		params["id"])
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM pasien_puskesmas_ersa WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "User with ID = %s was deleted",
		params["id"])
}

type User struct {
	ID           int    `json:"id"`
	Nama         string `json:"nama"`
	Usia         int    `json:"usia"`
	JenisKelamin string `json:"jenis_kelamin"`
	Alamat       string `json:"alamat"`
	Deskripsi    string `json:"deskripsi"`
}

var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql",
		"root:@/db_2200458_ErsaMeilia_UASPromnet")
	if err != nil {
		panic(err.Error())
	}
}

/***************************************************/
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Accept-Language,"+
				" Content-Type, YourOwnHeader")
	}

	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
