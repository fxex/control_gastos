package usuario

import (
	"context"
	"errors"

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

func (r *Repository) CrearUsuario(
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

func (r *Repository) ObtenerUsuarioPorId(
	ctx context.Context,
	id int64,
) (Usuario, error) {
	var usuario Usuario

	err := r.db.QueryRow(
		ctx,
		`
			SELECT
				id_usuario,
				nombre,
				correo,
				fecha_creacion
			from usuario
			where id_usuario = $1
		`,
		id,
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

func (r *Repository) ActualizarUsuario(
	ctx context.Context,
	input CrearUsuarioRequest,
	id int64,
) (Usuario, error) {
	var usuario Usuario

	err := r.db.QueryRow(
		ctx,
		`
		update usuario set 
			nombre = $1,
			correo = $2 
		where id_usuario = $3
		Returning
			id_usuario,
			nombre,
			correo,
			fecha_creacion
		`,
		input.Nombre,
		input.Correo,
		id,
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

func (r *Repository) EliminarUsuario(
	ctx context.Context,
	id int64,
) error {
	resultado, err := r.db.Exec(
		ctx,
		`
		DELETE FROM usuario
		WHERE id_usuario = $1
		`,
		id,
	)

	if err != nil {
		return err
	}

	if resultado.RowsAffected() == 0 {
		return errors.New("usuario no encontrado")
	}

	return nil
}
