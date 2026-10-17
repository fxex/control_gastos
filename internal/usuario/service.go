package usuario

import (
	"context"
	"errors"
	"log"
	"net/mail"
	"strings"
	"uuid"
)

type Service struct {
	repository *Repository
}

func NewService(repository *Repository) *Service {
	return &Service{
		repository: repository,
	}
}

func (s *Service) CrearUsuario(
	ctx context.Context,
	input CrearUsuarioRequest,
) (Usuario, error) {
	input.Nombre = strings.TrimSpace(input.Nombre)
	if input.Nombre == "" {
		return Usuario{}, errors.New("El nombre de usuario es obligatorio")
	}

	if !esCorreoValido(input.Correo) {
		return Usuario{}, errors.New("El correo es invalido")
	}

	return s.repository.CrearUsuario(ctx, input)
}

func (s *Service) ObtenerUsuarios(
	ctx context.Context,
) ([]Usuario, error) {
	log.Println("Se llamo al metodo obtenerUsuario del servicio")
	return s.repository.ObtenerUsuarios(ctx)
}

func (s *Service) ObtenerUsuarioPorId(
	ctx context.Context,
	id uuid.UUID,
) (Usuario, error) {
	return s.repository.ObtenerUsuarioPorId(ctx, id)
}

func (s *Service) ActualizarUsuario(
	ctx context.Context,
	id uuid.UUID,
	input ActualizarUsuarioRequest,
) (Usuario, error) {
	input.Nombre = strings.TrimSpace(input.Nombre)
	if input.Nombre == "" {
		return Usuario{}, errors.New("El nombre de usuario es obligatorio")
	}

	if !esCorreoValido(input.Correo) {
		return Usuario{}, errors.New("El correo es invalido")
	}

	return s.repository.ActualizarUsuario(ctx, input, id)
}

func (s *Service) EliminarUsuario(
	ctx context.Context,
	id uuid.UUID,
) error {
	return s.repository.EliminarUsuario(ctx, id)
}

func esCorreoValido(correo string) bool {
	_, err := mail.ParseAddress(correo)
	return err == nil
}
