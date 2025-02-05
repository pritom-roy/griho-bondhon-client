# GrihoBandhon Matrimony Platform

GrihoBandhon is a modern matrimonial platform built with the MERN stack (MongoDB, Express, React, and Node.js). It offers a user-friendly experience for individuals looking to find potential life partners through advanced search, filtering, and matchmaking features.


## 🌍 Live Project
[🔗 Visit GrihoBandhon](https://grihobondhon.netlify.app)

---

## 🚀 Technologies Used

- **Frontend:** React.js, Tailwind CSS, React Router, Chart.js, Axios, Lottie React
- **Backend:** Node.js, Express.js, MongoDB (assumed for MERN stack)
- **Authentication:** Firebase Authentication, JWT
- **State Management & Utilities:** LocalForage, Match Sorter, Sort By
- **Alerts & UI Enhancements:** SweetAlert2, React Icons, React CountUp, React Responsive Carousel
- **Build & Development Tools:** Vite, ESLint, PostCSS, Autoprefixer

---

## 🔥 Features

### 🖥️ Fully Responsive Design
- Optimized for mobile, tablet, and desktop views, including an intuitive dashboard.

### 🏠 Homepage Highlights
- Attractive banner/slider.
- Display of premium members with profile cards.
- Sorting options for biodatas based on age.

### 🔎 Advanced Biodata Filtering
- Filter by age range, gender, and location (division).
- Pagination (12 biodatas per page).

### 🔐 Secure Authentication System
- Email/password login and Google Sign-in.
- JWT implementation for secure sessions.
- Persistent login across page reloads.

### 📊 User & Admin Dashboard
#### **User Panel**
- Edit, view, and manage biodata.
- Favorite biodatas and send contact requests.
- Submit success stories.

#### **Admin Panel**
- Manage users and approve premium/contact requests.
- Monitor analytics via a dynamic pie chart.
- Approve and display success stories.

### 💌 Success Stories
- View inspiring marriage stories with images and reviews.
- Sorted by marriage date in descending order.

### 🔔 SweetAlert Notifications
- Smooth UI feedback for login, sign-up, and CRUD operations.

### 🔍 Server-Side Search
- Quick lookup for specific users in the admin panel.

### 🆔 Dynamic ID Management
- Auto-generated biodata IDs on the server side.


---

## 🛠 How to Run the Project Locally

### 1️⃣ Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (latest LTS recommended)
- **NPM or Yarn**
- **Git** (optional, but recommended)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/grihobandhon.git
cd grihobandhon
```

### 3️⃣ Install Dependencies
```sh
npm install
# or
yarn install
```

### 4️⃣ Start the Development Server
```sh
npm run dev
# or
yarn dev
```
The application should now be running on `http://localhost:5173/`.

### 5️⃣ Build for Production
```sh
npm run build
# or
yarn build
```

---

I understand! You should not share sensitive API keys publicly. Instead, instruct users to create a `.env` file and add their own Firebase credentials. Here’s how you can include it in your README:

---

## 🔑 Environment Variables

Before running the project, create a `.env` file in the root directory and add the following variables:

```env
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
```

![Project Screenshot](https://raw.githubusercontent.com/pritom-roy/griho-bondhon-client/main/griho.png)