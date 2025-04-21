# 🔐 Authentication System

A complete full-stack authentication solution with React frontend and Express backend featuring JWT-based authentication with access and refresh tokens.

## 📋 Features

- ✅ **User Registration**: Create new accounts with email validation
- 🔑 **User Authentication**: Secure login with JWT
- 🔄 **Token Management**: Access token and refresh token implementation
- 🛡️ **Protected Routes**: Frontend route protection based on authentication status
- 📱 **Responsive UI**: Modern interface built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 19
- 🧭 React Router v7
- 💅 Tailwind CSS
- 📡 Axios for API requests
- 🍪 Js-cookie for cookie management
- 🎨 Lucide React for icons

### Backend
- 🖥️ Node.js with Express
- 🗄️ MongoDB with Mongoose
- 🔒 JSON Web Tokens (JWT) for authentication
- 🔐 bcryptjs for password hashing
- ✅ Express Validator for input validation

## 🗂️ Project Structure

```
authentication/
├── client/                # React frontend
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── context/       # React context (auth state)
│   │   ├── pages/         # UI pages
│   │   └── routes/        # Route definitions
│   └── ...
│
└── server/                # Express backend
    ├── config/            # Database configuration
    ├── controllers/       # Route controllers
    ├── middleware/        # Express middleware
    ├── models/            # Mongoose schemas
    ├── routes/            # API routes
    └── utils/             # Helper functions (token generation)
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance

### Backend Setup
1. Navigate to the server directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Start the server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```
   cd client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with:
   ```
   REACT_APP_API_URL=<your_api_url>
   ```
4. Start the development server:
   ```
   npm start
   ```

## 🔐 Authentication Flow

1. **Registration**: User creates an account with email, username, and password.
2. **Login**: User receives access token (15 min) and refresh token (7 days).
3. **Authorization**: Access token is used for API requests.
4. **Token Refresh**: When access token expires, refresh token is used to get a new one.
5. **Logout**: Clears tokens and authentication state.

## 🌐 API Endpoints

### Auth Routes
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate and receive tokens
- `POST /auth/refresh` - Get new access token using refresh token

## 💻 Application Routes
- `/` - Home page (protected)
- `/login` - User login
- `/register` - New user registration

## 🧩 Future Enhancements
- Password reset functionality
- Email verification
- OAuth integration (Google, GitHub)
- Role-based access control
- Account management features