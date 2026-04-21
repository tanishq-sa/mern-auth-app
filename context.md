## Project: MERN Login & Signup System (Monochrome UI)

---

## 1. Overview

Build a **full-stack MERN application** with:

* User Signup & Login
* API integration (Node + Express)
* MongoDB for storage
* JWT-based authentication
* Protected routes
* Dashboard after login

Flow:

```
Signup → Login → Dashboard
Invalid Login → Error Message
```

---

## 2. Tech Stack

### Frontend

* React (Vite or CRA)
* JavaScript (no TypeScript)
* Tailwind CSS (Monochrome theme)
* Axios (API calls)
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (authentication)
* bcrypt (password hashing)

---

## 3. Design System (Monochrome)

### Colors

```
Background: #0a0a0a
Card: #111111
Border: #222222
Text Primary: #ffffff
Text Secondary: #aaaaaa
Accent: #ffffff
Hover: #1a1a1a
Error: #ff4d4d
```

### UI Rules

* Minimalistic
* No gradients
* High contrast
* Rounded corners (lg)
* Subtle borders instead of shadows

---

## 4. Folder Structure

### Backend

```
backend/
  ├── models/
  │     └── User.js
  ├── routes/
  │     └── auth.js
  ├── controllers/
  │     └── authController.js
  ├── middleware/
  │     └── authMiddleware.js
  ├── config/
  │     └── db.js
  ├── server.js
```

### Frontend

```
frontend/
  ├── src/
  │    ├── pages/
  │    │     ├── Signup.jsx
  │    │     ├── Login.jsx
  │    │     └── Dashboard.jsx
  │    ├── components/
  │    │     └── Input.jsx
  │    ├── services/
  │    │     └── api.js
  │    ├── App.jsx
  │    └── main.jsx
```

---

## 5. Backend Design

### User Model

```js
{
  name: String,
  email: { type: String, unique: true },
  password: String
}
```

---

### API Endpoints

#### 1. Signup

```
POST /api/signup
```

* Validate:

  * Email format
  * Password ≥ 6 chars
* Hash password
* Store user

#### 2. Login

```
POST /api/login
```

* Check user exists
* Compare password
* Return JWT token

---

### JWT Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "name": "Tanishq",
    "email": "example@mail.com"
  }
}
```

---

### Auth Middleware

* Verify token
* Attach user to request
* Protect dashboard route

---

## 6. Frontend Flow

### Signup Page

Fields:

* Name
* Email
* Password

Validation:

* Required fields
* Email format
* Password length

---

### Login Page

* Email
* Password
* Call `/api/login`
* Show error if invalid

---

### Token Handling

```js
localStorage.setItem("token", token)
```

---

### Protected Route Logic

```js
if (!token) redirect("/login")
```

---

## 7. Dashboard UI

Based on image in document (Page 2) :

### Layout

* Centered card
* Product-style UI

### Elements

* Title: “Choose your style”
* Image (shirt)
* Buttons:

  * Normal
  * Tuxedo
* Description text
* Confirm button

---

### UI Behavior

* Button selection state
* Highlight selected option
* Confirm action (no backend needed)

---

## 8. API Integration (Frontend)

### Axios Setup

```js
const api = axios.create({
  baseURL: "http://localhost:5000/api"
})
```

---

### Signup Call

```js
api.post("/signup", data)
```

### Login Call

```js
api.post("/login", data)
```

---

## 9. Validation Strategy

### Frontend

* Instant validation
* Disable submit if invalid

### Backend

* Re-validate all inputs
* Return proper error messages

---

## 10. Error Handling

Show:

* Invalid credentials
* User already exists
* Server errors

UI:

* Red text
* Small and clean

---

## 11. Bonus Features (Recommended)

* JWT expiry handling
* Logout button
* Responsive UI
* Loading states
* Form animations (subtle)

---

## 12. Deliverables

* GitHub Repo (frontend + backend)
* Working APIs
* Functional UI
* Clean code structure

---

## 13. Claude Instructions

When generating code:

* Use **JavaScript only**
* Follow **MERN architecture strictly**
* Keep code **modular and clean**
* Use **Tailwind for styling**
* Maintain **monochrome UI consistency**
* Avoid unnecessary complexity
* Prefer **production-like patterns**

