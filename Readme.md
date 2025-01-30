# SEO Analyzer Tool

A comprehensive web application for analyzing SEO metrics and website performance, built with a Node.js/TypeScript backend and React/TypeScript frontend.

![SEO Analyzer Screenshot](./screenshot.png) <!-- Add your screenshot here -->

## Features

### Backend
- **JWT Authentication**: Secure user registration/login with Firebase Auth.
- **SEO Metrics Analysis**: 
  - Title tags, meta descriptions, header tags (H1-H6)
  - Image alt attributes analysis
  - Keyword density calculation
  - Internal/external link ratio
- **Performance Insights**:
  - Page load speed via Google PageSpeed Insights
  - Mobile friendliness scoring
  - Resource optimization checks (CSS/JS minification, image compression)
- **History Storage**: Firestore database for analysis history
- **REST API**: Clean endpoints for frontend integration

### Frontend
- 🔒 User Authentication (Login/Register)
- 📊 Interactive Dashboard
- 📈 Visual SEO scoring system
- 📜 Analysis history tracking
- 🎨 Responsive UI with Tailwind CSS
- 🔄 Real-time analysis results

## Technologies

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Authentication**: Firebase Admin SDK
- **SEO Parsing**: Cheerio
- **Performance**: Google PageSpeed Insights API
- **Database**: Firestore
- **Security**: JWT

### Frontend
- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Build**: Vite

## Installation

### Prerequisites
- Node.js (v18+)
- Firebase project
- Google Cloud API key

### Backend Setup
```bash
cd backend
npm install

Create a .env file in backend Directory

PORT=3000
PAGE_SPEED_API_KEY=your-google-api-key
JWT_SECRET=your-jwt-secret
```

- Go to Firebase admin dashboard and make a new Project 
- Dowload serviceAccountKey.json and Save it in src folder


### Frontend Setup
```bash
cd backend
npm install
npm run dev 
```


API Endpoints
Authentication
Method	Endpoint	Description
POST	/auth/register	User registration
POST	/auth/login	User login
Analysis
Method	Endpoint	Description
POST	/api/analyze	Website analysis
GET	/api/history	Get analysis history


Acknowledgments
Firebase for authentication and database

Google PageSpeed Insights API

Cheerio library for HTML parsing

React community for UI components