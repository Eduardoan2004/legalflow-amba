'use client';
import useSWR from 'swr';
const fetcher = url => fetch(url).then(r=>r.json());
const fmtDate = (d)=> new Date(d).toLocaleDateString('es-AR');

export default function Portal(){
  const { data } = useSWR('/api/portal/overview', fetcher);
  return (
    <main style={{maxWidth:980,margin:'0 auto',padding:'12px 16px'}}>
      <h1>Portal del Cliente</h1>
      <section className="card"><h3>Mis expedientes</h3>
        {data?.expedientes?.length? (
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
            <thead><tr><th>Número</th><th>Carátula</th><th>Estado</th><th>Próximo vencimiento</th></tr></thead>
            <tbody>{data.expedientes.map(e=> <tr key={e.id} style={{borderBottom:'1px solid #e5e7eb'}}><td><b>{e.numero}</b></td><td>{e.caratula}</td><td>{e.etapa||'—'}</td><td>{e.proximoVencimiento? fmtDate(e.proximoVencimiento): '—'}</td></tr>)}</tbody>
          </table>
        ) : <div style={{color:'#6b7280'}}>No hay expedientes asociados.</div>}
      </section>
      <style jsx>{`.card{background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:14px}`}</style>
    </main>
  );
}
