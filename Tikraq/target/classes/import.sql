INSERT INTO roles (nombre) VALUES ('ADMIN');
INSERT INTO roles (nombre) VALUES ('FREE');
INSERT INTO roles (nombre) VALUES ('SUSCRIPTOR');
INSERT INTO roles (nombre) VALUES ('PREMIUM');
INSERT INTO usuarios(correo_electronico, contrasenia) VALUES ('admin@gmail.com','$2a$12$phtzGgqS1QyOYM8yysn5reezzLbFKI6YsC4vtxK/doTCiU4hVAena');
INSERT INTO usuario_roles (usuario_id, role_id) VALUES (1, 1);
