package database

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewPostgres(databaseURL string) (*pgxpool.Pool, error) {
	db, error := pgxpool.New(context.Background(), databaseURL)
	if error != nil {
		return nil, fmt.Errorf("Crear Pool: %w", error)
	}

	if error := db.Ping(context.Background()); error != nil {
		db.Close()
		return nil, fmt.Errorf("conectar con postgres: %w", error)
	}

	return db, nil
}
