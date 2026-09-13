/**
 * Header Component
 * Inyecta el header unificado en todas las páginas.
 * Maneja: menú hamburguesa, búsqueda, badge del carrito,
 *         scroll shadow, y página activa.
 */

const Header = (() => {
  const NAV_LINKS = [
    { href: 'index.html',       label: 'Inicio',      key: 'index' },
    { href: 'mujer.html',       label: 'Mujer',       key: 'mujer' },
    { href: 'hombre.html',      label: 'Hombre',      key: 'hombre' },
    { href: 'niños.html',       label: 'Niños',       key: 'ninos' },
    { href: 'accesorios.html',  label: 'Accesorios',  key: 'accesorios' },
    { href: 'ofertas.html',     label: '🔥 Ofertas',  key: 'ofertas' },
  ];

  function _getActivePage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('mujer'))      return 'mujer';
    if (path.includes('hombre'))     return 'hombre';
    if (path.includes('ni'))         return 'ninos';
    if (path.includes('accesorios')) return 'accesorios';
    if (path.includes('ofertas'))    return 'ofertas';
    return 'index';
  }

  function _buildNavLinks(activePage) {
    return NAV_LINKS.map(link => `
      <li>
        <a href="${link.href}" class="${activePage === link.key ? 'active' : ''}"
           aria-current="${activePage === link.key ? 'page' : 'false'}">
          ${link.label}
        </a>
      </li>
    `).join('');
  }

  function _buildMobileLinks(activePage) {
    return NAV_LINKS.map(link => `
      <a href="${link.href}" class="${activePage === link.key ? 'active' : ''}">
        ${link.label}
      </a>
    `).join('');
  }

  function render(mountSelector = 'body') {
    const activePage = _getActivePage();
    const headerHTML = `
      <header class="site-header" id="site-header" role="banner">
        <div class="container">
          <div class="header-inner">
            <!-- Logo -->
            <a href="index.html" class="site-logo" aria-label="MiClosetTuModa - Inicio">
              MiCloset<span>TuModa</span>
            </a>

            <!-- Navegación principal -->
            <nav class="main-nav" aria-label="Navegación principal">
              <ul class="nav-list">
                ${_buildNavLinks(activePage)}
              </ul>
            </nav>

            <!-- Acciones del header -->
            <div class="header-actions">
              <button class="header-icon-btn" id="search-trigger"
                      aria-label="Abrir búsqueda" title="Buscar productos">
                <i class="fas fa-search" aria-hidden="true"></i>
              </button>
              <button class="header-icon-btn" id="cart-trigger"
                      aria-label="Abrir carrito" title="Ver carrito">
                <i class="fas fa-shopping-bag" aria-hidden="true"></i>
                <span class="cart-badge" id="cart-badge" aria-label="0 items en el carrito"
                      style="display:none">0</span>
              </button>
              <!-- Hamburger (mobile) -->
              <button class="hamburger" id="hamburger-btn"
                      aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-nav">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Menú móvil -->
        <nav class="mobile-nav" id="mobile-nav" aria-label="Navegación móvil" aria-hidden="true">
          ${_buildMobileLinks(activePage)}
        </nav>
      </header>
    `;

    // Insertar al inicio del body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    _bindEvents();
  }

  function _bindEvents() {
    const header     = document.getElementById('site-header');
    const hamburger  = document.getElementById('hamburger-btn');
    const mobileNav  = document.getElementById('mobile-nav');
    const searchBtn  = document.getElementById('search-trigger');
    const cartBtn    = document.getElementById('cart-trigger');

    /* ── Scroll shadow ── */
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Hamburger ── */
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
      document.body.classList.toggle('no-scroll', isOpen);
    });

    // Cerrar menú al hacer click en link
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });

    /* ── Búsqueda ── */
    searchBtn.addEventListener('click', () => {
      if (window.SearchOverlay) SearchOverlay.open();
    });

    /* ── Carrito ── */
    cartBtn.addEventListener('click', () => {
      if (window.CartSidebar) CartSidebar.open();
    });

    /* ── Actualizar badge del carrito ── */
    document.addEventListener('cart:updated', (e) => {
      const { count } = e.detail;
      const badge = document.getElementById('cart-badge');
      if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
        badge.setAttribute('aria-label', `${count} items en el carrito`);
        if (count > 0) badge.classList.add('animate-bounce');
        setTimeout(() => badge.classList.remove('animate-bounce'), 600);
      }
    });

    /* ── Cerrar con ESC ── */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (mobileNav.classList.contains('open')) {
          mobileNav.classList.remove('open');
          hamburger.classList.remove('open');
          document.body.classList.remove('no-scroll');
        }
      }
    });
  }

  return { render };
})();

window.Header = Header;
