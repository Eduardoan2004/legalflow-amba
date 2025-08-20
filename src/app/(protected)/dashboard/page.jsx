'use client';
import useSWR from 'swr';
const fetcher = url => fetch(url).then(r=>r.json());
const fmtDate = (d)=> new Date(d).toLocaleDateString('es-AR');

export default function Dashboard(){
  const { data: exps } = useSWR('/api/expedientes', fetcher);
  const { data: tareas } = useSWR('/api/tareas', fetcher);
  const { data: auds } = useSWR('/api/audiencias', fetcher);
  return (
    <main style={{maxWidth:1120,margin:'0 auto',padding:'12px 16px'}}>
      <header style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap',margin:'8px 0 16px'}}>
        <h1 style={{margin:0,flex:1}}>Panel</h1>
        <a href="/audiencias" style={{textDecoration:'none'}}><button className="btn">⚖️ Audiencias</button></a>
        <a href="/upload" style={{textDecoration:'none'}}><button className="btn">📤 Subir documento</button></a>
      </header>
      <section style={{display:'grid',gridTemplateColumns:'1fr',gap:12}}>
        <div className="card"><h3>Indicadores</h3>
          <div className="wrap">
            <span className="badge">Expedientes: <b>{exps?.items?.length||0}</b></span>
            <span className="badge">Tareas: <b>{tareas?.items?.length||0}</b></span>
            <span className="badge">Audiencias: <b>{auds?.items?.length||0}</b></span>
          </div>
        </div>
        <div className="card"><h3>Próximos vencimientos</h3>
          {exps?.items?.length? <ul>{[...exps.items].sort((a,b)=> new Date(a.proximoVencimiento||0)-new Date(b.proximoVencimiento||0)).slice(0,5).map(e=> <li key={e.id} style={{margin:'6px 0'}}><b>{e.caratula}</b><br/><span style={{color:'#6b7280'}}>{e.tipoVencimiento||'—'} · {e.proximoVencimiento? fmtDate(e.proximoVencimiento):'—'}</span></li>)}</ul> : <div style={{color:'#6b7280'}}>—</div>}
        </div>
      </section>
      <style jsx>{`
        .btn{display:inline-flex;align-items:center;gap:6px;border:1px solid #e5e7eb;background:#fff;padding:8px 12px;border-radius:12px;cursor:pointer}
        .card{background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:14px}
        .badge{padding:2px 8px;border-radius:999px;border:1px solid #e5e7eb;font-size:12px;margin-right:8px}
        .wrap{display:flex;gap:8px;flex-wrap:wrap}
      `}</style>
    </main>
  );
}
