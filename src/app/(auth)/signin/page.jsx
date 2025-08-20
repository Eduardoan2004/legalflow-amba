'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  return (
    <main style={{maxWidth:480,margin:'10vh auto',background:'#fff',border:'1px solid #e5e7eb',borderRadius:16,padding:16}}>
      <h1 style={{marginTop:0}}>Ingresar</h1>
      <div style={{display:'grid',gap:8}}>
        <button className="btn" onClick={()=>signIn('google',{callbackUrl:'/dashboard'})}>Continuar con Google</button>
        <button className="btn" onClick={()=>signIn('github',{callbackUrl:'/dashboard'})}>Continuar con GitHub</button>
        <div style={{height:1,background:'#e5e7eb',margin:'8px 0'}}/>
        <label><div style={{fontSize:12,color:'#6b7280'}}>Email</div><input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:10,border:'1px solid #e5e7eb',borderRadius:12}}/></label>
        <label><div style={{fontSize:12,color:'#6b7280'}}>Password</div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:10,border:'1px solid #e5e7eb',borderRadius:12}}/></label>
        <button className="btn primary" onClick={()=>signIn('credentials',{email,password,callbackUrl:'/dashboard'})}>Ingresar</button>
      </div>
      <style jsx>{`.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid #e5e7eb;background:#fff;padding:10px 12px;border-radius:12px;cursor:pointer}.btn.primary{background:#111827;color:#fff;border-color:#111827}`}</style>
    </main>
  );
}
