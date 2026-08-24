package main

import (
	"control_gastos/internal/database"
	"control_gastos/internal/usuario"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error cargando .env")
	}

	db, err := database.NewPostgres(
		os.Getenv("DATABASE_URL"),
	)

	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	usuarioRepository := usuario.NewRepository(db)
	usuarioService := usuario.NewService(usuarioRepository)
	usuarioHandler := usuario.NewHandler(usuarioService)

	mux := http.NewServeMux()

	usuarioHandler.RegistrarRutas(mux)

	log.Println("Servidor iniciado en :8080")

	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}
