/**
 * NotificationService — Microservicio de Notificaciones Toast
 * Muestra mensajes toast no bloqueantes al usuario.
 */

const NotificationService = (() => {
  let container = null;

  function _ensureContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'false');
      document.body.appendChild(container);
    }
    return container;
  }

  const ICONS = {
    success: 'fa-check',
    error:   'fa-times',
    info:    'fa-info',
    warning: 'fa-exclamation'
  };

  function _show(type, title, message = '', duration = 3500) {
    const c = _ensureContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="fas ${ICONS[type] || 'fa-info'}"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>
      <button class="toast-close" aria-label="Cerrar notificación">
        <i class="fas fa-times"></i>
      </button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => _dismiss(toast));

    c.appendChild(toast);

    // Auto-dismiss
    const timer = setTimeout(() => _dismiss(toast), duration);

    // Pausar auto-dismiss al hacer hover
    toast.addEventListener('mouseenter', () => clearTimeout(timer));
    toast.addEventListener('mouseleave', () => {
      setTimeout(() => _dismiss(toast), 1500);
    });

    return toast;
  }

  function _dismiss(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    });
  }

  return {
    success(title, message, duration) { return _show('success', title, message, duration); },
    error(title, message, duration)   { return _show('error',   title, message, duration); },
    info(title, message, duration)    { return _show('info',    title, message, duration); },
    warning(title, message, duration) { return _show('warning', title, message, duration); },

    cartAdded(productName) {
      return this.success('¡Añadido al carrito!', productName, 3000);
    },
    wishlistToggled(added, productName) {
      return added
        ? this.success('¡En tu lista de deseos!', productName, 2500)
        : this.info('Eliminado de deseos', productName, 2000);
    }
  };
})();

window.NotificationService = NotificationService;
