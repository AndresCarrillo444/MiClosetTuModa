/**
 * CartService — Microservicio de Carrito de Compras
 * Gestiona el carrito con persistencia en localStorage.
 * Comunica cambios mediante Custom Events.
 */

const CartService = (() => {
  const STORAGE_KEY = 'mctm_cart';

  /* ─── Estado interno ─── */
  let items = _load();

  /* ─── Persistencia ─── */
  function _load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function _save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    _emit();
  }

  function _emit() {
    document.dispatchEvent(new CustomEvent('cart:updated', {
      detail: { items: [...items], count: _totalCount(), total: _totalPrice() }
    }));
  }

  /* ─── Cálculos ─── */
  function _totalCount() {
    return items.reduce((sum, i) => sum + i.quantity, 0);
  }

  function _totalPrice() {
    return items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  }

  function _findIndex(productId, size) {
    return items.findIndex(i => i.id === productId && i.size === size);
  }

  /* ─── API pública ─── */
  return {
    /**
     * Devuelve todos los items del carrito
     */
    getItems() {
      return [...items];
    },

    /**
     * Cantidad total de items en el carrito
     */
    getCount() {
      return _totalCount();
    },

    /**
     * Precio total del carrito
     */
    getTotal() {
      return _totalPrice();
    },

    /**
     * Añade un producto al carrito
     * @param {Object} product - El producto del catálogo
     * @param {string} size - La talla seleccionada
     * @param {number} qty - Cantidad a añadir (por defecto 1)
     */
    addItem(product, size = 'Única', qty = 1) {
      const idx = _findIndex(product.id, size);
      if (idx > -1) {
        items[idx].quantity += qty;
      } else {
        items.push({
          id:       product.id,
          name:     product.name,
          category: product.category,
          price:    product.price,
          img:      product.img,
          size:     size,
          quantity: qty
        });
      }
      _save();
      return true;
    },

    /**
     * Elimina un item del carrito por id y talla
     */
    removeItem(productId, size) {
      items = items.filter(i => !(i.id === productId && i.size === size));
      _save();
    },

    /**
     * Actualiza la cantidad de un item
     */
    updateQty(productId, size, qty) {
      const idx = _findIndex(productId, size);
      if (idx === -1) return;
      if (qty <= 0) {
        this.removeItem(productId, size);
      } else {
        items[idx].quantity = qty;
        _save();
      }
    },

    /**
     * Vacía el carrito completamente
     */
    clear() {
      items = [];
      _save();
    },

    /**
     * Genera el mensaje de WhatsApp con el resumen del pedido
     */
    generateWhatsAppMessage(phone = '+573142037066') {
      if (items.length === 0) return null;
      const lines = items.map(i =>
        `• ${i.name} (Talla: ${i.size}) x${i.quantity} = ${ProductService.formatPrice(i.price * i.quantity)}`
      );
      const total = ProductService.formatPrice(_totalPrice());
      const msg = encodeURIComponent(
        `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${lines.join('\n')}\n\n*Total: ${total}*\n\n¿Pueden confirmar disponibilidad?`
      );
      return `https://wa.me/${phone.replace(/\D/g,'')}?text=${msg}`;
    },

    /**
     * Fuerza emisión del evento (útil al cargar la página)
     */
    init() {
      _emit();
    }
  };
})();

window.CartService = CartService;
