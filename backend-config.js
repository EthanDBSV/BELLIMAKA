/**
 * Bellimaka League - Backend Configuration
 * 
 * To activate your Cloudflare backend:
 * 1. Deploy the worker from cloudflare-worker.js to Cloudflare Workers.
 * 2. Paste the Worker URL below into the 'url' property.
 */

window.DRAFTDEX_BACKEND = {
  provider: 'cloudflare',
  url: 'https://bellimaka-api.ethantruong29.workers.dev',
  masterKey: 'bellimaka-master-2026'
};
