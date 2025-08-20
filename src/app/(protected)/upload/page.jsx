'use client';
import { useState } from 'react';
export default function Upload(){
  const [file,setFile]=useState(null); const [expId,setExpId]=useState(''); const [tipo,setTipo]=useState('Documental'); const [status,setStatus]=useState('');
  async function handleUpload(){
    try{
      if(!file) return alert('Adjunte un archivo.');
      const key = `docs/${Date.now()}-${file.name}`;
      const sign = await fetch('/api/upload/sign?key='+encodeURIComponent(key)+'&contentType='+encodeURIComponent(file.type)).then(r=>r.json());
      if(!sign.ok) throw new Error(sign.error);
      const put = await fetch(sign.url, { method:'PUT', headers:{'Content-Type': file.type}, body: file });
      if(!put.ok) throw new Error('Error subiendo a S3');
      const url = sign.url.split('?')[0];
      const saved = await fetch('/api/documentos',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({ expedienteId: expId || null, tipo, key, url, filename: file.name, mimeType: file.type, size: file.size })}).then(r=>r.json());
      if(!saved.ok) throw new Error(saved.error);
      setStatus('Subido ✅'); setFile(null);
    }catch(e){ setStatus('Error: '+e.message); }
  }
  return (
    <main style={{maxWidth:680,margin:'0 auto',padding:'12px 16px'}}>
      <h1>Subir documento</h1>
      <label style={{display:'block',margin:'8px 0'}}><div style={{fontSize:12,color:'#6b7280'}}>Expediente (ID)</div><input value={expId} onChange={e=>setExpId(e.target.value)} placeholder="EXPEDIENTE_ID" style={{width:'100%',padding:10,border:'1px solid #e5e7eb',borderRadius:12}}/></label>
      <label style={{display:'block',margin:'8px 0'}}><div style={{fontSize:12,color:'#6b7280'}}>Tipo</div><select value={tipo} onChange={e=>setTipo(e.target.value)} style={{width:'100%',padding:10,border:'1px solid #e5e7eb',borderRadius:12}}><option>Documental</option><option>Demanda</option><option>Testimonial</option><option>Cautelar</option></select></label>
      <input type="file" onChange={e=> setFile(e.target.files?.[0]||null)} style={{margin:'8px 0'}}/>
      <div style={{display:'flex',gap:8,marginTop:8}}><button className="btn" onClick={handleUpload}>Subir</button><a className="btn" href="/dashboard">Volver</a></div>
      <div style={{marginTop:8,color:'#6b7280'}}>{status}</div>
      <style jsx>{`.btn{display:inline-flex;align-items:center;gap:6px;border:1px solid #e5e7eb;background:#fff;padding:8px 12px;border-radius:12px;cursor:pointer}`}</style>
    </main>
  );
}
