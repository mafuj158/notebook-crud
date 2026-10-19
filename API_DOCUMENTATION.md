# Notebook - REST API Documentation (For Mobile & Web Developers)

This REST API is designed for cross-platform integration (**Web** and **Mobile App**).

---

## 🌐 Base URL
- **Local Dev (Web/Desktop)**: `http://localhost:3000`
- **Android Emulator**: `http://10.0.2.2:3000`
- **iOS Simulator**: `http://localhost:3000`

---

## 🔒 Authentication & Headers

CORS is globally enabled (`*`) for all endpoints.

For authenticated requests, pass the JWT token in the header:
```http
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

---

## 📦 Standard Response Envelope

```json
// Success
{
  "success": true,
  "message": "Optional message",
  "data": { ... }
}

// Error
{
  "success": false,
  "error": "Reason for error"
}
```

---

## 1. Authentication Endpoints

### Register
- **Endpoint**: `POST /api/auth/register`
- **Body**:
```json
{
  "name": "Sumit Saha",
  "email": "sumit@learnwithsumit.com",
  "password": "password123"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOi...",
    "user": {
      "id": "670f...",
      "name": "Sumit Saha",
      "email": "sumit@learnwithsumit.com"
    }
  }
}
```

### Login
- **Endpoint**: `POST /api/auth/login`
- **Body**:
```json
{
  "email": "sumit@learnwithsumit.com",
  "password": "password123"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOi...",
    "user": {
      "id": "670f...",
      "name": "Sumit Saha",
      "email": "sumit@learnwithsumit.com"
    }
  }
}
```

### Current User Profile
- **Endpoint**: `GET /api/auth/me`
- **Header**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "670f...",
    "name": "Sumit Saha",
    "email": "sumit@learnwithsumit.com"
  }
}
```

---

## 2. Notes Endpoints

### List Notes (with Search & Tag filter)
- **Endpoint**: `GET /api/notes`
- **Headers**: `Authorization: Bearer <token>` (optional, scopes to user notes if provided)
- **Query Params**:
  - `search` (e.g. `?search=Prisma`)
  - `tag` (e.g. `?tag=FRONTEND`)

### Create Note
- **Endpoint**: `POST /api/notes`
- **Headers**: `Authorization: Bearer <token>` (required)
- **Body**:
```json
{
  "title": "RESOLVE HYDRATION MISMATCHES IN LAYOUTS",
  "content": "Avoid layouts rendering mismatched markup by checking window state...",
  "tags": ["FRONTEND"]
}
```

### Get Note Details
- **Endpoint**: `GET /api/notes/:id`

### Update Note
- **Endpoint**: `PUT /api/notes/:id`
- **Headers**: `Authorization: Bearer <token>` (required)
- **Body**:
```json
{
  "title": "UPDATED TITLE",
  "content": "Updated content...",
  "tags": ["PRISMA", "PERFORMANCE"]
}
```

### Delete Note
- **Endpoint**: `DELETE /api/notes/:id`
- **Headers**: `Authorization: Bearer <token>` (required)
