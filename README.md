# 🌍 Plan It – Your Local Guide

> A smart, web-based **trip planning and local discovery platform** designed for **VIT-AP University students** and the local community.  
It helps users **discover attractions, services, restaurants, and events**, while offering **verified reviews, trip cost estimation, vehicle rentals, and trending picks**.

---

## 🚀 Features

✅ **Login & Authentication**  
- Separate login for **VIT-AP students** (via university email) and **public users** (via Google).  
- Verified student reviews to avoid fake ratings.  

✅ **Attractions & Services Guide**  
- Categorized listings of businesses, restaurants, services, and tourist spots.  
- Reviews and ratings (general + student-only).  

✅ **Trip Planning & Estimation**  
- Plan trips by selecting **days and group size**.  
- Suggests places, calculates **distance, cost, and navigation routes**.  
- Auto-suggests **vehicle type** (bike, car, van).  

✅ **Vehicle Rentals**  
- Vehicle owners can **register their vehicles** for rent.  
- Admin verification for authenticity.  
- Direct booking with owners.  

✅ **Offers & Discounts**  
- Live updates on discounts from restaurants, malls, shops, and services.  

✅ **Trending Picks**  
- Weekly **Top 5 places visited by VIT-AP students**.  

✅ **Map Integration**  
- Integrated with **Google Maps API** for routes and navigation.  

---

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js / Express.js (or PHP if chosen)  
- **Database**: MySQL / MongoDB  
- **Authentication**: Google OAuth + University Email Domain Check  
- **APIs**: Google Maps API, Social Media APIs  
- **Deployment**: Docker + Cloud (AWS / Vercel / Netlify)

---

## 📂 Project Structure (Example)

Plan-It/
│── frontend/ # React frontend
│── backend/ # Express backend
│── database/ # DB schemas
│── docs/ # Documentation (SRS, reports, PPTs)
│── README.md


---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/plan-it.git
   cd plan-it
---

2.Setup frontend:

  cd frontend
  npm install
  npm start


3.Setup backend:

  cd backend
  npm install
  npm run dev


4.Configure .env files for:

  Database connection

  Google Maps API key

  OAuth credentials
