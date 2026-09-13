/**
 * SearchOverlay Component
 * Overlay de búsqueda full-screen con resultados en tiempo real.
 */

const SearchOverlay = (() => {
  let mounted = false;

  function _render() {
    const html = `
      <div class="search-overlay" id="search-overlay" role="dialog"
           aria-modal="true" aria-label="Búsqueda de productos" aria-hidden="true">
        <div class="search-box">
          <div class="search-input-wrap">
            <i class="fas fa-search" aria-hidden="true"></i>
            <input type="search" id="search-input" placeholder="Busca productos, categorías..."
                   autocomplete="off" aria-label="Campo de búsqueda">
            <button class="search-close" id="search-close-btn" aria-label="Cerrar búsqueda">
              <i class="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div class="search-results" id="search-results" role="listbox"
             aria-label="Resultados de búsqueda"></div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    _bindEvents();
  }

  function _bindEvents() {
    const overlay  = document.getElementById('search-overlay');
    const input    = document.getElementById('search-input');
    const closeBtn = document.getElementById('search-close-btn');

    closeBtn.addEventListener('click', close);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => _runSearch(input.value), 250);
    });
  }

  function _runSearch(query) {
    const results = document.getElementById('search-results');
    if (!results) return;

    if (!query || query.trim().length < 2) {
      results.innerHTML = '';
      return;
    }

    const found = ProductService.search(query);

    if (found.length === 0) {
      results.innerHTML = `
        <p class="search-no-results">
          <i class="fas fa-search-minus"></i> No se encontraron resultados para "<strong>${query}</strong>"
        </p>
      `;
      return;
    }

    const PAGE_URLS = {
      mujer:      'mujer.html',
      hombre:     'hombre.html',
      ninos:      'niños.html',
      accesorios: 'accesorios.html'
    };

    results.innerHTML = found.slice(0, 8).map((p, i) => `
      <div class="search-result-item animate-fadeInUp delay-${Math.min((i+1)*100,500)}"
           role="option" tabindex="0"
           data-section="${p.section}" data-id="${p.id}"
           style="cursor:pointer">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="search-result-info">
          <h4>${p.name}</h4>
          <span>${ProductService.formatPrice(p.price)}</span>
        </div>
        <i class="fas fa-arrow-right" style="color:var(--clr-gray-400); margin-left:auto;" aria-hidden="true"></i>
      </div>
    `).join('');

    // Click en resultado
    results.querySelectorAll('.search-result-item').forEach(item => {
      const handler = () => {
        const section = item.dataset.section;
        const url = PAGE_URLS[section] || 'index.html';
        close();
        window.location.href = url;
      };
      item.addEventListener('click', handler);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') handler();
      });
    });
  }

  function open() {
    if (!mounted) { _render(); mounted = true; }
    const overlay = document.getElementById('search-overlay');
    const input   = document.getElementById('search-input');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    setTimeout(() => input && input.focus(), 100);
  }

  function close() {
    const overlay = document.getElementById('search-overlay');
    const results = document.getElementById('search-results');
    const input   = document.getElementById('search-input');
    if (overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }
    if (results) results.innerHTML = '';
    if (input)   input.value = '';
  }

  return { open, close };
})();

window.SearchOverlay = SearchOverlay;
