package usuario

import "time"

type Usuario struct {
	ID            int64     `json:"id_usuario"`
	Nombre        string    `json:"nombre"`
	Correo        string    `json:"correo"`
	FechaCreacion time.Time `json:"fecha_creacion"`
}

type CrearUsuarioRequest struct {
	Nombre string `json:"nombre"`
	Correo string `json:"correo"`
}
