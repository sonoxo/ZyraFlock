import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const form = await request.formData()
  const image = form.get('image') as File | null
  const authorized = form.get('authorized') === 'true'
  if (!image || !authorized) return NextResponse.json({ error: 'Image and authorization are required.' }, { status: 400 })
  if (!['image/jpeg','image/png','image/webp'].includes(image.type)) return NextResponse.json({ error: 'Unsupported image type.' }, { status: 415 })
  if (image.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'Image exceeds 10MB.' }, { status: 413 })
  await new Promise(r => setTimeout(r, 900))
  return NextResponse.json({
    mode: 'demo',
    notice: 'Demo results only. No biometric identification or internet-wide face search is performed.',
    results: [
      { id: 1, similarity: 92, domain: 'demo.example/news', locked: false },
      { id: 2, similarity: 88, domain: 'demo.example/archive', locked: true },
      { id: 3, similarity: 81, domain: 'demo.example/gallery', locked: true },
      { id: 4, similarity: 76, domain: 'demo.example/profile', locked: false }
    ]
  })
}
