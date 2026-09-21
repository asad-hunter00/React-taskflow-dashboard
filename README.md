# Taskflow

Taskflow is a modern task management and team collaboration platform built with React, Node.js, Express, TypeScript, PostgreSQL, Prisma, JWT authentication, and Socket.IO.

It is designed to help teams organize projects, manage tasks, communicate in real time, and keep track of their daily workflow from one place.

## Features

### Authentication
- User registration and login
- JWT authentication
- Secure password hashing with bcrypt
- Forgot password flow
- 6-digit email verification code
- OTP expiration and validation
- Password reset
- Password visibility toggle
- Form validation with React Hook Form

### Task Management
- Create and manage tasks
- Task status management
- Task priority management
- Assign tasks to team members
- Task due dates
- Task filtering and searching
- Complete tasks

### Project Management
- Create projects
- Update project information
- Track project progress
- Project status management
- Project priority management
- Project due dates

### Team Collaboration
- Team member management
- Role-based permissions
- Owner, Admin, and Member roles
- Team member profiles

### Real-Time Communication
- Real-time channels
- Real-time messaging
- Socket.IO integration
- Typing status
- Channel members

### Dashboard & Productivity
- Task overview
- Project overview
- Calendar integration
- Notifications
- Activity tracking

## Password Reset Flow

Taskflow uses a secure multi-step password recovery flow:

```text
Forgot Password
       ↓
Enter Email
       ↓
Receive OTP
       ↓
Verify OTP
       ↓
Create New Password
       ↓
Password Updated
       ↓
Login

Email verification codes are sent using the Resend Email API.

Tech Stack
Frontend
React
React Router
React Hook Form
Zustand
Styled Components
Material UI
Lucide React
Vite
Backend
Node.js
Express.js
TypeScript
PostgreSQL
Prisma ORM
JWT
bcryptjs
Zod
Socket.IO
Resend
express-rate-limit
Deployment
Frontend: Vite / React
Backend: Render
Database: PostgreSQL
Email: Resend
Project Architecture
Taskflow
│
├── Frontend
│   ├── components
│   ├── pages
│   ├── store
│   ├── assets
│   └── App
│
└── Backend
    ├── controllers
    ├── routes
    ├── services
    ├── middleware
    ├── validators
    ├── utils
    ├── config
    ├── prisma
    └── server
Backend Structure
src/
├── config/
│   ├── env.ts
│   └── prisma.ts
│
├── controllers/
│   ├── activity.controller.ts
│   ├── auth.controller.ts
│   ├── calendar.controller.ts
│   ├── channel.controller.ts
│   ├── message.controller.ts
│   ├── notification.controller.ts
│   ├── project.controller.ts
│   ├── task.controller.ts
│   ├── team.controller.ts
│   └── user.controller.ts
│
├── middleware/
│   ├── auth.middleware.ts
│   ├── errorHandler.middleware.ts
│   ├── rateLimiter.middleware.ts
│   ├── role.middleware.ts
│   └── validate.middleware.ts
│
├── routes/
│   ├── activity.routes.ts
│   ├── auth.routes.ts
│   ├── calendar.routes.ts
│   ├── channel.routes.ts
│   ├── index.ts
│   ├── message.routes.ts
│   ├── notification.routes.ts
│   ├── project.routes.ts
│   ├── task.routes.ts
│   ├── team.routes.ts
│   └── user.routes.ts
│
├── services/
│   ├── db.service.ts
│   └── socket.service.ts
│
├── utils/
│   ├── hash.ts
│   ├── jwt.ts
│   ├── mailer.ts
│   ├── otp.ts
│   └── response.ts
│
├── validators/
│   ├── auth.validator.ts
│   ├── channel.validator.ts
│   ├── project.validator.ts
│   ├── task.validator.ts
│   └── team.validator.ts
│
└── app.ts
API

Base URL:

https://react-dashboard-backend-xcol.onrender.com/api
Authentication
POST /auth/register
POST /auth/login
POST /auth/forgot-password
POST /auth/verify-otp
POST /auth/reset-password
Users
GET    /users/me
PUT    /users/profile
PUT    /users/email
PUT    /users/password
PUT    /users/avatar
POST   /users/logout
Projects
GET    /projects
GET    /projects/:id
POST   /projects
PUT    /projects/:id
DELETE /projects/:id
Tasks
GET    /tasks
GET    /tasks/:id
POST   /tasks
PUT    /tasks/:id
PUT    /tasks/:id/status
PUT    /tasks/:id/priority
PUT    /tasks/:id/assign
PUT    /tasks/:id/complete
DELETE /tasks/:id
Calendar
GET /calendar/day
GET /calendar/week
GET /calendar/month
GET /calendar/due-date
Channels & Messages
GET    /channels
GET    /channels/:id
POST   /channels
POST   /channels/:id/members
DELETE /channels/:id/members/:userId

POST   /channels/:channelId/messages
GET    /channels/:channelId/messages
DELETE /messages/:id
Team
GET    /team/members
POST   /team/members
DELETE /team/members/:id
PUT    /team/members/:id/role
Notifications
GET    /notifications
PUT    /notifications/:id/read
PUT    /notifications/read-all
DELETE /notifications/:id
Activity
GET /activities
API Response Format

Successful responses follow a consistent structure:

{
  "success": true,
  "message": "Success message",
  "data": {}
}

Error responses:

{
  "success": false,
  "message": "Error description"
}
Environment Variables

Create a .env file in the backend:

DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=7d

RESEND_API_KEY=

CLIENT_URL=http://localhost:5173
PORT=3000

Never commit your .env file or API keys to GitHub.

Installation
Backend

Clone the repository:

git clone https://github.com/asad-hunter00/React-dashboard-backend.git

Enter the project:

cd React-dashboard-backend

Install dependencies:

npm install --legacy-peer-deps

Generate Prisma Client:

npm run prisma:generate

Run the development server:

npm run dev

Build the project:

npm run build

Start the production server:

npm start
Frontend Setup

Clone or open the frontend project and install dependencies:

npm install

Start the development server:

npm run dev

The frontend connects to the Taskflow backend API.

Security

Taskflow includes several security mechanisms:

JWT-based authentication
bcrypt password hashing
OTP hashing
OTP expiration
Password validation
Request validation with Zod
Authentication rate limiting
Password reset rate limiting
Role-based access control
Protected API endpoints
Environment-based secrets
Real-Time Features

Taskflow uses Socket.IO for real-time communication.

Supported events include:

join_channel
leave_channel
send_message
typing
new_message
user_typing
user_joined_channel
user_left_channel
Roles & Permissions
Role	Permissions
Owner	Full system access
Admin	Manage projects, tasks, team members and channels
Member	Manage own tasks, participate in channels and view projects
Development Workflow

The application follows a modular architecture:

React UI
   ↓
API Requests
   ↓
Express Routes
   ↓
Validation Middleware
   ↓
Controllers
   ↓
Services
   ↓
Prisma ORM
   ↓
PostgreSQL

Real-time communication is handled separately through Socket.IO.

Deployment

The backend is deployed on Render.

Production backend:

https://react-dashboard-backend-xcol.onrender.com

The backend automatically builds and starts using:

npm run build
npm start
Future Improvements

Planned improvements include:

Advanced dashboard analytics
Better project statistics
Drag-and-drop task management
More detailed notifications
File attachments
Team activity improvements
Improved calendar experience
Additional real-time collaboration features
Production database improvements
Custom email domain
Author

Asadbek

Frontend Developer focused on building modern React applications and full-stack projects.
