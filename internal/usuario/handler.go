package usuario

import (
	"encoding/json"
	"net/http"
	"strconv"
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

func (h *Handler) ObtenerUsuarioPorId(
	res http.ResponseWriter,
	req *http.Request,
) {
	idUsuarioTexto := req.PathValue("id")
	idUsuario, err := strconv.ParseInt(idUsuarioTexto, 10, 64)
	if err != nil {
		http.Error(
			res,
			"El id es Invalido",
			http.StatusBadRequest,
		)
		return
	}

	usuario, err := h.service.ObtenerUsuarioPorId(
		req.Context(),
		idUsuario,
	)
	if err != nil {
		http.Error(
			res,
			"El usuario no existe",
			http.StatusNotFound,
		)
		return
	}

	res.Header().Set(
		"Content-Type",
		"application/json",
	)

	json.NewEncoder(res).Encode(usuario)
}

func (h *Handler) ActualizarUsuario(
	res http.ResponseWriter,
	req *http.Request,
) {
	idUsuario, err := strconv.ParseInt(req.PathValue("id"), 10, 64)
	if err != nil {
		http.Error(
			res,
			"error interno",
			http.StatusInternalServerError,
		)
		return
	}
	var input CrearUsuarioRequest
	if err := json.NewDecoder(req.Body).Decode(&input); err != nil {
		http.Error(
			res,
			"JSON inválido",
			http.StatusBadRequest,
		)
		return
	}

	usuario, error := h.service.ActualizarUsuario(
		req.Context(),
		idUsuario,
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
	res.WriteHeader(http.StatusAccepted)

	json.NewEncoder(res).Encode(usuario)
}

func (h *Handler) EliminarUsuario(
	res http.ResponseWriter,
	req *http.Request,
) {
	idUsuario, err := strconv.ParseInt(req.PathValue("id"), 10, 64)
	if err != nil {
		http.Error(
			res,
			"error interno",
			http.StatusInternalServerError,
		)
		return
	}
	if err := h.service.EliminarUsuario(req.Context(), idUsuario); err != nil {
		http.Error(
			res,
			"Id inválido",
			http.StatusBadRequest,
		)
		return
	}

	res.WriteHeader(http.StatusNoContent)

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

	mux.HandleFunc(
		"GET /usuario/{id}",
		h.ObtenerUsuarioPorId,
	)

	mux.HandleFunc(
		"PUT /usuario/{id}",
		h.ActualizarUsuario,
	)

	mux.HandleFunc(
		"DELETE /usuario/{id}",
		h.EliminarUsuario,
	)
}
