package api

import (
	"log"
	"net/http"
)

// handleRootRequest traite une réponse à la racine de l'API
func (s *APIServer) handleRootRequest(w http.ResponseWriter, r *http.Request) error {
	// débug
	log.Println("endpoint / atteint !")

	return writeJSON(w, http.StatusOK, APIMessage{Message: "success"})
}