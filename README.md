<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</div>

<div align="center" style="margin-top: 10px;">
  <a href="README.es.md"><img src="https://img.shields.io/badge/Espa%C3%B1ol-Leer_en_Espa%C3%B1ol-2EA44F?style=for-the-badge" alt="Versión en Español" /></a>
</div>

<h1 align="center">NitroStore - Full Stack E-Commerce Platform 🛒</h1>

<p align="center">
  A production-ready, highly scalable E-Commerce platform built with a decoupled architecture using <strong>React & Redux</strong> on the frontend and <strong>Django REST Framework</strong> on the backend.
</p>

---

## 🚀 Live Demo & Deployment
* **Frontend:** Hosted on Vercel with custom domain routing (https://ecommerce.rodrigodvillar.com).
* **Backend API:** Deployed on Render as a containerized web service.

## 💡 About The Project
NitroStore is a comprehensive E-Commerce solution designed to demonstrate advanced Full Stack development capabilities. It handles everything from anonymous cart sessions and JWT-based authentication to complex payment processing and cloud-based object storage. 

This project was built focusing on **clean code, scalable architecture, and solving real-world deployment challenges**.

## ✨ Key Features
* **Advanced State Management:** Utilizes Redux Thunk for handling complex synchronous and asynchronous states across the app (Auth, Cart, Products, Orders).
* **Smart Shopping Cart:** 
  * Unauthenticated users have a fully functional cart saved in `localStorage`.
  * Upon login, the local cart seamlessly synchronizes with the database via the REST API.
* **Secure Authentication (JWT + OAuth):** JWT-based authentication with automatic refresh tokens via Djoser, password reset flows, and integrated **OAuth2 Social Login (Google / GitHub)**.
* **Robust Payment Processing:** Braintree Drop-in UI integration generating payment method nonces, processed server-side with inventory deduction, order creation, and transactional receipt delivery.
* **Product Reviews & Ratings:** Functional star ratings and comment system validated against verified purchases or authenticated users, demonstrating complex many-to-many user-product relational data handling.
* **User Accounts & Personalization:** Comprehensive user dashboard featuring order history (Order / OrderItem tracking), profile updates, and shipping address management.
* **Product Management:** Hierarchical categories, stock management, related products, and full-text search filtering.

---

## 🛠️ Tech Stack & Architecture

### Frontend (Client-Side)
* **React 18** (SPA rendering)
* **Redux & React-Redux** (Global State)
* **Tailwind CSS & Headless UI** (Rapid, responsive styling)
* **React Router DOM** (Navigation)
* **Axios** (API communication)

### Backend (API-Side)
* **Python 3 / Django 5.2.7** (Core Framework)
* **Django REST Framework** (API Endpoints & Serialization)
* **Djoser** (Auth & JWT Management)
* **PostgreSQL (Neon)** (Relational Database)
* **Django-Anymail + Resend** (HTTP Email API)

---

## 🧠 Technical Highlights for Reviewers

1. **Cloud-Native & Ephemeral Disk Resolution:** Bypassed Render ephemeral disk storage limitations by routing all media file uploads directly to an S3-compatible cloud storage (Neon) using `boto3` and `django-storages`.
2. **Decoupled Architecture:** The backend strictly acts as an API, returning JSON data. The frontend consumes this API, providing a true separation of concerns.
3. **Stateless Backend, Stateful Client:** The backend relies on stateless JWTs for authentication, while Redux maintains the application state locally, reducing unnecessary database queries and improving UI speed.
4. **CI/CD Ready:** Includes `build.sh` for automated deployment pipelines, executing static collection and database migrations automatically upon push.

---

## 💻 Running the Project Locally

To test this project on your local machine, you will need two terminal windows.

### 1. Backend Setup
```bash
# Navigate to the root directory
python -m venv venv
venv\Scripts\activate # On Windows
pip install -r requirements.txt

# Run migrations and start server
cd backend
python manage.py migrate
python manage.py runserver
```

### 2. Frontend Setup
```bash
# Open a new terminal
cd frontend
npm install
npm start
```
The React app will run on `http://localhost:3000` and communicate with the Django API on `http://localhost:8000`.

---

## 📞 Contact & Links

* **Developer:** Rodrigo Villar
* **LinkedIn:**  [www.linkedin.com/in/luis-rodrigo-del-villar-morales-720810325](https://www.linkedin.com/in/luis-rodrigo-del-villar-morales-720810325)
* **Portfolio:** [working on it...]

<p align="center">
  <i>If you are a recruiter or senior developer checking this out, I'd love to hear your feedback!</i>
</p>
