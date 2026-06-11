CREATE TABLE sociedades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE grupos_etarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    sociedad_id INT NOT NULL REFERENCES sociedades,
    natalidad_base INT NOT NULL,
    mortalidad_base INT NOT NULL
);

CREATE TABLE registros_historicos (
    id SERIAL PRIMARY KEY,
    sociedad_id INT NOT NULL REFERENCES sociedades,
    grupo_etario_id INT NOT NULL REFERENCES grupos_etarios,
    cantidad INT NOT NULL,
    anio INT NOT NULL
);

CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
    grupo_etario_id INT NOT NULL REFERENCES grupos_etarios,
    anio_desde INT NOT NULL,
    anio_hasta INT NOT NULL,
    natalidad INT NOT NULL,
    mortalidad INT NOT NULL
);
