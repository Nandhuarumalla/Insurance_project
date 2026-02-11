# Authentication Features Implementation

This document describes the complete authentication system implemented in the agent-frontend application.

## Features Implemented

### 1. User Registration (`src/components/auth/Register.js`)
**Functionality:**
- Users can create a new account with name, email, and password
- Password confirmation field to prevent typos
- Form validation:
  - Name is required
  - Email format validation
  - Password minimum length (6 characters)
  - Password confirmation match validation
- Error messages displayed for validation failures
- Loading state while processing registration
- Automatic navigation to login page after successful registration
- Navigation link to login page for existing users

**API Endpoint:** `POST /auth/register`
```javascript
{
  name: string,
  email: string,
  password: string
}
```

---

### 2. User Login (`src/components/auth/Login.js`)
**Functionality:**
- Users can login with email and password
- Input validation before submission
- JWT token stored in localStorage upon successful login
- User information stored in localStorage for quick access
- Automatic redirect to availability page after login
- Error handling for invalid credentials
- Navigation links to:
  - Register page (for new users)
  - Forgot password page
- Loading state indicator during login

**API Endpoint:** `POST /auth/login`
```javascript
{
  email: string,
  password: string
}
```

**Response:**
```javascript
{
  token: string,
  user: {
    id: string,
    name: string,
    email: string,
    verified: boolean
  }
}
```

---

### 3. Email Verification
**Functionality:**
- Registration success message prompts user to verify email
- Backend sends verification email with a link
- Email verification link directs to backend verification endpoint
- User must verify email before accessing protected routes

**Implementation Notes:**
- Verification link should be sent to user's email after registration
- Backend handles email verification and updates user verified status
- Frontend shows message: "Registered successfully! Please verify your email."

---

### 4. Forgot Password (`src/components/auth/ForgotPassword.js`)
**Functionality:**
- Users can request a password reset by entering their email
- Email validation before submission
- Loading state while processing request
- Success message displayed after sending reset email
- Success message includes instructions to check email
- Automatic redirect to login page after 3 seconds
- Navigation links to:
  - Login page
  - Register page
- Error handling for invalid email or server errors

**API Endpoint:** `POST /auth/forgot-password`
```javascript
{
  email: string
}
```

---

### 5. Password Reset (`src/components/auth/ResetPassword.js`)
**Functionality:**
- Users reset password using a token from email link
- Token extracted from URL query parameter (`?token=xxxxx`)
- Form validation:
  - Password minimum length (6 characters)
  - Password confirmation match validation
- Loading state while processing password reset
- Success message on completion
- Automatic redirect to login page after 2 seconds
- Invalid token detection with appropriate error message
- Error handling for password reset failures
- Navigation link back to login

**API Endpoint:** `POST /auth/reset-password`
```javascript
{
  token: string,
  password: string
}
```

---

## Component Structure

```
src/components/auth/
├── Register.js          // Registration component
├── Login.js             // Login component
├── ForgotPassword.js    // Forgot password component
├── ResetPassword.js     // Password reset component
└── auth.css             // Shared styles
```

---

## Styling

**CSS Classes Added:**
- `.error-message` - Red/pink background for error alerts
- `.success-message` - Green background for success alerts
- `.auth-link` - Links between auth pages (gray text with yellow hover)
- `.auth-links` - Container for multiple auth links
- Button `:hover` and `:disabled` states for better UX

**Color Scheme:**
- Primary: `#f7c600` (Yellow)
- Error: `#f8d7da` (Light Red)
- Success: `#d4edda` (Light Green)
- Text: Dark gray/black

---

## API Integration (`src/services/api.js`)

**Features:**
1. **JWT Token Management**
   - Automatically attaches JWT token from localStorage to every request
   - Token sent in `Authorization: Bearer {token}` header

2. **Error Handling**
   - 401 Unauthorized: Clears token/user data and redirects to login
   - Other errors: Returns error details for component-level handling

3. **Axios Instance**
   - Base URL: `http://localhost:8081/api`
   - Request interceptor: Adds JWT token
   - Response interceptor: Handles auth errors globally

---

## Data Flow

### Registration Flow
```
User fills form
    ↓
Form validation
    ↓
POST /auth/register
    ↓
Success: Navigate to /login
Error: Display error message
```

### Login Flow
```
User enters credentials
    ↓
Input validation
    ↓
POST /auth/login
    ↓
Success: Save token & user data → Navigate to /availability
Error: Display error message
```

### Forgot Password Flow
```
User enters email
    ↓
Email validation
    ↓
POST /auth/forgot-password
    ↓
Success: Show message → Auto-redirect to /login after 3s
Error: Display error message
```

### Password Reset Flow
```
User clicks email link (with token)
    ↓
Extract token from URL
    ↓
User enters new password
    ↓
Password validation
    ↓
POST /auth/reset-password
    ↓
Success: Show message → Auto-redirect to /login after 2s
Error: Display error message
```

---

## LocalStorage Usage

**Token:**
- Key: `token`
- Value: JWT token string
- Used for: API authentication
- Cleared on: Unauthorized (401) response

**User Data:**
- Key: `user`
- Value: JSON stringified user object
- Used for: Quick access to logged-in user info
- Cleared on: Unauthorized (401) response, logout

---

## Navigation Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Register | User registration |
| `/login` | Login | User login |
| `/forgot` | ForgotPassword | Request password reset |
| `/reset` | ResetPassword | Reset password with token |
| `/availability` | Availability | Protected route (requires login) |

---

## Security Features

1. **Password Validation**
   - Minimum 6 characters
   - Confirmation field to prevent typos
   - Never displayed in plain text in logs

2. **Token Management**
   - JWT stored in localStorage
   - Automatically attached to API requests
   - Cleared on 401 errors

3. **Email Verification**
   - Required before full account access
   - Unique verification tokens sent in emails
   - Backend validates verification

4. **Password Reset**
   - Tokens expire after set time
   - Tokens are one-time use
   - User email validated during reset

---

## Backend Requirements

The frontend expects the following backend API endpoints:

### 1. POST /auth/register
```
Request: { name, email, password }
Response: { message, userId }
```

### 2. POST /auth/login
```
Request: { email, password }
Response: { token, user: { id, name, email, verified } }
```

### 3. POST /auth/forgot-password
```
Request: { email }
Response: { message }
Note: Backend should send verification email with reset link
```

### 4. POST /auth/reset-password
```
Request: { token, password }
Response: { message }
```

### 5. Email Verification (Backend)
```
GET /auth/verify?token=xxxx
Response: { message }
Note: Verifies user email and sets verified flag
```

---

## Error Handling

**Common Error Messages:**
- "Name is required" - Empty name field
- "Please enter a valid email address" - Invalid email format
- "Password must be at least 6 characters" - Short password
- "Passwords do not match" - Password mismatch
- "Invalid credentials. Please try again." - Wrong login credentials
- "Failed to send reset link. Please try again." - Email send error
- "Invalid reset link. Please request a new one." - Missing/invalid token
- "Failed to reset password. Please try again." - Password reset error

---

## Testing Checklist

- [ ] Register with valid data → Success message + redirect to login
- [ ] Register with invalid email → Error message displayed
- [ ] Register with short password → Error message displayed
- [ ] Register with mismatched passwords → Error message displayed
- [ ] Login with valid credentials → Token saved + redirect to availability
- [ ] Login with invalid credentials → Error message displayed
- [ ] Forget password with valid email → Success message + auto-redirect
- [ ] Forget password with invalid email → Error message displayed
- [ ] Reset password with valid token → Success message + auto-redirect
- [ ] Reset password with mismatched passwords → Error message displayed
- [ ] Logout functionality clears token and redirects to login
- [ ] Protected routes redirect to login if no token
- [ ] Token automatically attached to API requests

---

## Future Enhancements

1. **Two-Factor Authentication (2FA)**
2. **Social Login** (Google, GitHub, etc.)
3. **Password Strength Indicator**
4. **Email Resend Verification Link**
5. **Account Lockout** after failed login attempts
6. **Session Timeout** for inactive users
7. **Remember Me** functionality
8. **Biometric Authentication**
9. **Account Recovery Options**
10. **Login History** tracking
