/**
 * Footer Component
 * Inyecta el footer unificado en todas las páginas.
 */

const Footer = (() => {
  function render() {
    const footerHTML = `
      <footer class="site-footer" role="contentinfo">
        <div class="container">
          <div class="footer-grid">
            <!-- Marca -->
            <div class="footer-brand">
              <a href="index.html" class="site-logo" style="color:var(--clr-white);">MiCloset<span style="color:var(--clr-primary-light);">TuModa</span></a>
              <p>Tu tienda de confianza para encontrar las últimas tendencias en moda a precios increíbles. Envíos a todo Colombia.</p>
              <div class="social-links">
                <a href="https://www.facebook.com/micloset.tumoda.3" class="social-link"
                   aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
                <a href="https://www.instagram.com/mi_closet_tu_moda" class="social-link"
                   aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-instagram" aria-hidden="true"></i>
                </a>
                <a href="https://wa.me/+573142037066" class="social-link"
                   aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-whatsapp" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            <!-- Comprar -->
            <div class="footer-col">
              <h4>Tienda</h4>
              <nav class="footer-links" aria-label="Categorías de la tienda">
                <a href="mujer.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Mujer</a>
                <a href="hombre.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Hombre</a>
                <a href="niños.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Niños</a>
                <a href="accesorios.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Accesorios</a>
                <a href="ofertas.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Ofertas</a>
              </nav>
            </div>

            <div class="footer-col">
              <h4>Ayuda</h4>
              <nav class="footer-links" aria-label="Ayuda y soporte">
                <button class="footer-link-btn" onclick="HelpModal.open('faq')">
                  <i class="fas fa-chevron-right" aria-hidden="true"></i> Preguntas Frecuentes
                </button>
                <button class="footer-link-btn" onclick="HelpModal.open('envios')">
                  <i class="fas fa-chevron-right" aria-hidden="true"></i> Política de Envíos
                </button>
                <button class="footer-link-btn" onclick="HelpModal.open('devoluciones')">
                  <i class="fas fa-chevron-right" aria-hidden="true"></i> Devoluciones
                </button>
                <button class="footer-link-btn" onclick="HelpModal.open('pagos')">
                  <i class="fas fa-chevron-right" aria-hidden="true"></i> Medios de Pago
                </button>
                <button class="footer-link-btn" onclick="HelpModal.open('nosotros')">
                  <i class="fas fa-chevron-right" aria-hidden="true"></i> Sobre Nosotros
                </button>
                <a href="https://wa.me/+573142037066" target="_blank" rel="noopener noreferrer">
                  <i class="fas fa-chevron-right" aria-hidden="true"></i> Contacto
                </a>
              </nav>
            </div>

            <!-- Contacto -->
            <div class="footer-col">
              <h4>Contacto</h4>
              <div class="footer-contact-item">
                <i class="fas fa-phone" aria-hidden="true"></i>
                <span>+57 322 585 84 57</span>
              </div>
              <div class="footer-contact-item">
                <i class="fas fa-envelope" aria-hidden="true"></i>
                <span>feliperincon025@gmail.com</span>
              </div>
              <div class="footer-contact-item">
                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                <span>Colombia</span>
              </div>
              <div class="footer-contact-item" style="margin-top: 16px;">
                <a href="https://wa.me/+573142037066" target="_blank" rel="noopener noreferrer"
                   class="btn btn-primary btn-sm" style="text-decoration:none; border-radius: 50px;">
                  <i class="fab fa-whatsapp" aria-hidden="true"></i> Escríbenos
                </a>
              </div>
            </div>
          </div>

          <!-- Barra inferior -->
          <div class="footer-bottom">
            <p>© ${new Date().getFullYear()} MiClosetTuModa. Todos los derechos reservados.</p>
            <div class="footer-payment-icons" aria-label="Métodos de pago aceptados">
              <i class="fas fa-mobile-alt" aria-label="Bre-B" title="Bre-B"></i>
              <i class="fab fa-whatsapp" aria-label="WhatsApp" title="WhatsApp"></i>
              <i class="fas fa-money-bill-wave" aria-label="Efectivo" title="Efectivo contraentrega"></i>
            </div>
          </div>
        </div>
      </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  return { render };
})();

window.Footer = Footer;
