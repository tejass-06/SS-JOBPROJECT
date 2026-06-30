import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// In-memory store for paid sessions (lives as long as dev server runs)
const paidSessions = new Set();

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // ── Payment signal API ─────────────────────────────────────
    // configureServer MUST be inside a plugin object, not server: {}
    {
      name: 'hirrd-payment-api',
      configureServer(server) {
        // POST /api/payment-done?sid=SESSION_ID  ← phone calls this after pay
        server.middlewares.use('/api/payment-done', (req, res) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Content-Type', 'application/json');
          if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
          if (req.method === 'POST') {
            const qs = (req.url || '').split('?')[1] || '';
            const sid = new URLSearchParams(qs).get('sid');
            if (sid) {
              paidSessions.add(sid);
              console.log(`\n  [hirrd-pay] ✅  Payment received  sid=${sid}\n`);
            }
            res.end(JSON.stringify({ ok: true }));
          }
        });

        // GET /api/payment-status?sid=SESSION_ID  ← desktop polls every 1.5s
        server.middlewares.use('/api/payment-status', (req, res) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-Type', 'application/json');
          const qs = (req.url || '').split('?')[1] || '';
          const sid = new URLSearchParams(qs).get('sid');
          const paid = sid ? paidSessions.has(sid) : false;
          if (paid) {
            paidSessions.delete(sid); // consume once so re-opens don't re-trigger
            console.log(`\n  [hirrd-pay] 🖥  Desktop picked up payment  sid=${sid}\n`);
          }
          res.end(JSON.stringify({ paid }));
        });
      }
    }
  ],
  server: {
    host: true   // expose on network so phones can reach 10.140.71.2:5173
  }
})
