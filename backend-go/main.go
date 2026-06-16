package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type PreguntaRequest struct {
	Pregunta string `json:"pregunta"`
}

type PreguntaResponse struct {
	Respuesta string `json:"respuesta"`
}

func preguntarHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	var req PreguntaRequest

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	resp := PreguntaResponse{
		Respuesta: "Esta es una respuesta de ejemplo a tu pregunta: " + req.Pregunta,
	}

	json.NewEncoder(w).Encode(resp)
}

func main() {

	http.HandleFunc("/preguntar", preguntarHandler)

	log.Println("Servidor iniciado en puerto 8081")

	log.Fatal(http.ListenAndServe(":8081", nil))
}

