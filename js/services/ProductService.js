/**
 * ProductService — Microservicio de Catálogo
 * Fuente central de verdad para todos los productos.
 * Expone métodos para obtener, filtrar y buscar productos.
 */

const ProductService = (() => {
  /* ─── Catálogo completo ─── */
  const CATALOG = [
    /* ──── MUJER ──── */
    {
      id: 1, name: 'Vestido Floral Verano', category: 'Vestidos', section: 'mujer',
      price: 130000, priceOriginal: null,
      img: 'imgs/Productos/dama/vestido.jpg',
      description: 'Vestido fresco y estampado con flores tropicales, ideal para la temporada. Tela liviana de algodón con corte midi.',
      badge: 'NUEVO', sizes: ['XS','S','M','L','XL'], isNew: true, isOffer: false
    },
    {
      id: 2, name: 'Blusa Elegante de Seda', category: 'Blusas', section: 'mujer',
      price: 75000, priceOriginal: null,
      img: 'imgs/Productos/dama/Blusa.jpeg',
      description: 'Blusa suave de seda artificial, perfecta para ocasiones especiales o el trabajo. Cuello en V con detalle de perlas.',
      badge: null, sizes: ['XS','S','M','L'], isNew: false, isOffer: false
    },
    {
      id: 3, name: 'Jeans de Mezclilla Slim', category: 'Pantalones', section: 'mujer',
      price: 150000, priceOriginal: 250000,
      img: 'imgs/Productos/dama/Jean.jpg',
      description: 'Jeans de corte slim, cómodos y versátiles. Lavado medio con detalles desgastados.',
      badge: 'OFERTA', sizes: ['XS','S','M','L','XL','XXL'], isNew: false, isOffer: true
    },
    {
      id: 4, name: 'Falda Mini Plisada', category: 'Faldas', section: 'mujer',
      price: 120000, priceOriginal: null,
      img: 'imgs/Productos/dama/Falda.jpg',
      description: 'Falda juvenil con pliegues, estilo colegial. Perfecta para combinar con tops o blusas.',
      badge: null, sizes: ['XS','S','M','L'], isNew: false, isOffer: false
    },
    {
      id: 5, name: 'Abrigo de Invierno Largo', category: 'Chaquetas', section: 'mujer',
      price: 250000, priceOriginal: null,
      img: 'imgs/Productos/dama/chaqueta.jpeg',
      description: 'Abrigo de lana largo, ideal para el frío. Corte clásico con botones dorados.',
      badge: null, sizes: ['S','M','L','XL'], isNew: false, isOffer: false
    },
    {
      id: 6, name: 'Bolso de Cuero Premium', category: 'Accesorios', section: 'mujer',
      price: 80000, priceOriginal: null,
      img: 'imgs/Productos/dama/bolso.jpg',
      description: 'Bolso de mano de cuero genuino y diseño elegante. Capacidad media con compartimentos internos.',
      badge: 'NUEVO', sizes: ['Única'], isNew: true, isOffer: false
    },
    {
      id: 7, name: 'Top de Encaje Negro', category: 'Blusas', section: 'mujer',
      price: 60000, priceOriginal: null,
      img: 'imgs/Productos/dama/tops.jpg',
      description: 'Top corto de encaje, ideal para un look de noche. Tela suave con forro interior.',
      badge: null, sizes: ['XS','S','M','L'], isNew: false, isOffer: false
    },
    {
      id: 8, name: 'Vestido de Noche Elegante', category: 'Vestidos', section: 'mujer',
      price: 350000, priceOriginal: 500000,
      img: 'imgs/Productos/dama/vestido elg.jpg',
      description: 'Vestido largo para eventos de gala. Corte sirena con tela brillante y cremallera trasera.',
      badge: 'OFERTA', sizes: ['XS','S','M','L','XL'], isNew: false, isOffer: true
    },

    /* ──── HOMBRE ──── */
    {
      id: 9, name: 'Camisa de Lino', category: 'Camisas', section: 'hombre',
      price: 75000, priceOriginal: null,
      img: 'imgs/Productos/caballero/CamisaLino.jpg',
      description: 'Camisa de lino transpirable, ideal para clima cálido. Corte regular con cuello clásico.',
      badge: null, sizes: ['S','M','L','XL','XXL'], isNew: false, isOffer: false
    },
    {
      id: 10, name: 'Camisa Ligera Casual', category: 'Camisas', section: 'hombre',
      price: 65000, priceOriginal: null,
      img: 'imgs/Productos/caballero/Camisa ligera.jpg',
      description: 'Camisa casual de algodón ligero para el día a día. Estampado discreto y moderno.',
      badge: 'NUEVO', sizes: ['S','M','L','XL'], isNew: true, isOffer: false
    },
    {
      id: 11, name: 'Pantalón Cargo', category: 'Pantalones', section: 'hombre',
      price: 120000, priceOriginal: 160000,
      img: 'imgs/Productos/caballero/Cargo.jpg',
      description: 'Pantalón cargo con múltiples bolsillos, perfecto para el street style. Tela resistente.',
      badge: 'OFERTA', sizes: ['S','M','L','XL','XXL'], isNew: false, isOffer: true
    },
    {
      id: 12, name: 'Hoodie Oversize', category: 'Hoodies', section: 'hombre',
      price: 95000, priceOriginal: null,
      img: 'imgs/Productos/caballero/Hoodie para hombre.jpg',
      description: 'Hoodie oversize de algodón grueso con capucha ajustable. Ideal para el frío.',
      badge: 'NUEVO', sizes: ['S','M','L','XL','XXL'], isNew: true, isOffer: false
    },
    {
      id: 13, name: 'Pantaloneta Deportiva', category: 'Pantalones', section: 'hombre',
      price: 55000, priceOriginal: null,
      img: 'imgs/Productos/caballero/Pantaloneta.webp',
      description: 'Pantaloneta deportiva de secado rápido, perfecta para ejercicio o playa.',
      badge: null, sizes: ['S','M','L','XL'], isNew: false, isOffer: false
    },
    {
      id: 14, name: 'Chaqueta Bomber', category: 'Chaquetas', section: 'hombre',
      price: 180000, priceOriginal: 240000,
      img: 'imgs/Productos/caballero/chaqueta.jpg',
      description: 'Chaqueta bomber premium con forro interior. Estilo urbano y versátil.',
      badge: 'OFERTA', sizes: ['S','M','L','XL'], isNew: false, isOffer: true
    },
    {
      id: 15, name: 'Cadena de Acero', category: 'Accesorios', section: 'hombre',
      price: 45000, priceOriginal: null,
      img: 'imgs/Productos/caballero/cadena.jpg',
      description: 'Cadena de acero inoxidable, resistente y elegante. Eslabón cubano.',
      badge: null, sizes: ['Única'], isNew: false, isOffer: false
    },

    /* ──── NIÑOS ──── */
    {
      id: 16, name: 'Conjunto Niño Casual', category: 'Conjuntos', section: 'ninos',
      price: 80000, priceOriginal: null,
      img: 'imgs/Productos/niño/Conjunto niño.jpg',
      description: 'Conjunto de camiseta y pantalón para niño, cómodo y colorido.',
      badge: 'NUEVO', sizes: ['2-3','4-5','6-7','8-9','10-11'], isNew: true, isOffer: false
    },
    {
      id: 17, name: 'Vestido de Niña', category: 'Vestidos', section: 'ninos',
      price: 70000, priceOriginal: null,
      img: 'imgs/Productos/niño/Vestido de niña.jpg',
      description: 'Vestido floral para niña, con lazo en la cintura. Tela suave y fresca.',
      badge: null, sizes: ['2-3','4-5','6-7','8-9'], isNew: false, isOffer: false
    },
    {
      id: 18, name: 'Conjunto Niña', category: 'Conjuntos', section: 'ninos',
      price: 85000, priceOriginal: 110000,
      img: 'imgs/Productos/niño/Conjunto niña.jpg',
      description: 'Conjunto de blusa y falda para niña. Diseño trendy y cómodo.',
      badge: 'OFERTA', sizes: ['2-3','4-5','6-7','8-9'], isNew: false, isOffer: true
    },
    {
      id: 19, name: 'Chaqueta Niña', category: 'Chaquetas', section: 'ninos',
      price: 95000, priceOriginal: null,
      img: 'imgs/Productos/niño/Chaqueta Niña.jpg',
      description: 'Chaqueta abrigada para niña con cierre y capucha removible.',
      badge: null, sizes: ['2-3','4-5','6-7','8-9','10-11'], isNew: false, isOffer: false
    },
    {
      id: 20, name: 'Camiseta Polo Niño', category: 'Camisas', section: 'ninos',
      price: 45000, priceOriginal: null,
      img: 'imgs/Productos/niño/Camiseta Polo.jpg',
      description: 'Camiseta polo de algodón para niño. Elegante y cómoda para toda ocasión.',
      badge: null, sizes: ['2-3','4-5','6-7','8-9','10-11'], isNew: false, isOffer: false
    },
    {
      id: 21, name: 'Blusa Informal Niña', category: 'Blusas', section: 'ninos',
      price: 40000, priceOriginal: 55000,
      img: 'imgs/Productos/niño/Blusa informal.jpg',
      description: 'Blusa informal con estampado divertido para niña. Fresca y colorida.',
      badge: 'OFERTA', sizes: ['2-3','4-5','6-7','8-9'], isNew: false, isOffer: true
    },
    {
      id: 22, name: 'Pantalón Niño', category: 'Pantalones', section: 'ninos',
      price: 60000, priceOriginal: null,
      img: 'imgs/Productos/niño/Pantalon niño.jpg',
      description: 'Pantalón casual para niño con cinturilla elástica cómoda.',
      badge: null, sizes: ['2-3','4-5','6-7','8-9','10-11'], isNew: false, isOffer: false
    },

    /* ──── ACCESORIOS ──── */
    {
      id: 23, name: 'Anillo Elegante', category: 'Joyería', section: 'accesorios',
      price: 35000, priceOriginal: null,
      img: 'imgs/Productos/accesorios/Anillo.jpg',
      description: 'Anillo de acero inoxidable con piedra central. Diseño minimalista y elegante.',
      badge: 'NUEVO', sizes: ['6','7','8','9'], isNew: true, isOffer: false
    },
    {
      id: 24, name: 'Cadena Mujer Dorada', category: 'Joyería', section: 'accesorios',
      price: 42000, priceOriginal: 60000,
      img: 'imgs/Productos/accesorios/Cadena mujer.jpg',
      description: 'Cadena dorada delicada con dije central. Baño de oro 18k.',
      badge: 'OFERTA', sizes: ['40cm','45cm','50cm'], isNew: false, isOffer: true
    },
    {
      id: 25, name: 'Gafas Y2K', category: 'Gafas', section: 'accesorios',
      price: 38000, priceOriginal: null,
      img: 'imgs/Productos/accesorios/Gafas y2k.jpg',
      description: 'Gafas estilo Y2K con montura colorida y lentes con tinte.',
      badge: 'HOT', sizes: ['Única'], isNew: false, isOffer: false
    },
    {
      id: 26, name: 'Gafas Y2K Rosas', category: 'Gafas', section: 'accesorios',
      price: 38000, priceOriginal: null,
      img: 'imgs/Productos/accesorios/Gafas y2k r.jpg',
      description: 'Gafas Y2K en tonos rosa con lentes degradados. Tendencia de temporada.',
      badge: null, sizes: ['Única'], isNew: false, isOffer: false
    },
    {
      id: 27, name: 'Moño Satinado', category: 'Cabello', section: 'accesorios',
      price: 22000, priceOriginal: null,
      img: 'imgs/Productos/accesorios/Moño.jpg',
      description: 'Moño satinado para el cabello, perfecto para looks elegantes o casuales.',
      badge: null, sizes: ['Única'], isNew: false, isOffer: false
    },
    {
      id: 28, name: 'Pulsera de Cuentas', category: 'Joyería', section: 'accesorios',
      price: 28000, priceOriginal: 40000,
      img: 'imgs/Productos/accesorios/Pulsera.jpg',
      description: 'Pulsera de cuentas de colores. Ajustable y resistente al agua.',
      badge: 'OFERTA', sizes: ['Ajustable'], isNew: false, isOffer: true
    }
  ];

  /* ─── API pública ─── */
  return {
    /**
     * Devuelve todos los productos
     */
    getAll() {
      return [...CATALOG];
    },

    /**
     * Devuelve productos de una sección (mujer, hombre, ninos, accesorios)
     */
    getBySection(section) {
      return CATALOG.filter(p => p.section === section);
    },

    /**
     * Devuelve productos de una categoría
     */
    getByCategory(category) {
      return CATALOG.filter(p => p.category === category);
    },

    /**
     * Devuelve solo productos en oferta
     */
    getOffers() {
      return CATALOG.filter(p => p.isOffer);
    },

    /**
     * Devuelve solo novedades
     */
    getNew() {
      return CATALOG.filter(p => p.isNew);
    },

    /**
     * Devuelve un producto por ID
     */
    getById(id) {
      return CATALOG.find(p => p.id === id) || null;
    },

    /**
     * Busca productos por nombre o categoría (insensible a mayúsculas)
     */
    search(query) {
      if (!query || query.trim().length < 2) return [];
      const q = query.toLowerCase().trim();
      return CATALOG.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.section.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    },

    /**
     * Obtiene categorías únicas de una sección
     */
    getCategoriesBySection(section) {
      const products = section ? this.getBySection(section) : CATALOG;
      return [...new Set(products.map(p => p.category))];
    },

    /**
     * Formatea un precio en pesos colombianos
     */
    formatPrice(price) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price);
    },

    /**
     * Calcula el porcentaje de descuento
     */
    getDiscountPercent(price, original) {
      if (!original) return 0;
      return Math.round(((original - price) / original) * 100);
    }
  };
})();

// Exportar globalmente
window.ProductService = ProductService;
