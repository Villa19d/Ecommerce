# Informe del proyecto y del despliegue

**Proyecto:** ECommerceV2.0.0  
**Fecha del informe:** 2026-09-24  
**Alcance:** resumen de lo analizado y realizado durante este chat sobre este proyecto.

## 1. Qué es el proyecto

ECommerceV2.0.0 es una tienda online DEMO de productos tecnológicos separada en dos aplicaciones:

- `backend/`: API y lógica de negocio desarrolladas con Django 5, Django REST Framework y Djoser.
- `frontend/`: interfaz desarrollada con React 18, Redux, React Router y TailwindCSS.

El proyecto incluye catálogo, categorías jerárquicas, búsqueda, filtros, carrito, autenticación, checkout, pagos, pedidos, cupones, envíos, reseñas, lista de deseos y perfil de usuario.

## 2. Arquitectura principal

### Backend

El punto de entrada de administración es `backend/manage.py`. La configuración global está en `backend/backend/settings.py` y las rutas principales en `backend/backend/urls.py`.

Las rutas de la API están organizadas por aplicación:

- `/auth/`: registro, activación, login, JWT, recuperación de contraseña y OAuth mediante Djoser.
- `/api/category/`: categorías y subcategorías.
- `/api/product/`: listado, detalle, búsqueda, productos relacionados y filtros.
- `/api/cart/`: operaciones del carrito.
- `/api/payment/`: token de Braintree, cálculo de totales y procesamiento del pago.
- `/api/orders/`: historial y detalle de órdenes.
- `/api/shipping/`: opciones de envío.
- `/api/reviews/`: reseñas.
- `/api/wishlist/`: lista de deseos.
- `/api/coupons/`: cupones.
- `/api/profile/`: perfil del usuario.

El usuario es un modelo personalizado (`user.UserAccount`) que utiliza el email como campo de login. Al crear un usuario se crea también su carrito.

La base de datos local original está configurada para MySQL. Si existe `DATABASE_URL`, el proyecto intenta utilizar esa URL mediante `dj-database-url`, permitiendo usar PostgreSQL en producción.

### Catálogo

`Product` contiene nombre, imagen, descripción, precio, precio anterior, categoría, inventario y unidades vendidas. `Category` permite una relación padre/subcategoría.

La función `seed_tech_store.py` prepara categorías y productos de tecnología, como laptops, desktops, teclados, ratones, monitores, audífonos y micrófonos.

### Carrito y compra

El carrito funciona de dos maneras:

- Visitante: se guarda en `localStorage` del navegador.
- Usuario autenticado: se guarda en las tablas `Cart` y `CartItem`.

Al iniciar sesión, Redux intenta sincronizar el carrito local con el carrito persistente del usuario.

El checkout calcula precio, descuento, impuesto y envío. El pago usa Braintree. Cuando la transacción tiene éxito, el backend actualiza inventario, incrementa ventas, crea la orden, crea sus artículos, intenta enviar un correo y vacía el carrito.

### Frontend

Las rutas principales de React están en `frontend/src/App.js`:

- Inicio.
- Registro, login, activación y recuperación de contraseña.
- Tienda, búsqueda y detalle de producto.
- Carrito, checkout y confirmación de compra.
- Dashboard, historial de pagos, detalle de pago y perfil.

Redux separa el estado en dominios como `Auth`, `Products`, `Cart`, `Payment`, `Orders`, `Shipping`, `Coupons`, `Reviews`, `Wishlist` y `Profile`.

El frontend usa `REACT_APP_API_URL` para construir las URL de la API. El proxy de desarrollo sirve las imágenes `/media` desde Django en `localhost:8000`.

## 3. Despliegue considerado

Inicialmente se planteó esta arquitectura:

- Frontend en Vercel.
- Backend Django en Render.
- PostgreSQL administrado por Render.

Se descartó usar el PostgreSQL gratuito de Render como almacenamiento permanente porque, según la documentación consultada, las bases de datos gratuitas de Render expiran después de 30 días y posteriormente pueden eliminarse.

La alternativa elegida fue:

- Vercel para el frontend React.
- Render Free para el backend Django.
- Neon Free para PostgreSQL.

Neon fue elegido porque su plan gratuito es permanente, aunque tiene límites de almacenamiento, cómputo y transferencia. El backend de Render puede dormir por inactividad, pero eso no implica que la base de datos de Neon se elimine.

## 4. Acciones realizadas en este chat

### Revisión inicial

Se revisaron:

- Estructura general del repositorio.
- `Lesson.txt`.
- `build.sh`.
- `requirements.txt`.
- `frontend/package.json`.
- Configuración de Django.
- URLs, modelos, vistas y serializers de productos, categorías, usuarios, carrito, pagos y órdenes.
- Acciones y reducers de Redux.
- Pantallas de tienda, checkout y dashboard.
- Pruebas unitarias de Django.
- Pruebas E2E de Playwright.

No se modificó código de negocio durante esa revisión.

### Estado de Git

Al inicio se confirmó que el repositorio estaba en la rama `develop` y que el commit más reciente era:

```text
07fa599 Configure settings for Vercel and Render deployment
```

También se comprobó que `backend/.env` no estaba rastreado por Git y que `.gitignore` lo excluía.

### Instalación y autenticación de Neon

Se ejecutó:

```text
npm i -g neon@latest
neon login
```

La CLI quedó instalada en la versión `6.1.0` y el login terminó correctamente mediante el navegador.

### Enlace con Neon

Se enlazó el repositorio con:

```text
neon link --project-id calm-paper-56576544 --branch production -y
neon config init
```

Resultado:

- Proyecto Neon: `calm-paper-56576544`.
- Rama: `production`.
- Servicio seleccionado: PostgreSQL.
- Se generaron localmente `.neon` y `.env.local`.
- `.env.local` contiene variables de conexión como `DATABASE_URL`, `DATABASE_URL_UNPOOLED` y `NEON_BRANCH`.

Estos archivos no deben subirse a Git.

### Configuración de Neon

`neon config init` creó inicialmente una configuración con comentarios y políticas de ramas. Se simplificó `neon.ts` al contenido base solicitado:

```ts
import { defineConfig } from "@neon/config/v1";

export default defineConfig({});
```

Después se ejecutó:

```text
neon config plan
```

Resultado: no había cambios pendientes; la rama `production` ya coincidía con la política y solo se utilizaba PostgreSQL.

### Skills y MCP

Se ejecutaron:

```text
neon skills -y
neon mcp -y
```

Se instalaron las skills de Neon en el proyecto y se escribieron configuraciones MCP locales para VS Code y otras herramientas. También se creó una clave MCP de cuenta durante el proceso. Esa clave no se incluyó en este informe ni en el repositorio.

### Cambios locales generados

El estado de Git quedó con estos cambios o archivos nuevos:

```text
 M .gitignore
?? .agents/
?? neon.ts
?? package-lock.json
?? package.json
?? skills-lock.json
```

`.gitignore` fue actualizado para excluir, entre otros:

```text
.neon
.env.local
node_modules/
```

No se modificó la lógica de Django ni la lógica de React para realizar esta configuración.

## 5. Validaciones realizadas y bloqueos encontrados

### Dependencias Python

La primera prueba utilizó el intérprete global y falló porque no tenía instalado `django-environ`.

Después se utilizó el entorno virtual del proyecto (`venv`). Allí faltaba `dj-database-url`, aunque ya estaba declarado en `requirements.txt`.

Se ejecutó la instalación de requisitos y `dj-database-url` quedó instalado correctamente.

Durante la instalación aparecieron advertencias de `pip` sobre una distribución inválida de Django (`~jango`) dentro de `venv`. Conviene revisar o recrear ese entorno virtual si vuelve a producir errores de paquetes.

### Formato de `DATABASE_URL`

La primera lectura de `.env.local` conservó comillas externas y Django recibió una URL con un esquema inválido (`://`). Al quitar esas comillas solo en memoria, la URL pasó a reconocerse como `postgresql://`.

No se modificó ni se imprimió el secreto de conexión.

### Conectividad con Neon

Se intentó ejecutar:

```text
python manage.py check
python manage.py migrate --plan
```

usando la conexión de Neon. La URL fue reconocida correctamente, pero la comprobación de Django quedó esperando más de dos minutos al intentar conectar con la base de datos. Por ese motivo no se aplicaron migraciones a ciegas.

Posteriormente se repitió la comprobación usando `DATABASE_URL_UNPOOLED`, quitando únicamente en memoria las comillas externas generadas en `.env.local`. El resultado fue:

```text
System check identified no issues (0 silenced).
```

Esto confirma que Django carga correctamente la configuración y puede inicializarse con la conexión directa de Neon. Las migraciones todavía no se aplicaron durante este chat. Se pueden ejecutar mediante el `build.sh` del backend una vez configurada `DATABASE_URL` en Render.

En una ejecución posterior, `manage.py check` volvió a pasar, pero `migrate --plan` falló con un `OperationalError` al usar el host pooled de Neon: el servidor cerró la conexión inesperadamente. Esto no indica un error de modelos; indica un problema de conectividad o de disponibilidad temporal del endpoint pooled. Para migraciones se debe usar la URL directa/no pooled (`DATABASE_URL_UNPOOLED`), mientras que la aplicación web puede usar la URL pooled (`DATABASE_URL`) si Render requiere manejar muchas conexiones.

## 6. Pasos pendientes para desplegar

### Render

Crear un Web Service con:

```text
Root Directory: vacío
Build Command: bash build.sh
Start Command: cd backend && gunicorn backend.wsgi:application
```

Variables mínimas:

```text
DATABASE_URL=<URL de Neon>
DEBUG=False
ALLOWED_HOSTS=<dominio del backend en Render>
CORS_ALLOWED_ORIGINS=<URL del frontend en Vercel>
SECRET_KEY=<clave nueva de producción>
```

Para que `build.sh` ejecute migraciones correctamente, conviene configurar temporalmente `DATABASE_URL` con la URL directa/no pooled de Neon durante el primer despliegue, o ajustar el build para usar explícitamente `DATABASE_URL_UNPOOLED` en el comando de migración y dejar `DATABASE_URL` pooled para el tráfico normal de la aplicación.

Añadir también las credenciales de Braintree, OAuth y correo como variables privadas del servicio.

### Vercel

Crear el proyecto apuntando al directorio `frontend` y definir:

```text
REACT_APP_API_URL=https://<backend-en-render>.onrender.com
```

El archivo `frontend/vercel.json` ya tiene una regla de rewrite para que las rutas de React Router funcionen al recargar la página.

### OAuth y correo

Actualizar en Google y GitHub las URL de producción cuando exista el dominio final de Vercel.

El backend usa SMTP en el flujo actual. Render Free tiene limitaciones para SMTP tradicional, por lo que conviene migrar el envío de correos a una API HTTPS como Resend, Brevo o SendGrid antes de procesar pagos reales.

### Imágenes

El sistema actual usa `backend/media`. El almacenamiento local de un Web Service gratuito puede ser efímero. Para conservar imágenes y avatares de manera permanente se debe integrar almacenamiento externo, por ejemplo Cloudinary, Supabase Storage, Neon Object Storage o un servicio S3 compatible.

## 7. Conclusión

La parte de Neon quedó enlazada y validada a nivel de configuración. El proyecto está preparado para usar PostgreSQL externo mediante `DATABASE_URL`, y el backend ya incluye el comando de migraciones en `build.sh`.

El siguiente paso técnico es configurar Render con la URL de Neon, comprobar los logs del build y confirmar que `python backend/manage.py migrate` termina correctamente. Después se debe desplegar el frontend en Vercel y actualizar CORS, OAuth y correo con los dominios reales de producción.


## 8. Actualización de Despliegue (Fase Final)

Se han completado los siguientes hitos críticos para poner el sistema en producción real:

### 1. Migración de Correo (SMTP a Resend HTTP)
Render bloquea los puertos SMTP en su capa gratuita. Se sustituyó la configuración tradicional por `django-anymail[resend]`. Ahora el sistema de correos de Djoser envía emails transaccionales a través de la API HTTPS de Resend, usando el dominio autorizado `ventas@rodrigodvillar.com`.

### 2. Almacenamiento de Imágenes (Neon Object Storage S3)
Debido a que Render usa discos efímeros (borrando la carpeta `media/` en cada reinicio), se activó **Neon Object Storage** (S3 compatible) en la cuenta del proyecto.
- Se configuró `django-storages` y `boto3` en `settings.py`.
- Originalmente se usó `DEFAULT_FILE_STORAGE`, pero debido a que se descubrió que Django 5.2 lo eliminó, se refactorizó al diccionario `STORAGES`.
- Se migraron los archivos estáticos y fotos locales a la nube con un script en Python que leyó las credenciales de `.env.local`.

### 3. Migración de Datos (MySQL a Neon PostgreSQL)
El puerto 5432 estaba bloqueado por el ISP local o firewall del usuario, lo que impedía ejecutar `python manage.py loaddata` desde su terminal apuntando a Neon.
- Se resolvió realizando un `dumpdata` de la base local MySQL a `backend/data.json`.
- El archivo fue exportado originalmente en formato UTF-16 por PowerShell, causando un error `UnicodeDecodeError` en el build de Render, por lo que se convirtió y subió en **UTF-8**.
- El escáner de secretos de GitHub bloqueó el volcado por contener tokens OAuth de sesiones locales. El archivo se depuró filtrando los objetos de la tabla `social_django.usersocialauth`.
- Como Render Free no ofrece Web Shell, se insertó de manera temporal el comando `loaddata` en `build.sh` para que los datos fuesen inyectados directamente en la nube por el pipeline CI/CD.

### 4. Configuración Frontend y OAuth
- Se ajustó el `SOCIAL_AUTH_ALLOWED_REDIRECT_URIS` en Djoser para no usar dominios *hardcodeados* de localhost, usando `env('FRONTEND_URL')` para permitir redirecciones dinámicas al host de Vercel.
- (Pendiente del lado del usuario): Agregar las URLs autorizadas en GitHub Developer Apps y Google Cloud Console para que los flujos SSO (Single Sign-On) no lancen errores 400.

**Nota técnica de control de versiones:** Debido a la urgencia y para interactuar dinámicamente con el pipeline CI/CD de Render, los *commits* de configuración recientes se integraron directamente a la rama `main`, desviándose de un *Git Flow* ortodoxo. A partir de este momento, se recomienda crear ramas `feature/` o `hotfix/` para cualquier modificación y solicitar integración mediante Pull Requests hacia `main`.
