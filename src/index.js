const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return json({
        ok: true,
        service: "ANANTLEKH API",
        database: env.DB ? "connected" : "not_configured"
      }, env.DB ? 200 : 503);
    }

    if (url.pathname === "/api/products" && request.method === "GET") {
      if (!env.DB) {
        return json({ error: "database_not_configured", message: "Store database is not connected yet." }, 503);
      }
      try {
        const { results } = await env.DB.prepare(
          "SELECT id, slug, title, category, description, price_paise, currency, cover_image, preview_enabled FROM products WHERE status = 'published' ORDER BY sort_order ASC, id DESC"
        ).all();
        return json({ products: results || [] });
      } catch {
        return json({ error: "database_unavailable" }, 503);
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "not_found" }, 404);
    }

    return env.ASSETS.fetch(request);
  }
};
