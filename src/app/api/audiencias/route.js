import { prisma } from '@/src/lib/prisma';
export async function GET(){ const items = await prisma.audiencia.findMany({ orderBy:{ fechaHora:'asc' } }); return Response.json({ ok:true, items }); }
export async function POST(request){ try{ const data = await request.json(); const created = await prisma.audiencia.create({ data }); return Response.json({ ok:true, item: created }); } catch(e){ return Response.json({ ok:false, error: String(e) }, { status: 500 }); } }
