# Spotify Backend Clone (Node.js + Express)

This project is a backend API for a Spotify-like music platform, developed as a learning project and suitable for a college internship demonstration/report.

It provides:

- User authentication (register, login, logout)
- Role-based access (`user`, `artist`)
- Music upload by artists
- Album creation by artists
- Music and album browsing for users

---

## 1. Project Overview

### 1.1 Title

**Spotify Backend Clone - Role-based Music Management API**

### 1.2 Abstract

The project implements a RESTful backend system for music management. It supports secure user authentication using JWT and cookies, enforces role-based access control, stores metadata in MongoDB, and uploads media files through ImageKit. The backend is modular and structured with controllers, models, routes, and middleware, making it easy to scale and maintain.

### 1.3 Problem Statement

Modern music platforms require:

- Secure account authentication
- Different permissions for listeners and artists
- Scalable storage of audio files and metadata
- Efficient retrieval of music and album information

This project addresses these requirements with a modular Node.js backend.

### 1.4 Objectives

- Build a secure and modular backend API
- Implement role-based authorization
- Enable artists to upload music and create albums
- Allow users to browse tracks and albums
- Demonstrate practical internship-level backend skills

---

## 2. Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (`jsonwebtoken`) + `cookie-parser`
- **Password Hashing:** `bcryptjs`
- **File Upload Handling:** `multer` (memory storage)
- **Cloud Media Storage:** ImageKit
- **Environment Management:** `dotenv`

---

## 3. Project Structure (Module-Wise)

```
spotify/
|- server.js
|- src/
|  |- app.js
|  |- controllers/
|  |  |- auth.controller.js
|  |  |- music.controller.js
|  |- db/
|  |  |- db.js
|  |- middlewares/
|  |  |- auth.middleware.js
|  |- models/
|  |  |- user.model.js
|  |  |- music.model.js
|  |  |- album.model.js
|  |- routes/
|  |  |- auth.routes.js
|  |  |- music.routes.js
|  |- services/
|     |- storage.service.js
|- package.json
```

### Module Description

1. **Server Module (`server.js`)**

- Loads environment variables
- Connects to MongoDB
- Starts Express server on port `3000`

2. **Application Module (`src/app.js`)**

- Configures middleware (`express.json`, `cookie-parser`)
- Registers route groups:
  - `/api/auth`
  - `/api/music`

3. **Authentication Module**

- Files: `src/routes/auth.routes.js`, `src/controllers/auth.controller.js`
- Responsibilities:
  - Register users with hashed passwords
  - Login using username/email + password
  - Create and set JWT in cookie
  - Logout by clearing cookie

4. **Music Module**

- Files: `src/routes/music.routes.js`, `src/controllers/music.controller.js`
- Responsibilities:
  - Upload music (artist only)
  - Create albums (artist only)
  - Fetch all music (user only)
  - Fetch all albums (user only)
  - Fetch album by ID (user only)

5. **Authorization Middleware Module**

- File: `src/middlewares/auth.middleware.js`
- Responsibilities:
  - Verify JWT from cookie
  - Restrict artist APIs to role `artist`
  - Restrict user APIs to role `user`

6. **Database Module**

- File: `src/db/db.js`
- Responsibilities:
  - Connect application with MongoDB using `MONGO_URI`

7. **Data Model Module**

- Files under `src/models/`
- Models:
  - `user`: username, email, password, role
  - `music`: uri, title, artist reference
  - `album`: title, music references, artist reference

8. **Storage Service Module**

- File: `src/services/storage.service.js`
- Responsibilities:
  - Upload music file data to ImageKit
  - Return uploaded file URL used in `music` records

---

## 4. API Endpoints

### 4.1 Auth Routes

| Method | Endpoint             | Description              | Access         |
| ------ | -------------------- | ------------------------ | -------------- |
| POST   | `/api/auth/register` | Register new user/artist | Public         |
| POST   | `/api/auth/login`    | Login and set JWT cookie | Public         |
| POST   | `/api/auth/logout`   | Clear auth cookie        | Logged-in user |

### 4.2 Music Routes

| Method | Endpoint                     | Description                  | Access      |
| ------ | ---------------------------- | ---------------------------- | ----------- |
| POST   | `/api/music/upload`          | Upload music file + metadata | Artist only |
| POST   | `/api/music/album`           | Create album from music IDs  | Artist only |
| GET    | `/api/music/`                | Fetch all musics             | User only   |
| GET    | `/api/music/albums`          | Fetch all albums             | User only   |
| GET    | `/api/music/albums/:albumId` | Fetch album details by ID    | User only   |

---

## 5. Authentication and Authorization Flow

1. User registers or logs in.
2. Server signs JWT with user `id` and `role`.
3. JWT is stored in a cookie named `token`.
4. Protected routes read and verify cookie token.
5. Middleware allows or denies access based on role.

---

## 6. Local Setup and Installation

### 6.1 Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- ImageKit account and private key

### 6.2 Install dependencies

```bash
npm install
```

### 6.3 Create environment file

Create a `.env` file in project root:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### 6.4 Run project

```bash
npm run dev
```

For production mode:

```bash
npm start
```

Server URL:

- `http://localhost:3000`

---

## 7. Suggested Testing Workflow (Manual)

Use Postman/Thunder Client:

1. Register an `artist` account.
2. Login as artist.
3. Upload music using form-data key: `music` (file) and `title` (text).
4. Create album using uploaded music IDs.
5. Register/login as `user`.
6. Fetch music and albums through GET endpoints.

---

## 8. Internship Project Report Content (Ready to Use)

### 8.1 Introduction

During the internship, I developed a backend service inspired by Spotify to understand real-world backend architecture, authentication, database modeling, and cloud file handling.

### 8.2 Methodology

- Requirement analysis for user and artist roles
- API and schema design
- Implementation using Express and MongoDB
- JWT-based auth with role validation middleware
- Integration with ImageKit for media storage
- Endpoint testing using API client tools

### 8.3 Key Features Implemented

- Role-based login and registration
- Secure password hashing
- Cookie-based session token handling
- Artist music upload pipeline
- Album management and retrieval
- User-oriented content browsing APIs

### 8.4 Outcome

The project demonstrates practical backend engineering skills including modular design, security practices, REST API development, and third-party storage integration.

### 8.5 Learning Outcomes

- Practical use of Express middleware and routing
- MongoDB schema relations using Mongoose references
- JWT authentication and role-based authorization
- Handling binary uploads and cloud storage APIs
- Structuring backend projects for maintainability

### 8.6 Future Scope

- Add refresh token mechanism
- Add pagination and filtering for large datasets
- Add input validation with centralized error handling
- Add unit/integration tests
- Add admin dashboard APIs

---

## 9. Known Notes

- Current role checks are strict (`artist` routes only for artists, music browsing routes only for users).
- Ensure client sends/accepts cookies for authenticated requests.
- Keep `.env` secrets private and never commit them.

---

## 10. Author

Internship Backend Project - Node.js Learning Series
