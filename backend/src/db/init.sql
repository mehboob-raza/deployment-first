CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    age INTEGER,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT age_check
        CHECK (age IS NULL OR (age >= 0 AND age <= 150))
);


CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);


CREATE INDEX IF NOT EXISTS idx_users_created_at
ON users(created_at DESC);


INSERT INTO users (name, email, age)
VALUES
    ('John Doe', 'john@example.com', 25),
    ('Jane Smith', 'jane@example.com', 30)
ON CONFLICT (email) DO NOTHING;