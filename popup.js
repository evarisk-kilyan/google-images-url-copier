const toggle = document.getElementById('toggleSwitch');
const badge = document.getElementById('statusBadge');
const dot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');

chrome.storage.sync.get(['enabled'], (result) => {
  toggle.checked = result.enabled || false;
  updateUI(toggle.checked);
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ enabled });
  updateUI(enabled);
});

function updateUI(enabled) {
  if (enabled) {
    badge.className = 'status-badge active';
    dot.className = 'dot pulse';
    statusText.textContent = 'Activé — cliquez sur une image';
  } else {
    badge.className = 'status-badge';
    dot.className = 'dot';
    statusText.textContent = 'Désactivé';
  }
}
