/**
 * FilterService — Microservicio de Filtrado y Ordenamiento
 * Filtra y ordena arrays de productos según criterios seleccionados.
 */

const FilterService = (() => {
  return {
    /**
     * Filtra productos por categoría
     * @param {Array} products
     * @param {string} category - 'all' para todos
     */
    byCategory(products, category) {
      if (!category || category === 'all') return products;
      return products.filter(p => p.category === category);
    },

    /**
     * Filtra por badge
     * @param {string} badge - 'OFERTA' | 'NUEVO' | 'all'
     */
    byBadge(products, badge) {
      if (!badge || badge === 'all') return products;
      return products.filter(p => p.badge === badge);
    },

    /**
     * Filtra por rango de precios
     */
    byPriceRange(products, min, max) {
      return products.filter(p => p.price >= min && p.price <= max);
    },

    /**
     * Ordena productos
     * @param {string} sortBy - 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'new'
     */
    sort(products, sortBy) {
      const arr = [...products];
      switch (sortBy) {
        case 'price-asc':
          return arr.sort((a, b) => a.price - b.price);
        case 'price-desc':
          return arr.sort((a, b) => b.price - a.price);
        case 'name-asc':
          return arr.sort((a, b) => a.name.localeCompare(b.name));
        case 'new':
          return arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        case 'offer':
          return arr.sort((a, b) => (b.isOffer ? 1 : 0) - (a.isOffer ? 1 : 0));
        default:
          return arr;
      }
    },

    /**
     * Aplica filtro de categoría + ordenamiento
     */
    apply(products, { category = 'all', sortBy = 'default' } = {}) {
      let result = this.byCategory(products, category);
      result = this.sort(result, sortBy);
      return result;
    }
  };
})();

window.FilterService = FilterService;
