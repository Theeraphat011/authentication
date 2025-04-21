Authentication System
A complete full-stack authentication solution with React frontend and Express backend featuring JWT-based authentication with access and refresh tokens.

📋 Features
User Registration: Create new accounts with email validation
User Authentication: Secure login with JWT
Token Management: Access token and refresh token implementation
Protected Routes: Frontend route protection based on authentication status
Responsive UI: Modern interface built with Tailwind CSS

🛠️ Tech Stack

Frontend
React 19
React Router v7
Tailwind CSS
Axios for API requests
Js-cookie for cookie management
Lucide React for icons

Backend
Node.js with Express
MongoDB with Mongoose
JSON Web Tokens (JWT) for authentication
bcryptjs for password hashing
Express Validator for input validation

🗂️ Project Structure
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

⚙️ Installation & Setup
Prerequisites
Node.js (v16+ recommended)
MongoDB instance
Backend Setup
Navigate to the server directory:

Install dependencies:

Create a .env file with the following variables:

Start the server:

Frontend Setup
Navigate to the client directory:

Install dependencies:

Create a .env file with:

Start the development server:

🔐 Authentication Flow
Registration: User creates an account with email, username, and password
Login: User receives access token (15 min) and refresh token (7 days)
Authorization: Access token is used for API requests
Token Refresh: When access token expires, refresh token is used to get a new one
Logout: Clears tokens and authentication state

🌐 API Endpoints
Auth Routes
POST /auth/register - Register a new user
POST /auth/login - Authenticate and receive tokens
POST /auth/refresh - Get new access token using refresh token

💻 Application Routes
/ - Home page (protected)
/login - User login
/register - New user registration

🧩 Future Enhancements
Password reset functionality
Email verification
OAuth integration (Google, GitHub)
Role-based access control
Account management features