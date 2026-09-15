import type { APIRoute } from 'astro';
import { guides } from '../data/guides';
import { species } from '../data/species';
export const GET: APIRoute = ({ site }) => { const urls = ['', 'species/', ...species.map((item) => `species/${item.slug}/`), 'guides/', ...guides.map((guide) => `guides/${guide.slug}/`), 'tools/', 'tools/tank-volume/', 'tools/aquarium-checklist/', 'tools/compatibility/', 'about/', 'editorial-policy/', 'privacy/', 'contact/']; const body = urls.map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`).join(''); return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, { headers: { 'Content-Type': 'application/xml' } }); };
