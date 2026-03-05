import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const body = await request.json().catch(() => ({}));
    const filters = body?.filters ?? {};

    const keywords: string[] = Array.isArray(filters.keywords) ? filters.keywords : [];
    const mature = !!filters.mature;
    const child = !!filters.child;

    const q = keywords.join(' ').trim();

    if (!q) {
      return json(
        { error: 'Missing filters.keywords', resolved: [], code: 'BadRequest', query: '', datetime: new Date().toISOString() },
        { status: 400 }
      );
    }

    // Use URL() so you don’t create broken URLs with spaces etc.
    const url = new URL('https://serca-backend.onrender.com/search');
    url.searchParams.set('q', q);

    // only set these if your backend supports them
    url.searchParams.set('mature', String(mature));
    url.searchParams.set('child', String(child));

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });

    const raw = await response.text();
    let data: any;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = { raw };
    }

    if (!response.ok) {
      // bubble up backend error clearly
      return json(
        {
          error: 'Backend search failed',
          backend_status: response.status,
          backend_body: data,
          resolved: [],
          code: 'BackendError',
          query: q,
          datetime: new Date().toISOString()
        },
        { status: 502 }
      );
    }

    /**
     * If backend already returns the shape you showed:
     * { datetime, code, query, resolved: [...] }
     * return it directly so the frontend can use db.resolved.
     */
    return json(data);
  } catch (err: any) {
    console.error('Search API Error:', err?.message || err);
    return json(
      { error: 'Internal Server Error', resolved: [], code: 'Error', query: '', datetime: new Date().toISOString() },
      { status: 500 }
    );
  }
}