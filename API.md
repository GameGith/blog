# API Documentation

## Base URL
```
http://localhost:3000/api (Development)
https://your-domain.com/api (Production)
```

## Authentication
All API endpoints are **public** and do not require authentication. However, they are protected by **rate limiting** to prevent abuse.

## Rate Limiting
All endpoints implement rate limiting based on IP address:
- **Response Headers:**
  - `X-RateLimit-Limit`: Maximum requests allowed per window
  - `X-RateLimit-Remaining`: Remaining requests in current window

- **Rate Limit Exceeded Response (429):**
```json
{
  "status": "error",
  "message": "Rate limit exceeded"
}
```

---

## Endpoints

### 1. Get All Posts
Retrieve all published blog posts.

**Endpoint:** `GET /api/posts`

**Rate Limit:** 10 requests per minute per IP

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "title": "Post Title",
      "slug": "post-slug",
      "excerpt": "Short description",
      "content": "Full MDX content",
      "cover_url": "/cdn/bucket/image.jpg",
      "tags": ["tag1", "tag2"],
      "category_id": "uuid",
      "category": {
        "id": "uuid",
        "name": "Category Name",
        "slug": "category-slug",
        "description": "Category description",
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T00:00:00Z"
      },
      "status": "published",
      "published_at": "2024-01-01T00:00:00Z",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "author_id": "uuid",
      "author": {
        "id": "uuid",
        "display_name": "Author Name",
        "email": "author@example.com",
        "role": "admin",
        "avatar_url": "/cdn/bucket/avatar.jpg",
        "bio": "Author bio",
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T00:00:00Z"
      }
    }
  ]
}
```

**Error Response (500):**
```json
{
  "status": "error",
  "message": "Failed to fetch posts"
}
```

---

### 2. Get Post by Slug
Retrieve a single blog post by its slug.

**Endpoint:** `GET /api/posts/:slug`

**Rate Limit:** 20 requests per minute per IP

**Parameters:**
- `slug` (string, required) - The post slug

**Example:**
```
GET /api/posts/cara-belajar-coding
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "title": "Post Title",
    "slug": "post-slug",
    "excerpt": "Short description",
    "content": "Full MDX content",
    "cover_url": "/cdn/bucket/image.jpg",
    "tags": ["tag1", "tag2"],
    "category_id": "uuid",
    "category": { /* ... */ },
    "status": "published",
    "published_at": "2024-01-01T00:00:00Z",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z",
    "author_id": "uuid",
    "author": { /* ... */ }
  }
}
```

**Error Response (404):**
```json
{
  "status": "error",
  "message": "Post not found"
}
```

---

### 3. Get All Categories
Retrieve all categories.

**Endpoint:** `GET /api/categories`

**Rate Limit:** 10 requests per minute per IP

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "Category Name",
      "slug": "category-slug",
      "description": "Category description",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### 4. Get Posts by Category
Retrieve all posts in a specific category.

**Endpoint:** `GET /api/categories/:slug/posts`

**Rate Limit:** 15 requests per minute per IP

**Parameters:**
- `slug` (string, required) - The category slug

**Example:**
```
GET /api/categories/web-development/posts
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "title": "Post Title",
      /* ... same structure as Get All Posts */
    }
  ]
}
```

---

### 5. Get Posts by Tag
Retrieve all posts with a specific tag.

**Endpoint:** `GET /api/tags/:tag/posts`

**Rate Limit:** 15 requests per minute per IP

**Parameters:**
- `tag` (string, required) - The tag name (URL encoded)

**Example:**
```
GET /api/tags/javascript/posts
GET /api/tags/machine%20learning/posts
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "title": "Post Title",
      /* ... same structure as Get All Posts */
    }
  ]
}
```

---

## Image URLs
All image URLs (`cover_url`, `avatar_url`) are automatically proxied through `/cdn/*` to hide the Supabase storage origin.

**Example:**
```
Original: https://xxx.supabase.co/storage/v1/object/public/bucket/image.jpg
Proxied:  /cdn/bucket/image.jpg
```

---

## Error Handling

### Common Error Codes
- `429` - Rate limit exceeded
- `404` - Resource not found
- `500` - Internal server error

### Error Response Format
```json
{
  "status": "error",
  "message": "Error description"
}
```

---

## Usage Examples

### JavaScript/TypeScript
```typescript
// Fetch all posts
const response = await fetch('/api/posts');
const { data: posts } = await response.json();

// Fetch single post
const response = await fetch('/api/posts/my-post-slug');
const { data: post } = await response.json();

// Fetch posts by category
const response = await fetch('/api/categories/web-dev/posts');
const { data: posts } = await response.json();
```

### cURL
```bash
# Get all posts
curl http://localhost:3000/api/posts

# Get post by slug
curl http://localhost:3000/api/posts/my-post-slug

# Get categories
curl http://localhost:3000/api/categories

# Get posts by category
curl http://localhost:3000/api/categories/web-dev/posts

# Get posts by tag
curl http://localhost:3000/api/tags/javascript/posts
```

### React/Next.js with SWR
```typescript
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function MyComponent() {
  const { data, error, isLoading } = useSWR('/api/posts', fetcher);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;
  
  return (
    <div>
      {data.data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

---

## Notes
- All timestamps are in ISO 8601 format (UTC)
- All responses use JSON format
- CORS is enabled for all origins
- Rate limits reset every 60 seconds
- Only posts with `status: "published"` are returned
