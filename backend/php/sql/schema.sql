-- Learning Platform schema (PostgreSQL)
-- Run \c learning_platform in psql before executing this script.

CREATE TABLE IF NOT EXISTS public.users (
  id          BIGSERIAL PRIMARY KEY,
  name        VARCHAR(100)      NOT NULL,
  email       VARCHAR(190)      NOT NULL UNIQUE,
  password_hash VARCHAR(255)    NOT NULL,
  role        TEXT              NOT NULL DEFAULT 'student'
    CHECK (role IN ('student','instructor')),
  gender      TEXT DEFAULT NULL
    CHECK (gender IS NULL OR gender IN ('female','male','prefer-not')),
  phone       VARCHAR(32)       DEFAULT NULL,
  country     VARCHAR(80)       DEFAULT NULL,
  skills      JSONB             NOT NULL DEFAULT '[]'::jsonb,
  created_at  TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users (email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users (role);
