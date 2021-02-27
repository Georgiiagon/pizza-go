package main

import (
	"encoding/json"
	"log"
	"net/http"
	"text/template"

	"github.com/julienschmidt/httprouter"
)

type Product struct {
	Id          int
	Name        string
	Description string
	Price       float64
	Image       string
}

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseGlob("resources/views/*"))

}

func main() {
	router := httprouter.New()
	router.GET("/", frontend)
	router.GET("/api/get-products", getProducts)

	router.ServeFiles("/public/*filepath", http.Dir("public"))

	log.Fatal(http.ListenAndServe(":8080", router))
}

func frontend(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	tpl.ExecuteTemplate(w, "app.html", nil)
}

func getProducts(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {

	products := []Product{
		{
			Id:          1,
			Name:        "pizza 1",
			Description: "good pizza",
			Price:       5.43,
			Image:       "public/images/pizzas/pizza-1.jpeg",
		},

		{
			Id:          2,
			Name:        "pizza 2",
			Description: "good pizza",
			Price:       4.23,
			Image:       "public/images/pizzas/pizza-2.jpeg",
		},

		{
			Id:          3,
			Name:        "pizza 3",
			Description: "good pizza",
			Price:       3.77,
			Image:       "public/images/pizzas/pizza-3.jpeg",
		},

		{
			Id:          4,
			Name:        "pizza 4",
			Description: "good pizza",
			Price:       7.77,
			Image:       "public/images/pizzas/pizza-4.jpeg",
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}
