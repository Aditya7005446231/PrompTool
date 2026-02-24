# PrompTool - Project Management Application

A modern, full-stack project management tool built with React and Express.js, designed to help teams organize projects, manage tasks, and collaborate efficiently.

## 📋 Features

- **Dashboard Overview** - Real-time statistics and project insights
- **Project Management** - Create, organize, and track multiple projects
- **Task Management** - Assign, prioritize, and monitor tasks
- **Board View** - Kanban-style board for visual task management
- **Team Collaboration** - Manage team members and assignments
- **User Authentication** - Secure login and registration system
- **Settings** - Customize your workspace and preferences

## 🚀 Tech Stack

### Frontend
- **React 19.2** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **CoreUI** - Professional UI components
- **Lucide React** - Beautiful icon library
- **React Icons** - Additional icon sets

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (via Mongoose)
- **JWT** - JSON Web Tokens for authentication
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
PrompTool1/
├── backend/                 # Backend API server
│   ├── config/             # Configuration files
│   │   └── db.js          # Database connection
│   ├── controllers/        # Request handlers
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskControllers.js
│   ├── middleware/         # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/             # Database models
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/              # Utility functions
│   │   └── generateToken.js
│   ├── index.js            # Server entry point
│   └── package.json
│
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images, fonts, etc.
│   │   ├── components/     # Reusable components
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskBar.jsx
│   │   │   ├── StatsSection.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── RecentItems.jsx
│   │   ├── context/        # React Context API
│   │   │   └── TaskContext.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Board.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── SignIn.jsx
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md               # This file
```

## ⚙️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Clone the Repository
```bash
git clone https://github.com/Aditya7005446231/PrompTool.git
cd PrompTool1
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the backend server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd ../client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory (if needed):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔧 Available Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🎨 Features in Detail

### Dashboard
- Overview of all projects and tasks
- Statistics and analytics
- Recent activity feed
- Quick access to important items

### Project Management
- Create and organize projects
- Set deadlines and priorities
- Track progress
- Assign team members

### Task Management
- Create tasks with descriptions
- Set due dates and priorities
- Assign to team members
- Track task status (To Do, In Progress, Done)

### Board View
- Kanban-style board
- Drag and drop functionality
- Visual task organization
- Status columns

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Aditya Rai**
- GitHub: [@Aditya7005446231](https://github.com/Aditya7005446231)

## 🙏 Acknowledgments

- React team for the amazing library
- Express.js community
- All contributors and users of this project

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Happy Project Managing! 🚀**
