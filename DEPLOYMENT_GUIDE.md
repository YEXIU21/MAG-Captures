# MAG Photographs - Deployment Guide

## Overview
This guide covers deploying MAG Photographs to production using:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas
- **Image Storage**: Cloudinary

## Prerequisites
1. GitHub account with repository pushed
2. Vercel account (free tier available)
3. Render account (free tier available)
4. MongoDB Atlas account (free tier available)
5. Cloudinary account (free tier available)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project and cluster
4. Get your connection string
5. Update `MONGODB_URI` in environment variables

## Step 2: Set Up Cloudinary

1. Go to [Cloudinary](https://cloudinary.com/users/register/free)
2. Sign up for free account
3. Go to Dashboard and copy:
   - Cloud Name
   - API Key
   - API Secret
4. Save these for backend configuration

## Step 3: Deploy Backend to Render

1. Go to [Render](https://render.com)
2. Sign up and connect GitHub
3. Create new Web Service
4. Select your repository
5. Configure:
   - **Name**: mag-photographs-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js`
   - **Root Directory**: `backend`

6. Add Environment Variables:
   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<generate-a-strong-secret>
   JWT_EXPIRE=7d
   NODE_ENV=production
   FRONTEND_URL=<your-vercel-frontend-url>
   CLOUDINARY_CLOUD_NAME=<your-cloud-name>
   CLOUDINARY_API_KEY=<your-api-key>
   CLOUDINARY_API_SECRET=<your-api-secret>
   ```

7. Deploy

## Step 4: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up and import your GitHub repository
3. Configure:
   - **Framework**: Next.js (or React)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. Add Environment Variables:
   ```
   REACT_APP_API_URL=<your-render-backend-url>/api
   ```

5. Deploy

## Step 5: Update Configuration

### Backend .env (Render)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mag-photographs
JWT_SECRET=your-strong-secret-key
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend .env (Vercel)
```
REACT_APP_API_URL=https://your-render-app.onrender.com/api
```

## Image Upload Flow

1. Admin uploads image via Portfolio Management page
2. Image is sent to backend
3. Backend uploads to Cloudinary
4. Cloudinary returns secure URL
5. URL is stored in MongoDB
6. Frontend displays image from Cloudinary CDN

## Free Tier Limits

### Cloudinary Free Tier
- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: Unlimited
- **API Calls**: Unlimited

### Render Free Tier
- **Compute**: Shared CPU, 0.5 GB RAM
- **Disk**: 1 GB
- **Bandwidth**: 100 GB/month
- **Auto-sleep**: After 15 minutes of inactivity

### MongoDB Atlas Free Tier
- **Storage**: 512 MB
- **Connections**: 3 concurrent
- **Backup**: Disabled

### Vercel Free Tier
- **Deployments**: Unlimited
- **Bandwidth**: 100 GB/month
- **Serverless Functions**: 1,000,000 invocations/month

## Troubleshooting

### Images Not Uploading
1. Check Cloudinary credentials in Render environment variables
2. Verify Cloudinary account has available storage
3. Check browser console for error messages

### Backend Connection Issues
1. Verify MongoDB Atlas IP whitelist includes Render IP
2. Check CORS configuration in backend
3. Verify JWT_SECRET is set correctly

### Frontend Not Loading
1. Check REACT_APP_API_URL is correct
2. Verify backend is running
3. Check browser console for CORS errors

## Performance Optimization

### Image Optimization
- Cloudinary automatically optimizes images
- Use `fetch_format: 'auto'` for best format
- Use `quality: 'auto'` for optimal quality

### Database Optimization
- Add indexes to frequently queried fields
- Use pagination for portfolio listings
- Cache frequently accessed data

### Frontend Optimization
- Use code splitting with React.lazy()
- Implement image lazy loading
- Minimize bundle size

## Scaling Considerations

When you outgrow free tiers:

1. **Cloudinary**: Upgrade to paid plan ($99+/month)
2. **Render**: Upgrade to paid plan ($7+/month)
3. **MongoDB**: Upgrade to M0 or higher ($0-$57/month)
4. **Vercel**: Upgrade to Pro ($20/month)

## Security Best Practices

1. Never commit `.env` files
2. Use strong JWT secrets
3. Enable HTTPS (automatic on Vercel/Render)
4. Implement rate limiting
5. Validate all user inputs
6. Use environment variables for sensitive data

## Monitoring

### Render
- Check logs in Render dashboard
- Monitor CPU and memory usage
- Set up error notifications

### Vercel
- Check deployment logs
- Monitor function execution time
- Set up error tracking

### MongoDB
- Monitor connection count
- Check storage usage
- Review slow queries

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

**Last Updated**: November 22, 2025
**Project Name**: magcaptures
