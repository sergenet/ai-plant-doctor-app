'use strict';

// Preload runs in a privileged context before the renderer page loads.
// contextIsolation: true keeps this isolated from the renderer's JS world.
// No Node.js APIs are exposed to the renderer — the app runs as a plain web app.
window.addEventListener('DOMContentLoaded', () => {
  // Inject the platform hint so the app can detect it is running inside Electron.
  window.__ELECTRON__ = true;
});
