package usuario

import (
	"encoding/json"
	"net/http"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) CrearUsuario(
	res http.ResponseWriter,
	req *http.Request,
) {
	var input CrearUsuarioRequest
	err := json.NewDecoder(req.Body).Decode(&input)
	if err != nil {
		http.Error(
			res,
			"JSON inválido",
			http.StatusBadRequest,
		)
		return
	}

	usuario, error := h.service.CrearUsuario(
		req.Context(),
		input,
	)
	if error != nil {
		http.Error(
			res,
			error.Error(),
			http.StatusBadRequest,
		)
		return
	}

	res.Header().Set(
		"Content-Type",
		"application/json",
	)
	res.WriteHeader(http.StatusCreated)

	json.NewEncoder(res).Encode(usuario)
}

func (h *Handler) ObtenerUsuarios(
	res http.ResponseWriter,
	req *http.Request,
) {
	usuarios, err := h.service.ObtenerUsuarios(req.Context())
	if err != nil {
		http.Error(
			res,
			"error interno",
			http.StatusInternalServerError,
		)
		return
	}

	res.Header().Set(
		"Content-Type",
		"application/json",
	)

	json.NewEncoder(res).Encode(usuarios)
}

func (h *Handler) RegistrarRutas(
	mux *http.ServeMux,
) {
	mux.HandleFunc(
		"POST /usuario",
		h.CrearUsuario,
	)

	mux.HandleFunc(
		"GET /usuarios",
		h.ObtenerUsuarios,
	)
}
