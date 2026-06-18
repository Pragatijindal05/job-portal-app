# CareerHub - Full-Stack Job Portal Application

CareerHub is a responsive, high-performance full-stack job portal application designed for tech professionals. It features a decoupled architecture with a dynamic React frontend and an independent Node.js/Express backend API, allowing job seekers to search, filter, and apply for roles seamlessly.

## Live Links
- **Live Frontend Platform:** https://job-portal-app-three-rho.vercel.app/
- **Live Backend API Engine:** https://job-portal-app-1y5q.onrender.com

---

##  Core Features

- **Dynamic Job Feed:** Fetches live, production-ready job operational parameters from a REST API.
- **Instant Search & Multi-Attribute Filtering:** Built-in client-side state filtering logic allowing users to search by titles/companies and isolate positions by type (Full-time/Part-time) or location (Remote/On-site) instantly without reloading.
- **Interactive Application Portal:** A clean, responsive structural modal window handling text inputs and resume links with instant client-side validation.
- **Modern UI Layout:** Fully optimized, mobile-responsive layout designed with dark-mode aesthetic navigation components.

---

##  Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, JavaScript (ES6+)
- **Backend Server:** Node.js, Express.js
- **Data Layer:** Local JSON persistent state provisioning
- **Deployment Environments:** Vercel (Frontend), Render (Backend)

---

##  Project Structure

```text
job-portal/
├── backend/
│   ├── data/jobs.json          # Mock database tracking jobs
│   ├── server.js               # Express application server configurations
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/         # Navbar.jsx, JobCard.jsx, FilterSidebar.jsx
    │   ├── App.jsx             # Core React application engine & state loop
    │   ├── main.jsx            # React virtual DOM entry point
    │   └── index.css           # Tailwind directive injections
    ├── index.html              # Core application entry
    ├── tailwind.config.js      # Utility design configuration
    └── package.json
