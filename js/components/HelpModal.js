/**
 * HelpModal — Componente de Modales de Ayuda
 * Gestiona todos los modales informativos del footer:
 * FAQ, Envíos, Devoluciones, Sobre Nosotros, Medios de Pago.
 */

const HelpModal = (() => {
  let mounted = false;

  /* ════════════════════════════════════════
     CONTENIDOS DE CADA MODAL
  ════════════════════════════════════════ */
  const CONTENT = {

    envios: {
      icon: 'fa-truck',
      title: 'Política de Envíos',
      body: `
        <div class="hm-section">
          <div class="hm-highlight">
            <i class="fas fa-gift"></i>
            <span><strong>Envío GRATIS</strong> en compras desde <strong>$200.000 COP</strong></span>
          </div>
        </div>

        <div class="hm-section">
          <h4><i class="fas fa-map-marker-alt"></i> Cobertura</h4>
          <p>Hacemos envíos a <strong>toda Colombia</strong> 🇨🇴. Trabajamos con empresas de mensajería confiables para garantizar que tu pedido llegue en perfectas condiciones sin importar tu ubicación.</p>
        </div>

        <div class="hm-section">
          <h4><i class="fas fa-dollar-sign"></i> Costo de envío</h4>
          <div class="hm-table">
            <div class="hm-row hm-row-header">
              <span>Zona</span><span>Costo</span>
            </div>
            <div class="hm-row">
              <span>🏙️ Bogotá y Madrid (Cundinamarca)</span>
              <span class="hm-free">¡Gratis!</span>
            </div>
            <div class="hm-row">
              <span>📦 Resto de Colombia</span>
              <span>Varía según destino</span>
            </div>
          </div>
          <p class="hm-note">* El costo exacto para tu ciudad se calcula al momento de finalizar tu pedido por WhatsApp.</p>
        </div>

        <div class="hm-section">
          <h4><i class="fas fa-clock"></i> Tiempo de entrega</h4>
          <div class="hm-chips">
            <div class="hm-chip">
              <span class="hm-chip-value">1–3</span>
              <span class="hm-chip-label">Días hábiles<br>Bogotá y Madrid</span>
            </div>
            <div class="hm-chip">
              <span class="hm-chip-value">3–7</span>
              <span class="hm-chip-label">Días hábiles<br>Resto del país</span>
            </div>
          </div>
        </div>

        <div class="hm-section">
          <h4><i class="fas fa-info-circle"></i> ¿Cómo funciona?</h4>
          <ol class="hm-steps">
            <li>Agrega tus productos al carrito y contáctanos por WhatsApp.</li>
            <li>Te confirmamos disponibilidad y el costo de envío a tu ciudad.</li>
            <li>Realizas el pago y gestionamos el envío.</li>
            <li>Te compartimos el número de guía para que puedas rastrear tu pedido.</li>
          </ol>
        </div>
      `
    },

    devoluciones: {
      icon: 'fa-undo',
      title: 'Política de Devoluciones',
      body: `
        <div class="hm-section">
          <div class="hm-highlight hm-highlight-green">
            <i class="fas fa-shield-alt"></i>
            <span>Tu satisfacción es nuestra prioridad. Aceptamos devoluciones de <strong>15 a 20 días calendario</strong> tras recibir tu pedido.</span>
          </div>
        </div>

        <div class="hm-section">
          <h4><i class="fas fa-check-circle"></i> Condiciones para la devolución</h4>
          <ul class="hm-list">
            <li><i class="fas fa-check"></i> <span>El producto debe estar <strong>sin usar</strong> y en las mismas condiciones en que lo recibiste.</span></li>
            <li><i class="fas fa-check"></i> <span>Debe conservar sus <strong>etiquetas originales</strong>.</span></li>
            <li><i class="fas fa-check"></i> <span>Debe estar en su <strong>empaque original</strong>.</span></li>
            <li><i class="fas fa-check"></i> <span>Se debe presentar el <strong>comprobante de compra</strong> (captura de la conversación de WhatsApp).</span></li>
          </ul>
        </div>

        <div class="hm-section">
          <h4><i class="fas fa-times-circle"></i> No aplica devolución si...</h4>
          <ul class="hm-list hm-list-red">
            <li><i class="fas fa-times"></i> <span>El producto fue usado o lavado.</span></li>
            <li><i class="fas fa-times"></i> <span>Le fueron retiradas las etiquetas.</span></li>
            <li><i class="fas fa-times"></i> <span>Han pasado más de 20 días desde que recibiste tu pedido.</span></li>
            <li><i class="fas fa-times"></i> <span>El producto tiene daños causados por mal uso.</span></li>
          </ul>
        </div>

        <div class="hm-section">
          <h4><i class="fas fa-comments"></i> ¿Cómo solicitar una devolución?</h4>
          <ol class="hm-steps">
            <li>Contáctanos por WhatsApp dentro del plazo indicado.</li>
            <li>Comparte fotos del producto y tu comprobante de compra.</li>
            <li>Te indicamos el proceso a seguir para el envío de devolución.</li>
            <li>Una vez recibido e inspeccionado el producto, procesamos el reembolso o cambio.</li>
          </ol>
          <div style="text-align:center; margin-top: var(--space-5);">
            <a href="https://wa.me/+573142037066" target="_blank" rel="noopener noreferrer"
               class="btn btn-primary" style="text-decoration:none;">
              <i class="fab fa-whatsapp"></i> Solicitar devolución
            </a>
          </div>
        </div>
      `
    },

    faq: {
      icon: 'fa-question-circle',
      title: 'Preguntas Frecuentes',
      body: `
        <div class="hm-accordion">

          <details class="hm-faq-item" open>
            <summary class="hm-faq-q">
              <i class="fas fa-chevron-right hm-arrow"></i>
              ¿Cómo hago un pedido?
            </summary>
            <div class="hm-faq-a">
              Es muy sencillo: agrega los productos que deseas al carrito y haz clic en <strong>"Finalizar por WhatsApp"</strong>. Te enviaremos un mensaje pre-armado con tu pedido al que solo debes darle enviar. Nuestro equipo confirmará disponibilidad y te guiará en el proceso de pago.
            </div>
          </details>

          <details class="hm-faq-item">
            <summary class="hm-faq-q">
              <i class="fas fa-chevron-right hm-arrow"></i>
              ¿Cuáles son los medios de pago?
            </summary>
            <div class="hm-faq-a">
              Aceptamos pagos por <strong>Bre-B</strong> (transferencias digitales), <strong>efectivo contraentrega</strong> (en zonas disponibles) y <strong>transferencias bancarias</strong>. Por el momento <em>no procesamos pagos con tarjeta de crédito/débito</em>.
            </div>
          </details>

          <details class="hm-faq-item">
            <summary class="hm-faq-q">
              <i class="fas fa-chevron-right hm-arrow"></i>
              ¿Cuánto demora en llegar mi pedido?
            </summary>
            <div class="hm-faq-a">
              En <strong>Bogotá y Madrid (Cundinamarca)</strong> el tiempo de entrega es de <strong>1 a 3 días hábiles</strong>. Para el resto del país puede tardar entre 3 y 7 días hábiles dependiendo de tu municipio.
            </div>
          </details>

          <details class="hm-faq-item">
            <summary class="hm-faq-q">
              <i class="fas fa-chevron-right hm-arrow"></i>
              ¿El envío tiene costo?
            </summary>
            <div class="hm-faq-a">
              El envío es <strong>gratuito en Bogotá y Madrid</strong> para todos los pedidos. En el resto de Colombia, el costo varía según tu ubicación. Además, si tu compra supera los <strong>$200.000 COP</strong>, ¡el envío es gratis a todo el país!
            </div>
          </details>

          <details class="hm-faq-item">
            <summary class="hm-faq-q">
              <i class="fas fa-chevron-right hm-arrow"></i>
              ¿Puedo cambiar o devolver un producto?
            </summary>
            <div class="hm-faq-a">
              Sí. Tienes <strong>15 a 20 días calendario</strong> desde que recibes tu pedido para solicitar un cambio o devolución. El producto debe estar sin usar, con sus etiquetas y en el empaque original. Contáctanos por WhatsApp para iniciar el proceso.
            </div>
          </details>

          <details class="hm-faq-item">
            <summary class="hm-faq-q">
              <i class="fas fa-chevron-right hm-arrow"></i>
              ¿Tienen tallas para todos los cuerpos?
            </summary>
            <div class="hm-faq-a">
              Manejamos tallas desde <strong>XS hasta XXL</strong> en la mayoría de nuestras prendas. En cada producto encontrarás las tallas disponibles. Si tienes dudas sobre la guía de tallas, escríbenos y te ayudamos a elegir la correcta.
            </div>
          </details>

          <details class="hm-faq-item">
            <summary class="hm-faq-q">
              <i class="fas fa-chevron-right hm-arrow"></i>
              ¿Cómo sé que mi pedido fue confirmado?
            </summary>
            <div class="hm-faq-a">
              Una vez que te contactes por WhatsApp y realices el pago, te enviaremos una <strong>confirmación de tu pedido</strong> con el resumen de compra y el número de guía de envío cuando esté listo para despachar.
            </div>
          </details>

        </div>
      `
    },

    pagos: {
      icon: 'fa-credit-card',
      title: 'Medios de Pago',
      body: `
        <div class="hm-section">
          <div class="hm-highlight">
            <i class="fas fa-lock"></i>
            <span>Todos nuestros procesos de pago son seguros y verificados. Siempre recibirás confirmación de tu transacción.</span>
          </div>
        </div>

        <div class="hm-section">
          <div class="hm-payment-card hm-payment-main">
            <div class="hm-payment-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <div class="hm-payment-info">
              <h4>Bre-B <span class="hm-badge-new">Recomendado</span></h4>
              <p>Transferencias digitales rápidas y seguras a través de la plataforma Bre-B.</p>
              <div class="hm-key-box">
                <span class="hm-key-label"><i class="fas fa-key"></i> Llave de pago:</span>
                <span class="hm-key-value" id="breb-key">3225858457</span>
                <button class="hm-copy-btn" onclick="HelpModal.copyKey()" aria-label="Copiar llave">
                  <i class="fas fa-copy"></i> Copiar
                </button>
              </div>
            </div>
          </div>

          <div class="hm-payment-card">
            <div class="hm-payment-icon" style="background: #e8f5e9; color: #2e7d32;">
              <i class="fas fa-money-bill-wave"></i>
            </div>
            <div class="hm-payment-info">
              <h4>Efectivo Contraentrega</h4>
              <p>Paga en efectivo al momento de recibir tu pedido. Disponible en zonas seleccionadas de <strong>Bogotá y Madrid</strong>. Consultanos antes de confirmar esta opción.</p>
            </div>
          </div>

          <div class="hm-payment-card">
            <div class="hm-payment-icon" style="background: #e3f2fd; color: #1565c0;">
              <i class="fas fa-exchange-alt"></i>
            </div>
            <div class="hm-payment-info">
              <h4>Transferencia Bancaria</h4>
              <p>También aceptamos transferencias bancarias directas. Contáctanos por WhatsApp para recibir los datos bancarios específicos.</p>
            </div>
          </div>

          <div class="hm-payment-card hm-payment-disabled">
            <div class="hm-payment-icon" style="background: #f5f5f5; color: #9e9e9e;">
              <i class="fas fa-credit-card"></i>
            </div>
            <div class="hm-payment-info">
              <h4>Tarjeta de crédito/débito <span class="hm-badge-soon">Próximamente</span></h4>
              <p>Estamos trabajando para habilitar pagos con tarjeta. Por el momento no está disponible.</p>
            </div>
          </div>
        </div>

        <div class="hm-section">
          <h4><i class="fas fa-question-circle"></i> ¿Tienes dudas con el pago?</h4>
          <div style="text-align:center; margin-top: var(--space-4);">
            <a href="https://wa.me/+573142037066" target="_blank" rel="noopener noreferrer"
               class="btn btn-primary" style="text-decoration:none;">
              <i class="fab fa-whatsapp"></i> Escribirnos por WhatsApp
            </a>
          </div>
        </div>
      `
    },

    nosotros: {
      icon: 'fa-heart',
      title: 'Sobre Nosotros',
      body: `
        <div class="hm-section" style="text-align:center;">
          <div style="font-size:64px; margin-bottom: var(--space-4);">👗</div>
          <h3 style="font-family:var(--font-heading); font-size:var(--text-2xl); margin-bottom:var(--space-3); color:var(--text-primary);">
            Bienvenido a MiClosetTuModa
          </h3>
          <p style="font-size:var(--text-lg); color:var(--text-secondary); max-width:480px; margin:0 auto;">
            Somos una tienda colombiana apasionada por la moda, dedicada a acercar las últimas tendencias a precios accesibles para todos.
          </p>
        </div>

        <div class="hm-section">
          <div class="hm-values-grid">
            <div class="hm-value-card">
              <div class="hm-value-icon"><i class="fas fa-star"></i></div>
              <h4>Calidad</h4>
              <p>Seleccionamos cada prenda cuidadosamente para ofrecerte lo mejor.</p>
            </div>
            <div class="hm-value-card">
              <div class="hm-value-icon"><i class="fas fa-heart"></i></div>
              <h4>Pasión</h4>
              <p>Amamos la moda y queremos que tú también la disfrutes.</p>
            </div>
            <div class="hm-value-card">
              <div class="hm-value-icon"><i class="fas fa-users"></i></div>
              <h4>Para todos</h4>
              <p>Mujer, hombre, niños tenemos prendas para toda la familia.</p>
            </div>
            <div class="hm-value-card">
              <div class="hm-value-icon"><i class="fas fa-handshake"></i></div>
              <h4>Confianza</h4>
              <p>Atención personalizada y transparente en cada compra.</p>
            </div>
          </div>
        </div>

        <div class="hm-section" style="text-align:center;">
          <p style="color:var(--text-secondary); margin-bottom:var(--space-5);">¿Tienes alguna pregunta? Estamos para ayudarte.</p>
          <div style="display:flex; gap:var(--space-3); justify-content:center; flex-wrap:wrap;">
            <a href="https://wa.me/+573142037066" target="_blank" rel="noopener noreferrer"
               class="btn btn-primary" style="text-decoration:none;">
              <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
            <a href="https://www.instagram.com/mi_closet_tu_moda" target="_blank" rel="noopener noreferrer"
               class="btn btn-secondary" style="text-decoration:none;">
              <i class="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      `
    }

  };

  /* ════════════════════════════════════════
     ESTILOS DEL COMPONENTE
  ════════════════════════════════════════ */
  const STYLES = `
    .hm-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(6px);
      z-index: var(--z-modal-bg);
      opacity: 0; pointer-events: none;
      transition: opacity 0.3s ease;
      display: flex; align-items: center; justify-content: center;
      padding: var(--space-5);
    }
    .hm-overlay.open { opacity: 1; pointer-events: all; }

    .hm-modal {
      background: var(--bg-surface);
      border-radius: var(--radius-2xl);
      width: 100%; max-width: 580px;
      max-height: 88vh;
      display: flex; flex-direction: column;
      box-shadow: var(--shadow-xl);
      animation: scaleIn 0.3s ease;
      overflow: hidden;
    }

    .hm-header {
      display: flex; align-items: center; gap: var(--space-4);
      padding: var(--space-6);
      border-bottom: 1px solid var(--clr-gray-200);
      flex-shrink: 0;
    }
    .hm-header-icon {
      width: 48px; height: 48px;
      background: var(--clr-primary-50);
      border-radius: var(--radius-xl);
      display: flex; align-items: center; justify-content: center;
      color: var(--clr-primary); font-size: var(--text-xl);
      flex-shrink: 0;
    }
    .hm-header h3 {
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      font-weight: var(--font-bold);
      color: var(--text-primary); flex: 1;
    }
    .hm-close {
      width: 36px; height: 36px;
      border-radius: var(--radius-full);
      background: var(--clr-gray-100);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: var(--text-secondary);
      transition: all var(--transition-base);
      border: none; font-size: var(--text-base);
      flex-shrink: 0;
    }
    .hm-close:hover { background: var(--clr-primary); color: white; }

    .hm-body {
      overflow-y: auto; padding: var(--space-6);
      flex: 1;
    }
    .hm-body::-webkit-scrollbar { width: 4px; }
    .hm-body::-webkit-scrollbar-thumb { background: var(--clr-gray-300); border-radius: 99px; }

    .hm-section { margin-bottom: var(--space-6); }
    .hm-section:last-child { margin-bottom: 0; }
    .hm-section h4 {
      font-family: var(--font-heading);
      font-size: var(--text-base); font-weight: var(--font-semibold);
      color: var(--text-primary); margin-bottom: var(--space-3);
      display: block; align-items: center;
    }
    .hm-section h4 i { color: var(--clr-primary); }
    .hm-section p { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.7; }

    .hm-highlight {
      background: var(--clr-primary-50);
      border: 1px solid var(--clr-primary-100);
      border-radius: var(--radius-xl);
      padding: var(--space-4) var(--space-5);
      display: flex; align-items: center; gap: var(--space-3);
      color: var(--clr-primary-dark); font-size: var(--text-sm);
    }
    .hm-highlight i { font-size: var(--text-xl); flex-shrink: 0; }
    .hm-highlight-green {
      background: #f0fdf4; border-color: #bbf7d0; color: #166534;
    }
    .hm-highlight-green i { color: #16a34a; }

    .hm-table { border: 1px solid var(--clr-gray-200); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: var(--space-3); }
    .hm-row { display: grid; grid-template-columns: 1fr auto; padding: var(--space-3) var(--space-4); font-size: var(--text-sm); gap: var(--space-4); }
    .hm-row-header { background: var(--clr-gray-50); font-weight: var(--font-semibold); color: var(--text-muted); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.06em; }
    .hm-row:not(.hm-row-header) { border-top: 1px solid var(--clr-gray-100); color: var(--text-secondary); }
    .hm-free { color: #16a34a; font-weight: var(--font-bold); }

    .hm-note { font-size: var(--text-xs); color: var(--text-muted); font-style: italic; }

    .hm-chips { display: flex; gap: var(--space-4); }
    .hm-chip {
      flex: 1; background: var(--clr-gray-50); border-radius: var(--radius-xl);
      padding: var(--space-5); text-align: center; border: 1px solid var(--clr-gray-200);
    }
    .hm-chip-value { display: block; font-family: var(--font-heading); font-size: var(--text-4xl); font-weight: var(--font-black); color: var(--clr-primary); }
    .hm-chip-label { display: block; font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-1); line-height: 1.4; }

    .hm-steps { padding-left: var(--space-5); display: flex; flex-direction: column; gap: var(--space-2); }
    .hm-steps li { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6; padding-left: var(--space-2); }
    .hm-steps li::marker { color: var(--clr-primary); font-weight: var(--font-bold); }

    .hm-list { display: flex; flex-direction: column; gap: var(--space-2); }
    .hm-list li { display: flex; align-items: flex-start; gap: var(--space-3); font-size: var(--text-sm); color: var(--text-secondary); }
    .hm-list li i { color: #16a34a; margin-top: 3px; flex-shrink: 0; }
    .hm-list-red li i { color: var(--clr-primary); }

    /* FAQ Accordion */
    .hm-accordion { display: flex; flex-direction: column; gap: var(--space-2); }
    .hm-faq-item {
      border: 1px solid var(--clr-gray-200); border-radius: var(--radius-lg);
      overflow: hidden;
    }
    .hm-faq-item[open] { border-color: var(--clr-primary-100); }
    .hm-faq-q {
      display: flex; align-items: center; gap: var(--space-3);
      padding: var(--space-4) var(--space-5);
      font-size: var(--text-sm); font-weight: var(--font-semibold);
      color: var(--text-primary); cursor: pointer; list-style: none;
      transition: background var(--transition-base);
    }
    .hm-faq-q:hover { background: var(--clr-gray-50); }
    .hm-faq-item[open] .hm-faq-q { background: var(--clr-primary-50); color: var(--clr-primary-dark); }
    .hm-arrow { font-size: 10px; color: var(--clr-primary); transition: transform var(--transition-base); flex-shrink: 0; }
    .hm-faq-item[open] .hm-arrow { transform: rotate(90deg); }
    .hm-faq-a { padding: var(--space-4) var(--space-5); font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.7; border-top: 1px solid var(--clr-gray-100); background: var(--bg-surface); }
    summary::-webkit-details-marker { display: none; }

    /* Medios de pago */
    .hm-payment-card {
      display: flex; gap: var(--space-4); align-items: flex-start;
      padding: var(--space-5); border: 1px solid var(--clr-gray-200);
      border-radius: var(--radius-xl); margin-bottom: var(--space-3);
      transition: border-color var(--transition-base), box-shadow var(--transition-base);
    }
    .hm-payment-card:hover { border-color: var(--clr-primary-100); box-shadow: var(--shadow-sm); }
    .hm-payment-main { border-color: var(--clr-primary-100); background: var(--clr-primary-50); }
    .hm-payment-disabled { opacity: 0.6; }
    .hm-payment-icon {
      width: 52px; height: 52px; border-radius: var(--radius-xl); flex-shrink: 0;
      background: var(--clr-primary-50); color: var(--clr-primary);
      display: flex; align-items: center; justify-content: center; font-size: var(--text-2xl);
    }
    .hm-payment-info { flex: 1; }
    .hm-payment-info h4 { font-size: var(--text-base); font-weight: var(--font-bold); color: var(--text-primary); margin-bottom: var(--space-1); display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap; }
    .hm-payment-info p { font-size: var(--text-sm); color: var(--text-secondary); margin: 0; }
    .hm-badge-new { font-size: var(--text-xs); font-weight: var(--font-bold); background: #16a34a; color: white; padding: 2px 8px; border-radius: 99px; }
    .hm-badge-soon { font-size: var(--text-xs); font-weight: var(--font-bold); background: var(--clr-gray-400); color: white; padding: 2px 8px; border-radius: 99px; }

    .hm-key-box {
      display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap;
      margin-top: var(--space-3); background: white;
      border: 1.5px dashed var(--clr-primary); border-radius: var(--radius-lg);
      padding: var(--space-3) var(--space-4);
    }
    .hm-key-label { font-size: var(--text-xs); color: var(--text-muted); display: flex; align-items: center; gap: var(--space-1); flex-shrink: 0; }
    .hm-key-label i { color: var(--clr-primary); }
    .hm-key-value { font-family: var(--font-heading); font-size: var(--text-xl); font-weight: var(--font-black); color: var(--text-primary); letter-spacing: 0.05em; }
    .hm-copy-btn {
      margin-left: auto; padding: var(--space-1) var(--space-3);
      background: var(--clr-primary); color: white;
      border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: var(--font-bold);
      border: none; cursor: pointer; display: flex; align-items: center; gap: var(--space-1);
      transition: all var(--transition-base);
    }
    .hm-copy-btn:hover { background: var(--clr-primary-dark); }

    /* Sobre nosotros */
    .hm-values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
    .hm-value-card {
      background: var(--clr-gray-50); border-radius: var(--radius-xl);
      padding: var(--space-5); text-align: center;
      border: 1px solid var(--clr-gray-200);
    }
    .hm-value-icon {
      width: 48px; height: 48px; background: var(--clr-primary-50);
      border-radius: var(--radius-full); display: flex; align-items: center;
      justify-content: center; color: var(--clr-primary); font-size: var(--text-xl);
      margin: 0 auto var(--space-3);
    }
    .hm-value-card h4 { font-size: var(--text-base); font-weight: var(--font-bold); margin-bottom: var(--space-2); color: var(--text-primary); text-align: center; }
    .hm-value-card p { font-size: var(--text-xs); color: var(--text-muted); line-height: 1.6; margin: 0; text-align: center; }

    @media (max-width: 480px) {
      .hm-modal { max-height: 92vh; border-radius: var(--radius-2xl) var(--radius-2xl) 0 0; }
      .hm-overlay { align-items: flex-end; padding: 0; }
      .hm-chips { flex-direction: column; }
      .hm-values-grid { grid-template-columns: 1fr; }
      .hm-key-box { flex-direction: column; align-items: flex-start; }
      .hm-copy-btn { margin-left: 0; }
    }
  `;

  /* ════════════════════════════════════════
     MONTAR EL COMPONENTE
  ════════════════════════════════════════ */
  function _mount() {
    // Estilos
    const styleEl = document.createElement('style');
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);

    // HTML del modal
    const html = `
      <div class="hm-overlay" id="hm-overlay" role="dialog" aria-modal="true"
           aria-labelledby="hm-modal-title" aria-hidden="true">
        <div class="hm-modal" id="hm-modal">
          <div class="hm-header">
            <div class="hm-header-icon" id="hm-icon">
              <i class="fas fa-info-circle" aria-hidden="true"></i>
            </div>
            <h3 id="hm-modal-title">Información</h3>
            <button class="hm-close" id="hm-close" aria-label="Cerrar">
              <i class="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div class="hm-body" id="hm-body"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    // Eventos
    document.getElementById('hm-close').addEventListener('click', close);
    document.getElementById('hm-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'hm-overlay') close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.getElementById('hm-overlay').classList.contains('open')) {
        close();
      }
    });

    mounted = true;
  }

  /* ════════════════════════════════════════
     API PÚBLICA
  ════════════════════════════════════════ */
  function open(type) {
    if (!mounted) _mount();
    const data = CONTENT[type];
    if (!data) return;

    const overlay   = document.getElementById('hm-overlay');
    const iconEl    = document.getElementById('hm-icon');
    const titleEl   = document.getElementById('hm-modal-title');
    const bodyEl    = document.getElementById('hm-body');

    iconEl.innerHTML  = `<i class="fas ${data.icon}" aria-hidden="true"></i>`;
    titleEl.textContent = data.title;
    bodyEl.innerHTML  = data.body;
    bodyEl.scrollTop  = 0;

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    document.getElementById('hm-close').focus();
  }

  function close() {
    const overlay = document.getElementById('hm-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }
  }

  function copyKey() {
    const key = '3225858457';
    navigator.clipboard.writeText(key).then(() => {
      NotificationService.success('¡Copiado!', 'Llave Bre-B copiada al portapapeles.');
    }).catch(() => {
      NotificationService.info('Llave Bre-B', key);
    });
  }

  return { open, close, copyKey };
})();

window.HelpModal = HelpModal;
