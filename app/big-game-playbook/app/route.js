// Candidate target: mitch-bryant-project/app/big-game-playbook/app/route.js.
export const dynamic = 'force-dynamic';

const privateHeaders = {
  'Cache-Control': 'private, no-store, max-age=0',
  'Referrer-Policy': 'no-referrer',
  'X-Robots-Tag': 'noindex, nofollow',
};

function enter() {
  let origin;
  try {
    const configured = process.env.BGP_OWNER_ENTRY_ORIGIN;
    const url = new URL(configured);
    if (url.protocol === 'https:' && configured === url.origin && !url.port &&
        url.hostname.includes('.') && /[a-z]/.test(url.hostname) &&
        !['allthatsnext.com', 'www.allthatsnext.com'].includes(url.hostname) &&
        !url.hostname.endsWith('.localhost') && !url.hostname.endsWith('.local')) {
      origin = url.origin;
    }
  } catch {}
  if (!origin) return new Response(null, { status: 503, headers: privateHeaders });
  // Do not accept the inbound URL, query, headers, cookies, or body as inputs.
  return new Response(null, { status: 303, headers: { ...privateHeaders, Location: origin + '/' } });
}

export function GET() { return enter(); }
export function HEAD() { return enter(); }

