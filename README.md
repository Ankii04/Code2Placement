# Code2Placement - DSA & Placement Preparation Platform

A complete full-stack web application for DSA learning and placement preparation with modern UI, built using React, Node.js, Express, and MongoDB.

## 🚀 Features

### Core Features
- ✅ **DSA Learning** - Comprehensive topics with detailed explanations
- ✅ **Coding Questions** - 500+ practice problems with solutions
- ✅ **Interview Q&A** - Technical and HR interview preparation
- ✅ **Daily Challenges** - New coding challenges every day
- ✅ **Mock Tests** - Company-specific interview simulations
- ✅ **Community Forum** - Connect and learn with peers
- ✅ **Learning Roadmaps** - Structured career paths
- ✅ **Resources** - Study materials and templates

### Advanced Features
- 🔐 **JWT Authentication** - Secure login and registration
- 👤 **User Profiles** - Track progress and achievements
- 🏆 **Badges & Leaderboards** - Gamification elements
- 🌙 **Dark Mode** - Beautiful dark/light theme toggle
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Premium UI** - Glassmorphism and modern design
- 👨‍💼 **Admin Panel** - Content management system

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Custom styling with glassmorphism

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd Code2Placement
```

2. **Install dependencies**

Backend:
```bash
cd server
npm install
```

Frontend:
```bash
cd client
npm install
```

3. **Environment Variables**

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@code2placement.com
ADMIN_PASSWORD=Admin@123
```

4. **Seed the Database**

```bash
cd server
npm run seed
```

This will populate the database with:
- 10 DSA topics
- 30+ coding questions
- 20+ technical interview Q&A
- 20+ HR interview Q&A
- 3 roadmaps
- 3 company profiles
- Badges and achievements
- Admin user account

5. **Run the Application**

Backend (from server directory):
```bash
npm run dev
```

Frontend (from client directory):
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🚀 Deployment to Vercel

### Prerequisites
- Vercel account
- MongoDB Atlas database

### Deployment Steps

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Set Environment Variables in Vercel Dashboard**
- Go to your project settings
- Add all environment variables from `.env.example`
- Redeploy

### Environment Variables for Vercel
```
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=production
ADMIN_EMAIL=admin@code2placement.com
ADMIN_PASSWORD=your_admin_password
```

## 📁 Project Structure

```
Code2Placement/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context (Auth, Theme)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── styles/        # CSS files
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                # Node.js backend
│   ├── api/              # Serverless functions
│   ├── models/           # MongoDB models
│   ├── middleware/       # Auth middleware
│   ├── config/           # Database config
│   ├── utils/            # Seed data
│   └── package.json
├── vercel.json           # Vercel configuration
├── .env.example          # Environment variables template
└── README.md
```

## 🔑 Default Admin Credentials

After seeding the database:
- **Email**: admin@code2placement.com
- **Password**: Admin@123

⚠️ **Important**: Change these credentials in production!

## 🎨 Design Features

- **Glassmorphism** - Modern frosted glass effect
- **Gradient Backgrounds** - Vibrant color schemes
- **Smooth Animations** - Micro-interactions throughout
- **Dark Mode** - Seamless theme switching
- **Responsive** - Mobile-first design
- **Premium Typography** - Inter & Outfit fonts

## 📝 API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify email
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/github-connect` - Connect GitHub
- `GET /api/users/stats` - Get user statistics

### Topics
- `GET /api/topics` - Get all topics
- `GET /api/topics/:id` - Get topic by ID
- `POST /api/topics` - Create topic (Admin)
- `PUT /api/topics/:id` - Update topic (Admin)
- `DELETE /api/topics/:id` - Delete topic (Admin)

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get question by ID
- `POST /api/questions` - Create question (Admin)
- `PUT /api/questions/:id` - Update question (Admin)
- `DELETE /api/questions/:id` - Delete question (Admin)

*...and many more routes for interview Q&A, forum, challenges, etc.*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- All content is 100% original and created for educational purposes
- No copyrighted material from LeetCode, GeeksforGeeks, or other platforms

## 📧 Support

For support, email support@code2placement.com or open an issue in the repository.

---

**Built with ❤️ for aspiring developers**
