# MAG Photographs - Professional Photography Website

A full-stack web application for MAG Photographs featuring portfolio showcase, booking system, and service management.

## Project Structure

```
magcaptures/
├── backend/          # Node.js/Express API server
├── frontend/         # React web application
└── README.md        # This file
```

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Features

### Core Features
1. **Portfolio Gallery** - Showcase photography work with filtering by category
2. **Booking System** - Clients can book photography sessions
3. **Service Management** - Display service offerings with pricing
4. **User Authentication** - Secure admin access with JWT
5. **Responsive Design** - Mobile-friendly interface
6. **Contact Form** - Client inquiries and booking requests

### Admin Features
- Manage portfolio items
- View and manage bookings
- Update service information
- User authentication and authorization

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mag-photographs
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Portfolio
- `GET /api/portfolio` - Get all portfolios
- `GET /api/portfolio/:id` - Get single portfolio
- `POST /api/portfolio` - Create portfolio (admin only)
- `PUT /api/portfolio/:id` - Update portfolio (admin only)
- `DELETE /api/portfolio/:id` - Delete portfolio (admin only)

### Bookings
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking (admin only)
- `DELETE /api/bookings/:id` - Delete booking (admin only)

## Code Architecture

### Separation of Concerns
- **Models**: Database schemas and validation
- **Controllers**: Business logic and request handling
- **Routes**: API endpoint definitions
- **Middleware**: Authentication and error handling
- **Components**: Reusable UI elements
- **Pages**: Full page layouts
- **Utils**: Helper functions and API client

### Clean Code Principles
- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Meaningful naming conventions
- Proper error handling
- Modular structure

## Development Workflow

1. Make changes to backend or frontend
2. Test locally
3. Commit changes
4. Deploy to production

## Deployment

### Backend Deployment
- Deploy to Heroku, AWS, or similar platform
- Update environment variables
- Ensure MongoDB connection is configured

### Frontend Deployment
- Build: `npm run build`
- Deploy to Netlify, Vercel, or similar platform
- Update API URL in environment variables

## Contributing

1. Follow the established code structure
2. Use meaningful commit messages
3. Test changes before committing
4. Keep components small and focused

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, contact: info@magphotographs.com

---

**Last Updated**: November 23, 2024
