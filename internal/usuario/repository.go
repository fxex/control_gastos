package usuario

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	db *pgxpool.Pool
}

func NewRepository(db *pgxpool.Pool) *Repository {
	return &Repository{
		db: db,
	}
}

func (r *Repository) Crear(
	ctx context.Context,
	input CrearUsuarioRequest,
) (Usuario, error) {
	var usuario Usuario

	err := r.db.QueryRow(
		ctx,
		`
		Insert into usuario (
			nombre,
			correo
		)
		values ($1, $2)
		Returning
			id_usuario,
			nombre,
			correo,
			fecha_creacion
		`,
		input.Nombre,
		input.Correo,
	).Scan(
		&usuario.ID,
		&usuario.Nombre,
		&usuario.Correo,
		&usuario.FechaCreacion,
	)

	if err != nil {
		return Usuario{}, err
	}

	return usuario, nil
}

func (r *Repository) ObtenerUsuarios(
	ctx context.Context,
) ([]Usuario, error) {
	rows, err := r.db.Query(
		ctx,
		`
		Select 
			id_usuario,
			nombre,
			correo,
			fecha_creacion
		from usuario
		order by id_usuario
		`,
	)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var usuarios []Usuario
	for rows.Next() {
		var usuario Usuario

		err := rows.Scan(
			&usuario.ID,
			&usuario.Nombre,
			&usuario.Correo,
			&usuario.FechaCreacion,
		)

		if err != nil {
			return nil, err
		}
		usuarios = append(usuarios, usuario)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return usuarios, nil
}
