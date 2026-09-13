/**
 * ProductModal Component
 * Modal de detalle de producto: imagen, talla, descripción, carrito.
 */

const ProductModal = (() => {
  let mounted  = false;
  let currentProduct = null;
  let selectedSize   = null;
  let currentQty     = 1;

  function _render() {
    const html = `
      <div class="modal-overlay" id="product-modal-overlay" role="dialog"
           aria-modal="true" aria-label="Detalle del producto" aria-hidden="true">
        <div class="product-modal animate-scaleIn" id="product-modal" role="document">
          <button class="modal-close" id="modal-close-btn" aria-label="Cerrar modal">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
          <div class="modal-img-col" id="modal-img-col">
            <img id="modal-product-img" src="" alt="" loading="lazy">
          </div>
          <div class="modal-info-col">
            <div class="modal-category" id="modal-product-cat"></div>
            <h2 class="modal-title" id="modal-product-name"></h2>
            <div class="modal-price" id="modal-product-price"></div>
            <p class="modal-description" id="modal-product-desc"></p>
            <div class="modal-sizes" id="modal-sizes-section">
              <label id="modal-sizes-label">Selecciona una talla:</label>
              <div class="size-options" id="modal-size-options"></div>
            </div>
            <div class="modal-actions">
              <div class="modal-qty">
                <button class="modal-qty-btn" id="modal-qty-minus" aria-label="Disminuir cantidad">−</button>
                <span class="modal-qty-value" id="modal-qty-value">1</span>
                <button class="modal-qty-btn" id="modal-qty-plus" aria-label="Aumentar cantidad">+</button>
              </div>
              <button class="btn-add-modal" id="modal-add-cart">
                <i class="fas fa-shopping-bag" aria-hidden="true"></i>
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    _bindEvents();
  }

  function _bindEvents() {
    document.getElementById('modal-close-btn').addEventListener('click', close);
    document.getElementById('product-modal-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'product-modal-overlay') close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    document.getElementById('modal-qty-minus').addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        document.getElementById('modal-qty-value').textContent = currentQty;
      }
    });
    document.getElementById('modal-qty-plus').addEventListener('click', () => {
      currentQty++;
      document.getElementById('modal-qty-value').textContent = currentQty;
    });

    document.getElementById('modal-add-cart').addEventListener('click', () => {
      if (!currentProduct) return;
      if (!selectedSize && currentProduct.sizes.length > 1) {
        NotificationService.warning('Elige una talla', 'Por favor selecciona una talla antes de añadir al carrito.');
        return;
      }
      const size = selectedSize || currentProduct.sizes[0];
      CartService.addItem(currentProduct, size, currentQty);
      NotificationService.cartAdded(currentProduct.name);
      close();
    });
  }

  function _populateModal(product) {
    currentProduct = product;
    selectedSize   = product.sizes.length === 1 ? product.sizes[0] : null;
    currentQty     = 1;

    document.getElementById('modal-product-img').src = product.img;
    document.getElementById('modal-product-img').alt = product.name;
    document.getElementById('modal-product-cat').textContent  = product.category;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-desc').textContent = product.description;
    document.getElementById('modal-qty-value').textContent = '1';

    // Precio
    const fmt = ProductService.formatPrice;
    let priceHTML = `<span class="price-current">${fmt(product.price)}</span>`;
    if (product.priceOriginal) {
      const disc = ProductService.getDiscountPercent(product.price, product.priceOriginal);
      priceHTML += `
        <span class="price-original">${fmt(product.priceOriginal)}</span>
        <span class="price-discount">-${disc}%</span>
      `;
    }
    document.getElementById('modal-product-price').innerHTML = priceHTML;

    // Tallas
    const sizeOptions = document.getElementById('modal-size-options');
    sizeOptions.innerHTML = product.sizes.map(sz => `
      <button class="size-chip ${selectedSize === sz ? 'selected' : ''}"
              data-size="${sz}" aria-pressed="${selectedSize === sz}">${sz}</button>
    `).join('');

    sizeOptions.querySelectorAll('.size-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        sizeOptions.querySelectorAll('.size-chip').forEach(c => {
          c.classList.remove('selected');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('selected');
        chip.setAttribute('aria-pressed', 'true');
        selectedSize = chip.dataset.size;
      });
    });
  }

  function open(productId) {
    const product = ProductService.getById(productId);
    if (!product) return;

    if (!mounted) { _render(); mounted = true; }

    _populateModal(product);

    const overlay = document.getElementById('product-modal-overlay');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    document.getElementById('modal-close-btn').focus();
  }

  function close() {
    const overlay = document.getElementById('product-modal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }
    currentProduct = null;
    selectedSize   = null;
    currentQty     = 1;
  }

  return { open, close };
})();

window.ProductModal = ProductModal;
