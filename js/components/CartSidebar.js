/**
 * CartSidebar Component
 * Sidebar deslizable que muestra el carrito.
 * Escucha eventos de CartService para actualizarse automáticamente.
 */

const CartSidebar = (() => {
  let mounted = false;

  function _render() {
    const html = `
      <div class="cart-overlay" id="cart-overlay" aria-hidden="true"></div>
      <aside class="cart-sidebar" id="cart-sidebar" role="complementary"
             aria-label="Carrito de compras" aria-hidden="true">
        <div class="cart-header">
          <h3><i class="fas fa-shopping-bag" aria-hidden="true"></i> Mi Carrito</h3>
          <button class="cart-close-btn" id="cart-close-btn" aria-label="Cerrar carrito">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div class="cart-items" id="cart-items-container"></div>
        <div class="cart-footer" id="cart-footer">
          <div class="cart-totals">
            <div class="cart-subtotal">
              <span>Subtotal</span><span id="cart-subtotal-val">$0</span>
            </div>
            <div class="cart-shipping">
              <span>Envío</span><span>A convenir</span>
            </div>
            <div class="cart-total">
              <span>Total</span><span id="cart-total-val">$0</span>
            </div>
          </div>
          <a href="#" id="cart-whatsapp-btn" target="_blank" rel="noopener noreferrer"
             class="btn-checkout" aria-label="Finalizar compra por WhatsApp">
            <i class="fab fa-whatsapp" aria-hidden="true"></i>
            Finalizar por WhatsApp
          </a>
        </div>
      </aside>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    _bindEvents();
  }

  function _bindEvents() {
    document.getElementById('cart-overlay').addEventListener('click', close);
    document.getElementById('cart-close-btn').addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.getElementById('cart-sidebar').classList.contains('open')) {
        close();
      }
    });

    // Escuchar actualizaciones del carrito
    document.addEventListener('cart:updated', _refreshUI);
  }

  function _refreshUI(e) {
    if (!mounted) return;
    const { items, total } = e.detail;
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const totalEl    = document.getElementById('cart-total-val');
    const waBtn      = document.getElementById('cart-whatsapp-btn');

    if (!container) return;

    const fmt = (p) => ProductService.formatPrice(p);

    if (items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-bag" aria-hidden="true"></i>
          <p>Tu carrito está vacío</p>
          <a href="index.html" class="btn btn-primary btn-sm" style="margin-top:8px">
            Explorar tienda
          </a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '$0';
      if (totalEl)    totalEl.textContent    = '$0';
      if (waBtn) waBtn.href = '#';
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}" loading="lazy">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-cat">Talla: ${item.size}</div>
          <div class="cart-item-price">${fmt(item.price)}</div>
          <div class="cart-item-actions">
            <button class="qty-btn qty-minus" aria-label="Disminuir cantidad"
                    data-id="${item.id}" data-size="${item.size}">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn qty-plus" aria-label="Aumentar cantidad"
                    data-id="${item.id}" data-size="${item.size}">+</button>
            <button class="cart-remove" aria-label="Eliminar ${item.name}"
                    data-id="${item.id}" data-size="${item.size}">
              <i class="fas fa-trash-alt" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Subtotal y total
    if (subtotalEl) subtotalEl.textContent = fmt(total);
    if (totalEl)    totalEl.textContent    = fmt(total);

    // WhatsApp link
    if (waBtn) {
      const waUrl = CartService.generateWhatsAppMessage();
      waBtn.href = waUrl || '#';
    }

    // Eventos de cantidades
    container.querySelectorAll('.qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id   = parseInt(btn.dataset.id);
        const size = btn.dataset.size;
        const item = CartService.getItems().find(i => i.id === id && i.size === size);
        if (item) CartService.updateQty(id, size, item.quantity - 1);
      });
    });
    container.querySelectorAll('.qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id   = parseInt(btn.dataset.id);
        const size = btn.dataset.size;
        const item = CartService.getItems().find(i => i.id === id && i.size === size);
        if (item) CartService.updateQty(id, size, item.quantity + 1);
      });
    });
    container.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        CartService.removeItem(parseInt(btn.dataset.id), btn.dataset.size);
        NotificationService.info('Producto eliminado', '');
      });
    });
  }

  function open() {
    if (!mounted) { _render(); mounted = true; }
    const sidebar  = document.getElementById('cart-sidebar');
    const overlay  = document.getElementById('cart-overlay');
    sidebar.classList.add('open');
    overlay.classList.add('open');
    sidebar.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    // Actualizar con datos actuales
    const items = CartService.getItems();
    const total = CartService.getTotal();
    document.dispatchEvent(new CustomEvent('cart:updated', {
      detail: { items, count: CartService.getCount(), total }
    }));
  }

  function close() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (sidebar) {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      sidebar.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }
  }

  return { open, close };
})();

window.CartSidebar = CartSidebar;
