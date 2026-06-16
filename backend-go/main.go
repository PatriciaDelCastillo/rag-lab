package main

import (
	"encoding/json"
	"log"
	"net/http"
)
// PreguntaRequest representa la estructura de la solicitud JSON que se espera recibir	
// PreguntaResponse representa la estructura de la respuesta JSON que se enviará al cliente
// Estas estructuras facilitan la codificación y decodificación de datos JSON en las solicitudes y respuestas HTTP
type PreguntaRequest struct {
	Pregunta string `json:"pregunta"`
}

type PreguntaResponse struct {
	Respuesta string `json:"respuesta"`
}

// preguntarHandler maneja las solicitudes POST a la ruta "/preguntar".
// Configura los encabezados CORS para permitir solicitudes desde cualquier origen y manejar las opciones de preflight.
// Si la solicitud es una opción (preflight), responde con un estado 200 OK. Si no es una solicitud POST, responde con un error de método no permitido.
// Decodifica el cuerpo de la solicitud JSON en una estructura PreguntaRequest. Si hay un error, responde con un error de JSON inválido.
// Crea una respuesta de ejemplo utilizando la pregunta recibida y codifica esta respuesta en JSON para enviarla al cliente.
func preguntarHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	// Maneja las solicitudes de preflight (OPTIONS) para CORS
	// Si la solicitud es una opción, responde con un estado 200 OK y no procesa más la solicitud. 
	// Esto es necesario para permitir que los navegadores realicen solicitudes CORS correctamente.
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	// Verifica que el método de la solicitud sea POST. Si no lo es, responde con un error de método no permitido.
	// Esto asegura que solo se procesen las solicitudes POST para esta ruta, lo que es importante para mantener la integridad de la API.
	// Si la solicitud es una opción, 
	// responde con un estado 200 OK y no procesa más la solicitud. 
	// Esto es necesario para permitir que los navegadores realicen solicitudes CORS correctamente.		
	if r.Method != http.MethodPost {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	var req PreguntaRequest
	// Decodifica el cuerpo de la solicitud JSON en una estructura PreguntaRequest. Si hay un error, responde con un error de JSON inválido.	
	// Esto permite que el servidor reciba datos estructurados desde el cliente y maneje cualquier error de formato de manera adecuada, 
	// proporcionando una respuesta clara al cliente en caso de que el JSON no sea válido.		
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}
	// Crea una respuesta de ejemplo utilizando la pregunta recibida y codifica esta respuesta en JSON para enviarla al cliente.
	// Esto simula una respuesta del servidor basada en la pregunta recibida, 
	// lo que es útil para probar la funcionalidad de la API y asegurarse de que el cliente reciba una respuesta adecuada.	
	resp := PreguntaResponse{
		Respuesta: "Esta es una respuesta de ejemplo a tu pregunta: " + req.Pregunta,
	}

	// Codifica la respuesta en JSON y envíala al cliente. Si hay un error durante la codificación, responde con un error de servidor interno.
	// Esto garantiza que el servidor maneje cualquier error de codificación de manera adecuada y proporcione una respuesta clara al cliente en caso de que ocurra un error inesperado.	
	err = json.NewEncoder(w).Encode(resp)
	if err != nil {
		http.Error(w, "Error al codificar la respuesta", http.StatusInternalServerError)
		return
	}
	// Si la codificación es exitosa, la respuesta JSON se envía al cliente con un estado 200 OK.
	// Esto permite que el cliente reciba la respuesta estructurada y pueda procesarla según sea necesario.
	// Si la codificación es exitosa, la respuesta JSON se envía al cliente con un estado 200 OK.

	json.NewEncoder(w).Encode(resp)
}

// La función main inicia el servidor HTTP en el puerto 8081 y registra el manejador para la ruta "/preguntar".
// El servidor se ejecuta indefinidamente hasta que se detiene manualmente o ocurre un error fatal.	
func main() {
	// Registra el manejador para la ruta "/preguntar" que se encargará de procesar las solicitudes POST con preguntas. 
	// Esto permite que el servidor responda a las solicitudes de los clientes que envían preguntas a esta ruta específica.	
	// Registra el manejador para la ruta "/preguntar" que se encargará de procesar las solicitudes POST con preguntas.	
	http.HandleFunc("/preguntar", preguntarHandler)

	log.Println("Servidor iniciado en puerto 8081")

	log.Fatal(http.ListenAndServe(":8081", nil))
}

