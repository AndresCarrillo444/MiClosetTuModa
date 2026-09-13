CREATE DATABASE IF NOT EXISTS MiClosetTuModaDB;

USE MiClosetTuModaDB;

CREATE TABLE categorias (
    id_categoria INT NOT NULL AUTO_INCREMENT,
    nombre_categoria VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (id_categoria)
);

CREATE TABLE productos (
    id_producto INT NOT NULL AUTO_INCREMENT,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion_corta VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL,
    precio_oferta DECIMAL(10, 2) NULL, 
    imagen_url VARCHAR(255) NOT NULL,
    id_categoria INT NOT NULL,
    es_novedad BOOLEAN NOT NULL DEFAULT FALSE, 
    es_oferta BOOLEAN NOT NULL DEFAULT FALSE, 
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_producto),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

INSERT INTO categorias (nombre_categoria) VALUES
('Vestidos'),
('Blusas'),
('Pantalones'),
('Faldas'),
('Chaquetas'),
('Accesorios');

INSERT INTO productos (nombre_producto, descripcion_corta, precio, precio_oferta, imagen_url, id_categoria, es_novedad, es_oferta) VALUES
('Vestido Floral Verano', 'Vestido fresco y estampado ideal para la temporada.', 130000.00, NULL, 'imgs/Productos/dama/vestido.jpg', 1, TRUE, FALSE),
('Blusa Elegante de Seda', 'Blusa suave de seda, perfecta para ocasiones especiales.', 75000.00, NULL, 'imgs/Productos/dama/Blusa.jpeg', 2, FALSE, FALSE),
('Jeans de Mezclilla', 'Jeans de corte slim, cómodos y versátiles.', 250000.00, 150000.00, 'imgs/Productos/dama/Jean.jpg', 3, FALSE, TRUE),
('Falda Mini Plisada', 'Falda juvenil con pliegues, estilo colegial.', 120000.00, NULL, 'imgs/Productos/dama/Falda.jpg', 4, FALSE, FALSE),
('Abrigo de Invierno Largo', 'Abrigo de lana largo, ideal para el frío.', 250000.00, NULL, 'imgs/Productos/dama/chaqueta.jpeg', 5, FALSE, FALSE),
('Bolso de Cuero Premium', 'Bolso de mano de cuero genuino y diseño elegante.', 80000.00, NULL, 'imgs/Productos/dama/bolso.jpg', 6, TRUE, FALSE),
('Top de Encaje Negro', 'Top corto de encaje, ideal para un look de noche.', 60000.00, NULL, 'imgs/Productos/dama/tops.jpg', 2, FALSE, FALSE),
('Vestido de Noche Elegante', 'Vestido largo para eventos de gala.', 500000.00, 350000.00, 'imgs/Productos/dama/vestido elg.jpg', 1, FALSE, TRUE);