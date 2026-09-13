/**
 * CatalogPage — Script compartido para todas las páginas de catálogo
 * Renderiza la grilla de productos con filtros, sorting y eventos de carrito.
 */

const CatalogPage = (() => {
  let _section  = '';
  let _allProds = [];
  let _current  = 'all';
  let _sort     = 'default';

  function init(section) {
    _section  = section;
    _allProds = ProductService.getBySection(section);

    // Inyectar header y footer
    Header.render();
    Footer.render();

    // Inicializar servicios
    CartService.init();
    WishlistService.init();

    // Renderizar
    _renderProducts(_allProds);

    // Filtros
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        _current = chip.dataset.filter;
        document.querySelectorAll('.filter-chip').forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
        _applyFilters();
      });
    });

    // Ordenamiento
    const sortSel = document.getElementById('sort-select');
    if (sortSel) {
      sortSel.addEventListener('change', () => {
        _sort = sortSel.value;
        _applyFilters();
      });
    }

    // Newsletter
    const nlForm = document.getElementById('newsletter-form');
    if (nlForm) {
      nlForm.addEventListener('submit', (e) => {
        e.preventDefault();
        NotificationService.success('¡Suscripción exitosa!', '¡Gracias por unirte!');
        nlForm.reset();
      });
    }
  }

  function _applyFilters() {
    let result = FilterService.apply(_allProds, { category: _current, sortBy: _sort });
    _renderProducts(result);
  }

  function _renderProducts(products) {
    const grid     = document.getElementById('products-grid');
    const countEl  = document.getElementById('products-count');
    if (!grid) return;

    if (countEl) {
      countEl.textContent = `${products.length} producto${products.length !== 1 ? 's' : ''} encontrado${products.length !== 1 ? 's' : ''}`;
    }

    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:var(--space-20) 0; color:var(--text-muted)">
          <i class="fas fa-search" style="font-size:48px; opacity:0.2; display:block; margin-bottom:var(--space-4)"></i>
          <p style="font-size:var(--text-lg)">No hay productos en esta categoría.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map((p, i) => _buildCard(p, i)).join('');
    _bindCardEvents(grid);
  }

  function _buildCard(p, index) {
    const fmt  = ProductService.formatPrice;
    const disc = p.priceOriginal
      ? ProductService.getDiscountPercent(p.price, p.priceOriginal)
      : 0;
    const badgeMap = { 'NUEVO': 'badge-new', 'OFERTA': 'badge-sale', 'HOT': 'badge-hot' };
    const badgeClass = p.badge ? badgeMap[p.badge] || 'badge-new' : '';
    const inWishlist = WishlistService.has(p.id);
    const delay = Math.min((index % 4 + 1) * 100, 400);

    return `
      <article class="product-card hover-lift animate-fadeInUp delay-${delay}" role="listitem"
               data-product-id="${p.id}">
        <div class="product-card-img">
          ${p.badge ? `<span class="product-badge ${badgeClass}" aria-label="${p.badge}">${p.badge}</span>` : ''}
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <div class="product-card-overlay" aria-hidden="true">
            <button class="overlay-btn quick-view-btn" data-id="${p.id}"
                    aria-label="Vista rápida de ${p.name}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="overlay-btn cart-overlay-btn" data-id="${p.id}"
                    aria-label="Añadir ${p.name} al carrito">
              <i class="fas fa-shopping-bag"></i>
            </button>
          </div>
          <button class="wishlist-btn ${inWishlist ? 'active' : ''}" data-id="${p.id}"
                  aria-label="${inWishlist ? 'Quitar' : 'Añadir'} ${p.name} de lista de deseos"
                  aria-pressed="${inWishlist}">
            <i class="${inWishlist ? 'fas' : 'far'} fa-heart" aria-hidden="true"></i>
          </button>
        </div>
        <div class="product-card-body">
          <div class="product-card-category">${p.category}</div>
          <h3 class="product-card-name">${p.name}</h3>
          <div class="product-card-price">
            <span class="price-current">${fmt(p.price)}</span>
            ${p.priceOriginal ? `
              <span class="price-original">${fmt(p.priceOriginal)}</span>
              <span class="price-discount">-${disc}%</span>
            ` : ''}
          </div>
          <button class="btn-cart add-to-cart-btn" data-id="${p.id}"
                  aria-label="Añadir ${p.name} al carrito">
            <i class="fas fa-shopping-bag" aria-hidden="true"></i>
            Añadir al Carrito
          </button>
        </div>
      </article>
    `;
  }

  function _bindCardEvents(container) {
    // Click en imagen → modal
    container.querySelectorAll('.product-card-img, .quick-view-btn').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.wishlist-btn') || e.target.closest('.add-to-cart-btn')) return;
        const card = e.target.closest('[data-product-id]');
        if (card) ProductModal.open(parseInt(card.dataset.productId));
      });
    });

    // Carrito desde overlay
    container.querySelectorAll('.cart-overlay-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        ProductModal.open(id);
      });
    });

    // Añadir al carrito
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        ProductModal.open(id);
      });
    });

    // Wishlist
    container.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const product = ProductService.getById(id);
        if (!product) return;
        const added = WishlistService.toggle(product);
        const icon = btn.querySelector('i');
        btn.classList.toggle('active', added);
        btn.setAttribute('aria-pressed', String(added));
        if (icon) {
          icon.classList.toggle('far', !added);
          icon.classList.toggle('fas', added);
        }
        NotificationService.wishlistToggled(added, product.name);
      });
    });
  }

  return { init };
})();

window.CatalogPage = CatalogPage;
