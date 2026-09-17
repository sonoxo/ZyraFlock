'use client'

import { useRef, useState } from 'react'
import { ArrowUpTrayIcon, CameraIcon, CheckBadgeIcon, LockClosedIcon, MagnifyingGlassIcon, ShieldCheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

type Result = { id:number; similarity:number; domain:string; locked:boolean }

export default function Home() {
  const input = useRef<HTMLInputElement>(null)
  const [file,setFile] = useState<File|null>(null)
  const [preview,setPreview] = useState('')
  const [authorized,setAuthorized] = useState(false)
  const [terms,setTerms] = useState(false)
  const [privacy,setPrivacy] = useState(false)
  const [progress,setProgress] = useState(0)
  const [results,setResults] = useState<Result[]>([])
  const [error,setError] = useState('')

  function choose(f?:File) {
    if(!f) return
    if(!['image/jpeg','image/png','image/webp'].includes(f.type)) return setError('Use a JPG, PNG, or WEBP image.')
    if(f.size > 10*1024*1024) return setError('Maximum file size is 10MB.')
    setError(''); setFile(f); setPreview(URL.createObjectURL(f)); setResults([])
  }

  async function search() {
    if(!file || !authorized || !terms || !privacy) return setError('Add an image and confirm all three compliance items.')
    setError(''); setProgress(8); setResults([])
    const timer = setInterval(()=>setProgress(p=>Math.min(p+Math.ceil(Math.random()*12),92)),180)
    const form = new FormData(); form.append('image',file); form.append('authorized','true')
    const res = await fetch('/api/search',{method:'POST',body:form}); const data = await res.json()
    clearInterval(timer); setProgress(100)
    if(!res.ok) return setError(data.error || 'Search failed.')
    setTimeout(()=>{ setResults(data.results); setProgress(0) },350)
  }

  return <main className="min-h-screen bg-ink">
    <header className="border-b border-line/80 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full border border-white/20"><MagnifyingGlassIcon className="h-5 w-5"/></div><span className="text-xl font-semibold tracking-tight">ZyraFlock</span></div>
        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex"><a href="#how">How it works</a><a href="#privacy">Privacy</a><a href="#results">Demo results</a></nav>
        <button className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/5">Sign in</button>
      </div>
    </header>

    <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-16 lg:grid-cols-[1fr_.85fr] lg:pt-24">
      <div className="flex flex-col justify-center">
        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-xs text-zinc-300"><ShieldCheckIcon className="h-4 w-4"/> Consent-first visual search prototype</div>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.045em] sm:text-7xl">Find where your images <span className="text-zinc-500">appear.</span></h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">Upload a photo to experience a privacy-conscious visual-search workflow with source previews, similarity indicators, and clear authorization controls.</p>
        <div className="mt-10 flex flex-wrap gap-6 text-sm text-zinc-400"><span className="flex gap-2"><CheckBadgeIcon className="h-5 w-5 text-zinc-200"/>Encrypted workflow</span><span className="flex gap-2"><CheckBadgeIcon className="h-5 w-5 text-zinc-200"/>No biometric identification</span><span className="flex gap-2"><CheckBadgeIcon className="h-5 w-5 text-zinc-200"/>Demo data only</span></div>
      </div>

      <div className="rounded-[28px] border border-line bg-panel p-3 shadow-glow">
        <div onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();choose(e.dataTransfer.files[0])}} className="relative flex min-h-[390px] flex-col items-center justify-center overflow-hidden rounded-[22px] border border-dashed border-zinc-700 bg-[#0b0d10] p-7 text-center">
          {preview ? <><img src={preview} alt="Upload preview" className="max-h-64 max-w-full rounded-2xl object-contain"/><button onClick={()=>{setFile(null);setPreview('')}} className="absolute right-4 top-4 rounded-full bg-black/70 p-2"><XMarkIcon className="h-5 w-5"/></button></> : <><div className="mb-5 grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[.04]"><ArrowUpTrayIcon className="h-7 w-7"/></div><h2 className="text-xl font-medium">Drop an image here</h2><p className="mt-2 text-sm text-zinc-500">JPG, PNG or WEBP · up to 10MB</p><div className="mt-7 flex gap-3"><button onClick={()=>input.current?.click()} className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black">Upload photo</button><button onClick={()=>input.current?.click()} className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm"><CameraIcon className="h-4 w-4"/> Camera</button></div></>}
          <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" capture="user" className="hidden" onChange={e=>choose(e.target.files?.[0])}/>
        </div>
        <div className="space-y-3 px-3 pb-3 pt-5 text-xs text-zinc-400">
          {[['authorized',authorized,setAuthorized,'I own this image or have authorization to search it.'],['terms',terms,setTerms,'I agree to the Terms of Service.'],['privacy',privacy,setPrivacy,'I acknowledge the Privacy Notice.']].map(([k,v,set,label]:any)=><label key={k} className="flex cursor-pointer items-start gap-3"><input type="checkbox" checked={v} onChange={e=>set(e.target.checked)} className="mt-0.5 accent-white"/><span>{label}</span></label>)}
          {error && <p className="rounded-xl border border-red-900/60 bg-red-950/30 p-3 text-red-300">{error}</p>}
          {progress>0 && <div className="pt-2"><div className="mb-2 flex justify-between"><span>Analyzing image…</span><span>{progress}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-zinc-800"><div className="h-full bg-white transition-all" style={{width:`${progress}%`}}/></div></div>}
          <button onClick={search} disabled={progress>0} className="mt-2 w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50">Search image</button>
        </div>
      </div>
    </section>

    <section id="how" className="border-y border-line bg-[#0b0c0f] py-20"><div className="mx-auto max-w-7xl px-5"><p className="text-xs uppercase tracking-[.24em] text-zinc-500">How it works</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">A transparent three-step flow.</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{[['01','Upload','Choose an image you are authorized to use.'],['02','Analyze','Validate the file and simulate visual feature extraction.'],['03','Review','Inspect demo matches, confidence indicators, and source domains.']].map(x=><div key={x[0]} className="rounded-2xl border border-line bg-panel p-6"><span className="text-xs text-zinc-600">{x[0]}</span><h3 className="mt-10 text-lg font-medium">{x[1]}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{x[2]}</p></div>)}</div></div></section>

    <section id="results" className="mx-auto max-w-7xl px-5 py-20"><div className="flex items-end justify-between"><div><p className="text-xs uppercase tracking-[.24em] text-zinc-500">Results</p><h2 className="mt-3 text-3xl font-semibold">{results.length ? `${results.length} demo matches` : 'Search to reveal demo matches'}</h2></div></div>{results.length>0 && <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{results.map((r,i)=><article key={r.id} className="overflow-hidden rounded-2xl border border-line bg-panel"><div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-800 to-zinc-950"><div className="absolute inset-0 grid place-items-center text-6xl font-light text-zinc-700">{i+1}</div>{r.locked && <div className="absolute inset-0 grid place-items-center bg-black/30 backdrop-blur-md"><LockClosedIcon className="h-7 w-7"/></div>}<span className="absolute left-3 top-3 rounded-full bg-black/75 px-2.5 py-1 text-xs">{r.similarity}% match</span></div><div className="p-4"><p className="truncate text-sm text-zinc-300">{r.domain}</p><p className="mt-1 text-xs text-zinc-600">Synthetic demonstration result</p></div></article>)}</div>}</section>

    <footer id="privacy" className="border-t border-line"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 ZyraFlock. Independent visual-search prototype.</p><p>This demo does not identify people or search the public web for faces.</p></div></footer>
  </main>
}
