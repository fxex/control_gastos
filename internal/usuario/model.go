package usuario

import (
	"time"

	"github.com/google/uuid"
)

type Usuario struct {
	ID            uuid.UUID `json:"id_usuario"`
	Nombre        string    `json:"nombre"`
	Correo        string    `json:"correo"`
	FechaCreacion time.Time `json:"-"`
}

type CrearUsuarioRequest struct {
	Nombre string `json:"nombre"`
	Correo string `json:"correo"`
}

type ActualizarUsuarioRequest struct {
	Nombre  string `json:"nombre"`
	Correo  string `json:"correo"`
	Usuario uuid.UUIDs
}
