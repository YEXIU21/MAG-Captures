# MAG Photographs - Local Development Setup

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/YEXIU21/MAG-Captures.git
cd MAG-Captures
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with your configuration
# Copy the template and fill in your values
cp .env.example .env

# Start the backend server
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the frontend development server
npm start
```

Frontend will open at `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mag-photographs
JWT_SECRET=your-secret-key-for-development
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Testing the Application

### 1. Test Home Page
- Navigate to `http://localhost:3000`
- Should see hero section with "Capture Your Moments"
- Check responsive design (resize browser)

### 2. Test Portfolio Page
- Click "Portfolio" in navigation
- Should see portfolio grid (empty initially)
- Test category filtering

### 3. Test Services Page
- Click "Services" in navigation
- Should see 4 service cards with pricing
- Test "Book Now" buttons

### 4. Test Booking Form
- Click "Contact" or "Book Now"
- Fill out booking form
- Submit (will fail if backend not running)

### 5. Test Admin Features
- Backend must be running for auth
- Admin portfolio management requires login
- Navigate to `/admin/portfolio` when authenticated

## API Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Portfolio
```bash
curl http://localhost:5000/api/portfolio
```

### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "John Doe",
    "clientEmail": "john@example.com",
    "clientPhone": "555-1234",
    "serviceType": "portrait",
    "bookingDate": "2024-12-25",
    "duration": 2,
    "location": "Studio",
    "price": 299
  }'
```

## Troubleshooting

### Frontend won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Backend connection error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify backend is running on port 5000

### CORS errors
- Check FRONTEND_URL in backend .env
- Ensure it matches your frontend URL
- Restart backend after changing .env

### Port already in use
```bash
# Kill process using port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process using port 5000 (backend)
lsof -ti:5000 | xargs kill -9
```

## Development Tips

### Hot Reload
- Frontend: Changes auto-reload in browser
- Backend: Use `npm run dev` for auto-reload with nodemon

### Debug Mode
- Frontend: Open browser DevTools (F12)
- Backend: Check console output

### Database
- View MongoDB data with MongoDB Compass
- Connect to `mongodb://localhost:27017`

## Next Steps

1. ✅ Run frontend locally
2. ✅ Run backend locally
3. ✅ Test all features
4. ✅ Set up Cloudinary account

---

**Last Updated**: November 22, 2025
**Project Name**: magcaptures
