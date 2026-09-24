CREATE TABLE IF NOT EXISTS usuarios (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_email (email)
);

CREATE TABLE IF NOT EXISTS moradores (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  bloco VARCHAR(40) NULL,
  unidade VARCHAR(40) NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_moradores_unidade (bloco, unidade)
);

CREATE TABLE IF NOT EXISTS encomendas (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  morador_id BIGINT UNSIGNED NULL,
  codigo_rastreio VARCHAR(40) NULL,
  status ENUM('AGUARDANDO_RETIRADA', 'RETIRADA') NOT NULL DEFAULT 'AGUARDANDO_RETIRADA',
  descricao VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data_retirada TIMESTAMP NULL,
  retirada_por BIGINT UNSIGNED NULL,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_encomendas_codigo_rastreio (codigo_rastreio),
  CONSTRAINT fk_encomendas_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
  CONSTRAINT fk_encomendas_morador
    FOREIGN KEY (morador_id) REFERENCES moradores (id),
  CONSTRAINT fk_encomendas_retirada_por
    FOREIGN KEY (retirada_por) REFERENCES usuarios (id)
);

INSERT INTO usuarios (nome, email, senha_hash)
VALUES
  ('Joao da Silva', 'john@example.com', '$2b$10$VOQCfwo.p.b6jEFpg0F7fO4DRm.Gv8DYpoFZMp2WxQpbdvtpgoJ7u'),
  ('Maria Oliveira', 'maria@example.com', '$2b$10$xzFNXnlx08b2VW9PjfKCi.BmVipu.d.bo/roWnTnbb8Z41Z8.7Ysu')
ON DUPLICATE KEY UPDATE nome = VALUES(nome), senha_hash = VALUES(senha_hash);

INSERT INTO moradores (nome, bloco, unidade)
VALUES
  ('Joao da Silva', 'A', '101'),
  ('Maria Oliveira', 'B', '204'),
  ('Carlos Mendes', 'A', '302')
ON DUPLICATE KEY UPDATE nome = VALUES(nome);

INSERT INTO encomendas (usuario_id, morador_id, codigo_rastreio, status, descricao)
SELECT u.id, m.id, 'BR123456789', 'AGUARDANDO_RETIRADA', 'Documentos'
FROM usuarios u CROSS JOIN moradores m
WHERE u.email = 'john@example.com' AND m.unidade = '101'
  AND NOT EXISTS (SELECT 1 FROM encomendas WHERE codigo_rastreio = 'BR123456789');

INSERT INTO encomendas (usuario_id, morador_id, codigo_rastreio, status, descricao)
SELECT u.id, m.id, 'BR987654321', 'RETIRADA', 'Eletronicos'
FROM usuarios u CROSS JOIN moradores m
WHERE u.email = 'maria@example.com' AND m.unidade = '204'
  AND NOT EXISTS (SELECT 1 FROM encomendas WHERE codigo_rastreio = 'BR987654321');