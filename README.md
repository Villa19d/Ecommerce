<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</div>

<h1 align="center">NitroStore - Full Stack E-Commerce Platform 🛒</h1>

<p align="center">
  A production-ready, highly scalable E-Commerce platform built with a decoupled architecture using <strong>React & Redux</strong> on the frontend and <strong>Django REST Framework</strong> on the backend.
</p>

---

## 🚀 Live Demo
*(Insert Live Link Here - e.g., https://nitrostore.vercel.app)*

## 💡 About The Project
NitroStore is a comprehensive E-Commerce solution designed to demonstrate advanced Full Stack development capabilities. It handles everything from anonymous cart sessions and JWT-based authentication to complex payment processing and cloud-based object storage. 

This project was built focusing on **clean code, scalable architecture, and solving real-world deployment challenges**.

## ✨ Key Features
* **Advanced State Management:** Utilizes Redux Thunk for handling complex synchronous and asynchronous states across the app (Auth, Cart, Products, Orders).
* **Smart Shopping Cart:** 
  * Unauthenticated users have a fully functional cart saved in `localStorage`.
  * Upon login, the local cart seamlessly synchronizes with the database via the REST API.
* **Secure Authentication:** JWT-based authentication (Djoser) with password reset flows and Social Auth (Google/GitHub).
* **Payment Processing:** Integrated with Braintree for secure sandbox credit card processing.
* **Product Management:** Hierarchical categories, stock management, related products, and full-text search filtering.
* **Cloud Infrastructure:**
  * **Neon Serverless Postgres** for the main database.
  * **S3-Compatible Object Storage** (Neon) via `boto3` and `django-storages` to handle persistent media files on ephemeral cloud hosts.
  * **Resend API** for reliable transactional emails (bypassing SMTP restrictions).

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

1. **Decoupled Architecture:** The backend strictly acts as an API, returning JSON data. The frontend consumes this API, providing a true separation of concerns.
2. **Stateless Backend, Stateful Client:** The backend relies on stateless JWTs for authentication, while Redux maintains the application state locally, reducing unnecessary database queries and improving UI speed.
3. **Cloud-Native Solutions:** Solved the classic "vanishing images" problem on ephemeral hosts (like Render/Heroku) by configuring Django to pipe all user-uploaded media directly to an S3-compatible Object Storage.
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

## 📬 Contact & Links

* **Developer:** Rodrigo Villar
* **LinkedIn:** [Insert your LinkedIn URL here]
* **Portfolio:** [Insert your Portfolio URL here]

<p align="center">
  <i>If you are a recruiter or senior developer checking this out, I'd love to hear your feedback!</i>
</p>
