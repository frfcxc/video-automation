export async function GET() { return Response.json({ ok: true, method: "GET" }); }
export async function POST(request: Request) { let body = null; try { body = await request.json(); } catch {} return Response.json({ ok: true, method: "POST", body }); }
