# ZyraFlock API

## Current endpoint
### POST /api/search
Accepts `multipart/form-data`.

Fields:
- `image`: JPG, PNG, or WEBP image, maximum 10 MB.
- `authorized`: must equal `true`.

Example response:
```json
{
  "mode": "demo",
  "notice": "Demo results only.",
  "results": [
    {
      "id": 1,
      "similarity": 92,
      "domain": "demo.example/news",
      "locked": false
    }
  ]
}
```

## Suggested production API
- `POST /api/uploads` - create controlled upload.
- `POST /api/search` - create visual similarity search.
- `GET /api/search/:searchId` - retrieve search status.
- `GET /api/search/:searchId/results` - retrieve ranked results.
- `DELETE /api/search/:searchId` - delete search data.
- `DELETE /api/uploads/:uploadId` - delete an upload.
- `GET /api/account/searches` - list authorized user's searches.
- `DELETE /api/account/data` - account-level deletion workflow.

## Example production result
```json
{
  "searchId": "srch_9cf342",
  "status": "complete",
  "results": [
    {
      "id": "result_001",
      "similarity": 0.92,
      "thumbnail": "/api/results/result_001/thumbnail",
      "sourceDomain": "example.com",
      "sourceUrl": "https://example.com/photo",
      "locked": false
    }
  ]
}
```

## Validation
Do not rely on the client or MIME header alone in production. Decode and re-encode images server-side, enforce pixel/dimension limits, strip metadata, reject malformed content, and apply rate limits before processing.
