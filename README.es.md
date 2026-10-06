<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</div>

<div align="center" style="margin-top: 10px;">
  <a href="README.md"><img src="https://img.shields.io/badge/English-Read_in_English-blue?style=for-the-badge" alt="Read in English" /></a>
</div>

<h1 align="center">NitroStore - E-Commerce Full Stack 🛒</h1>

<p align="center">
  Una plataforma de E-Commerce altamente escalable y lista para producción, construida con una arquitectura desacoplada utilizando <strong>React & Redux</strong> en el frontend y <strong>Django REST Framework</strong> en el backend.
</p>

---

## 🚀 Demo en Vivo y Despliegue
* **Frontend:** Alojado en Vercel con enrutamiento de dominio personalizado (https://ecommerce.rodrigodvillar.com).
* **Backend API:** Desplegado en Render como un servicio web contenedorizado.

## 💡 Sobre el Proyecto
NitroStore es una solución integral de comercio electrónico diseñada para demostrar habilidades avanzadas de desarrollo Full Stack. Maneja desde sesiones de carrito anónimas y autenticación basada en JWT, hasta procesamiento complejo de pagos y almacenamiento de objetos en la nube.

Este proyecto se construyó con un enfoque en **código limpio, arquitectura escalable y resolución de problemas reales de despliegue en producción**.

## ✨ Características Principales
* **Manejo de Estado Avanzado:** Utiliza Redux Thunk para manejar estados síncronos y asíncronos complejos en toda la aplicación (Autenticación, Carrito, Productos, Órdenes).
* **Carrito de Compras Inteligente:** 
  * Los usuarios no autenticados tienen un carrito completamente funcional guardado en `localStorage`.
  * Al iniciar sesión, el carrito local se sincroniza automáticamente con la base de datos a través de la API REST.
* **Autenticación Segura (JWT + OAuth):** Autenticación basada en JWT con actualización automática de tokens (refresh tokens) vía Djoser, flujos de recuperación de contraseña y **Login Social OAuth2 integrado (Google / GitHub)**.
* **Procesamiento de Pagos Robusto:** Integración de Braintree Drop-in UI que genera "nonces" de métodos de pago, los cuales son procesados del lado del servidor desencadenando la deducción de inventario, creación de órdenes y el envío de recibos transaccionales.
* **Reseñas y Calificaciones de Productos:** Sistema funcional de calificación por estrellas y comentarios, validado contra compras verificadas o usuarios autenticados, demostrando el manejo de datos relacionales complejos (muchos a muchos) entre usuarios y productos.
* **Cuentas de Usuario y Personalización:** Panel de usuario completo que incluye historial de pedidos (seguimiento de Order / OrderItem), actualización de perfil y gestión de direcciones de envío.
* **Gestión de Productos:** Categorías jerárquicas, gestión de inventario, productos relacionados y filtrado de búsqueda de texto completo (full-text search).

---

## 🛠️ Stack Tecnológico y Arquitectura

### Frontend (Lado del Cliente)
* **React 18** (Renderizado SPA)
* **Redux & React-Redux** (Estado Global)
* **Tailwind CSS & Headless UI** (Estilos rápidos y responsivos)
* **React Router DOM** (Navegación)
* **Axios** (Comunicación con la API)

### Backend (Lado de la API)
* **Python 3 / Django 5.2.7** (Framework Core)
* **Django REST Framework** (Endpoints API y Serialización)
* **Djoser** (Gestión de Autenticación y JWT)
* **PostgreSQL (Neon)** (Base de Datos Relacional)
* **Django-Anymail + Resend** (API HTTP de Correos)

---

## 🧠 Puntos Técnicos Destacados (Para Reclutadores)

1. **Resolución de Discos Efímeros y Cloud-Native:** Se sortearon las limitaciones de almacenamiento en discos efímeros de Render, enrutando todas las subidas de archivos multimedia directamente a un almacenamiento en la nube compatible con S3 (Neon Object Storage) utilizando `boto3` y `django-storages`.
2. **Arquitectura Desacoplada:** El backend actúa estrictamente como una API, devolviendo datos en formato JSON. El frontend consume esta API, proporcionando una verdadera separación de responsabilidades (separation of concerns).
3. **Backend Sin Estado (Stateless), Cliente Con Estado (Stateful):** El backend confía en tokens JWT sin estado para la autenticación, mientras que Redux mantiene el estado de la aplicación localmente, reduciendo consultas innecesarias a la base de datos y mejorando drásticamente la velocidad de la interfaz.
4. **Preparado para CI/CD:** Incluye `build.sh` para pipelines de despliegue automatizados, ejecutando la recopilación de archivos estáticos y las migraciones de la base de datos automáticamente con cada push.

---

## 💻 Ejecutar el Proyecto Localmente

Para probar este proyecto en tu máquina local, necesitarás dos ventanas de terminal.

### 1. Configuración del Backend
```bash
# Navega al directorio raíz
python -m venv venv
venv\Scripts\activate # En Windows
pip install -r requirements.txt

# Ejecuta migraciones e inicia el servidor
cd backend
python manage.py migrate
python manage.py runserver
```

### 2. Configuración del Frontend
```bash
# Abre una nueva terminal
cd frontend
npm install
npm start
```
La aplicación de React se ejecutará en `http://localhost:3000` y se comunicará con la API de Django en `http://localhost:8000`.

---

## 📞 Contacto y Enlaces

* **Desarrollador:** Rodrigo Villar
* **LinkedIn:**  [www.linkedin.com/in/luis-rodrigo-del-villar-morales-720810325](https://www.linkedin.com/in/luis-rodrigo-del-villar-morales-720810325)
* **Portafolio:** [trabajando en ello...]

<p align="center">
  <i>Si eres un reclutador o desarrollador Senior revisando esto, ¡me encantaría escuchar tus comentarios!</i>
</p>
