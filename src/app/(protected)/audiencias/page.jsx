'use client';
import { useState } from 'react';

export default function Audiencias(){
  const [data,setData]=useState({ expedienteNumero:'', caratula:'', fuero:'', juzgado:'', audienciaTipo:'Preliminar', fecha:'', hora:'', lugar:'', linkVirtual:'', responsable:'', destinatario:'', domicilio:'', objeto:'' });
  const [status,setStatus]=useState('');

  const update=(k,v)=> setData(prev=> ({...prev, [k]:v}));

  async function genDocx(kind){
    const res=await fetch('/api/docs/generate-docx',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({ kind, data })});
    const blob=await res.blob();
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=(kind||'documento')+'.docx'; a.click(); URL.revokeObjectURL(a.href);
  }
  async function genPdf(kind){
    const res=await fetch('/api/docs/generate-pdf',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({ kind, data })});
    const blob=await res.blob();
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=(kind||'documento')+'.pdf'; a.click(); URL.revokeObjectURL(a.href);
  }
  async function genICS(){
    const res=await fetch('/api/docs/audiencia-ics',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({ data })});
    const text=await res.text();
    const blob=new Blob([text],{type:'text/calendar'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='audiencia.ics'; a.click(); URL.revokeObjectURL(a.href);
  }

  return (
    <main style={{maxWidth:980,margin:'0 auto',padding:'12px 16px'}}>
      <h1>Audiencias y Documentos</h1>
      <div className="card">
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:8}}>
          {Object.entries({expedienteNumero:'N° de expediente',caratula:'Carátula',fuero:'Fuero',juzgado:'Juzgado',audienciaTipo:'Tipo de audiencia',fecha:'Fecha (YYYY-MM-DD)',hora:'Hora (HH:MM)',lugar:'Lugar',linkVirtual:'Link virtual',responsable:'Responsable',destinatario:'Destinatario (cédula)',domicilio:'Domicilio (cédula)',objeto:'Objeto notificación'}).map(([k,label])=> (
            <label key={k}><div style={{fontSize:12,color:'#6b7280'}}>{label}</div><input value={data[k]||''} onChange={e=>update(k,e.target.value)} style={{width:'100%',padding:10,border:'1px solid #e5e7eb',borderRadius:12}}/></label>
          ))}
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:12}}>
          <button className="btn" onClick={()=>genDocx('audiencia')}>📄 Audiencia (DOCX)</button>
          <button className="btn" onClick={()=>genPdf('audiencia')}>🧾 Audiencia (PDF)</button>
          <button className="btn" onClick={()=>genDocx('cedula')}>✉️ Cédula (DOCX)</button>
          <button className="btn" onClick={()=>genPdf('cedula')}>✉️ Cédula (PDF)</button>
          <button className="btn" onClick={()=>genDocx('edicto')}>📢 Edicto (DOCX)</button>
          <button className="btn" onClick={()=>genPdf('edicto')}>📢 Edicto (PDF)</button>
          <button className="btn" onClick={genICS}>📆 Guardar .ICS</button>
        </div>
        <div style={{marginTop:8,color:'#6b7280'}}>{status}</div>
      </div>
      <style jsx>{`.card{background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:14px}.btn{display:inline-flex;align-items:center;gap:6px;border:1px solid #e5e7eb;background:#fff;padding:8px 12px;border-radius:12px;cursor:pointer}`}</style>
    </main>
  );
}
