# ZyraFlock Architecture

## Purpose
ZyraFlock is a privacy-conscious visual-search application prototype with a dark, high-contrast search experience, image upload workflow, processing state, and structured similarity results.

## Stack
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Next.js Route Handlers
- Optional Python/FastAPI similarity service
- Optional PostgreSQL + pgvector or Qdrant
- S3-compatible object storage for controlled production deployments

## Request flow
1. Browser validates the selected image.
2. User confirms authorization, Terms, and Privacy requirements.
3. Browser sends multipart FormData to POST /api/search.
4. API validates authorization, MIME type, and size.
5. Current implementation returns synthetic demonstration matches.
6. UI displays confidence indicators, source domains, and locked previews.

## Production visual-similarity architecture
Browser -> Next.js API -> validation/rate limits -> object storage -> image-processing worker -> general visual embedding -> vector database -> authorized image corpus -> ranked results.

## ML service option
A separate FastAPI service can perform non-identifying image similarity using Pillow/OpenCV for preprocessing, ONNX Runtime for model inference, a general-purpose visual embedding model, and pgvector/Qdrant for nearest-neighbor retrieval.

## Security boundaries
The production design should include server-side image decoding/re-encoding, metadata stripping, upload limits, rate limiting, authentication, signed object URLs, audit logging, short retention periods, deletion tooling, encryption, and access controls.

The current implementation deliberately does not perform biometric identification, create persistent biometric profiles, or crawl the public web to identify unknown people.
