let isEnabled = false;

chrome.storage.sync.get(['enabled'], (r) => {
  isEnabled = r.enabled || false;
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && 'enabled' in changes) {
    isEnabled = changes.enabled.newValue;
  }
});

function copyText(text) {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;top:0;left:0;width:2px;height:2px;opacity:0;';
  document.body.appendChild(el);
  el.focus();
  el.select();
  document.execCommand('copy');
  el.remove();
}

function showToast(msg) {
  document.querySelectorAll('.__iuc-toast').forEach(e => e.remove());
  const d = document.createElement('div');
  d.className = '__iuc-toast';
  d.textContent = msg;
  d.style.cssText = [
    'position:fixed',
    'bottom:24px',
    'right:24px',
    'background:#14532d',
    'color:#fff',
    'padding:10px 16px',
    'border-radius:8px',
    'font-size:13px',
    'font-family:sans-serif',
    'z-index:2147483647',
    'box-shadow:0 4px 16px rgba(0,0,0,.5)',
    'max-width:400px',
    'word-break:break-all',
    'line-height:1.4',
  ].join(';');
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 3000);
}

document.addEventListener('click', (e) => {
  if (!isEnabled) return;

  const img = e.target.closest('img');
  if (!img) return;

  const url = img.src;
  if (!url || url.startsWith('data:')) return;

  e.preventDefault();
  e.stopPropagation();
  copyText(url);
  showToast('✓ Copié !\n' + url.slice(0, 80) + (url.length > 80 ? '…' : ''));
}, true);
