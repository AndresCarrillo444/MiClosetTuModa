/**
 * WishlistService — Microservicio de Lista de Deseos
 * Gestiona la wishlist con persistencia en localStorage.
 */

const WishlistService = (() => {
  const STORAGE_KEY = 'mctm_wishlist';
  let items = _load();

  function _load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function _save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent('wishlist:updated', {
      detail: { items: [...items], count: items.length }
    }));
  }

  return {
    getItems() { return [...items]; },
    getCount() { return items.length; },

    has(productId) {
      return items.some(i => i.id === productId);
    },

    toggle(product) {
      if (this.has(product.id)) {
        items = items.filter(i => i.id !== product.id);
        _save();
        return false; // removed
      } else {
        items.push({ id: product.id, name: product.name, img: product.img, price: product.price });
        _save();
        return true; // added
      }
    },

    add(product) {
      if (!this.has(product.id)) {
        items.push({ id: product.id, name: product.name, img: product.img, price: product.price });
        _save();
      }
    },

    remove(productId) {
      items = items.filter(i => i.id !== productId);
      _save();
    },

    clear() {
      items = [];
      _save();
    },

    init() {
      document.dispatchEvent(new CustomEvent('wishlist:updated', {
        detail: { items: [...items], count: items.length }
      }));
    }
  };
})();

window.WishlistService = WishlistService;
