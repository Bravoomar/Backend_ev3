# Guía para la Presentación del Backend

## 📋 Índice
1. [Desarrollo del Backend](#desarrollo-del-backend)
2. [CRUD Implementados](#crud-implementados)
3. [Integración Frontend-Backend](#integración-frontend-backend)
4. [Autenticación y JWT](#autenticación-y-jwt)
5. [Gestión de Sesiones](#gestión-de-sesiones)
6. [Protección de Rutas](#protección-de-rutas)

---

## 🚀 Desarrollo del Backend

### Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript
- **Express 5.1.0**: Framework web para Node.js
- **ES Modules**: Sistema de módulos moderno (`"type": "module"`)
- **Swagger**: Documentación automática de la API
  - `swagger-autogen`: Genera la documentación automáticamente
  - `swagger-ui-express`: Interfaz visual para la documentación
- **JWT (jsonwebtoken)**: Autenticación basada en tokens
- **CORS**: Permite peticiones desde el frontend (localhost:5173)
- **dotenv**: Manejo de variables de entorno

### Almacenamiento de Datos

**Estado Actual**: Los datos se almacenan en **memoria** (arrays en JavaScript)

- **Usuarios**: Array `usuariosData` en `gestionusuario.js` y `registro.js`
- **Productos**: Array `productosData` en `products.js` y `gestionproductos.js`

**Consideraciones**:
- ⚠️ **En producción**, se debe usar una base de datos (MongoDB, PostgreSQL, MySQL, etc.)
- Los datos se pierden al reiniciar el servidor
- Actualmente hay duplicación de datos entre archivos (debería compartirse una misma fuente)

### Despliegue

**Estado**: No desplegado aún

**Opciones de despliegue**:
- **Backend**: Render, Railway, Heroku, Vercel, AWS
- **Frontend**: Vercel, Netlify, GitHub Pages

### Consideraciones Especiales de Lógica de Negocio

1. **Validación de Administradores**: 
   - Los usuarios con correo `@duocuc.cl` se consideran administradores automáticamente
   - Se valida tanto en el correo como en el tipo almacenado

2. **Registro de Usuarios**:
   - Los usuarios registrados por el público reciben tipo "Cliente" por defecto
   - Validación de RUN y correo únicos
   - Validación de formato de email y longitud mínima de contraseña (6 caracteres)

3. **Productos**:
   - Validación de código único
   - Validación de precio y stock como números positivos
   - Código mínimo de 3 caracteres

---

## 🔄 CRUD Implementados

### 1. Gestión de Usuarios (`/gestionusuario`)

**Ruta protegida**: ✅ Requiere JWT y rol de administrador

| Método | Endpoint | Descripción | Estado |
|--------|----------|-------------|--------|
| GET | `/gestionusuario` | Listar todos los usuarios | ✅ |
| GET | `/gestionusuario/:run` | Obtener usuario por RUN | ✅ |
| POST | `/gestionusuario` | Crear nuevo usuario | ✅ |
| PUT | `/gestionusuario/:run` | Actualizar usuario | ✅ |
| DELETE | `/gestionusuario/:run` | Eliminar usuario | ✅ |

**Archivo**: `src/routes/gestionusuario.js`

**Dificultades encontradas**:
- Sincronización de datos entre `registro.js` y `gestionusuario.js` (ambos tienen arrays separados)
- Validación de campos requeridos
- Manejo de errores 404 y 400

### 2. Gestión de Productos (`/gestionproductos`)

**Ruta protegida**: ✅ Requiere JWT y rol de administrador

| Método | Endpoint | Descripción | Estado |
|--------|----------|-------------|--------|
| GET | `/gestionproductos` | Listar todos los productos | ✅ |
| GET | `/gestionproductos/:codigo` | Obtener producto por código | ✅ |
| POST | `/gestionproductos` | Crear nuevo producto | ✅ |
| PUT | `/gestionproductos/:codigo` | Actualizar producto | ✅ |
| DELETE | `/gestionproductos/:codigo` | Eliminar producto | ✅ |

**Archivo**: `src/routes/gestionproductos.js`

**Dificultades encontradas**:
- Validación de tipos de datos (precio y stock como números)
- Validación de código único
- Manejo de campos opcionales vs requeridos

### 3. Productos Públicos (`/products`)

**Ruta pública**: ✅ No requiere autenticación

| Método | Endpoint | Descripción | Estado |
|--------|----------|-------------|--------|
| GET | `/products` | Listar productos para el catálogo | ✅ |
| POST | `/products` | Agregar producto (público) | ✅ |

**Archivo**: `src/routes/products.js`

---

## 🔗 Integración Frontend-Backend

### Tecnología Utilizada

**Fetch API**: Se utiliza `fetch` nativo de JavaScript (no axios)

### Ejemplo de Implementación

```javascript
const BASE_URL = "http://localhost:3000/products";

export async function getProductos() {
    return fetch(BASE_URL)
        .then(res => res.json())
        .catch(e => console.error(e));
}
```

### Páginas que se Comunican con el Backend

1. **Página de Productos** (`/products`)
   - **Función**: `getProductos()`
   - **Endpoint**: `GET /products`
   - **Flujo**: Carga inicial de productos del catálogo

2. **Página de Inicio de Sesión** (`/iniciarsesion`)
   - **Función**: `iniciarSesion(email, password)`
   - **Endpoint**: `POST /iniciarsesion`
   - **Flujo**: 
     1. Usuario ingresa credenciales
     2. Frontend envía email y password
     3. Backend valida y retorna JWT
     4. Frontend guarda el token

3. **Página de Registro** (`/registro`)
   - **Función**: `registrarUsuario(datosUsuario)`
   - **Endpoint**: `POST /registro`
   - **Flujo**:
     1. Usuario completa formulario
     2. Frontend envía datos
     3. Backend valida y crea usuario
     4. Backend retorna JWT automáticamente

4. **Página de Gestión de Usuarios** (`/administrador/gestionusuarios`)
   - **Funciones**: 
     - `getUsuarios()`
     - `crearUsuario()`
     - `actualizarUsuario()`
     - `eliminarUsuario()`
   - **Endpoints**: `/gestionusuario`
   - **Flujo**: CRUD completo con autenticación

5. **Página de Gestión de Productos** (`/administrador/gestionproductos`)
   - **Funciones**:
     - `getProductosGestion()`
     - `crearProducto()`
     - `actualizarProducto()`
     - `eliminarProducto()`
   - **Endpoints**: `/gestionproductos`
   - **Flujo**: CRUD completo con autenticación

### Flujo de Comunicación

```
Frontend (React) 
    ↓ fetch()
Backend (Express) 
    ↓ Middleware (JWT)
Ruta Protegida
    ↓ Procesamiento
Respuesta JSON
    ↓ .then()
Frontend actualiza UI
```

---

## 🔐 Autenticación y JWT

### Servicio de Inicio de Sesión

**Endpoint**: `POST /iniciarsesion`

**Archivo**: `src/routes/iniciarsesion.js`

**Proceso**:
1. Usuario envía `email` y `password`
2. Backend busca usuario en `usuariosData`
3. Valida credenciales
4. Determina tipo de usuario (administrador si `@duocuc.cl`)
5. Genera JWT con payload:
   ```json
   {
     "run": "11-1",
     "correo": "usuario@duocuc.cl",
     "nombre": "Juan",
     "tipo": "administrador"
   }
   ```
6. Retorna token con expiración de 24 horas

**Código clave**:
```javascript
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
```

### Servicios Protegidos con JWT

#### 1. Rutas de Administrador (Protegidas con JWT + Rol)

- ✅ `/gestionusuario/*` - Todas las rutas
- ✅ `/gestionproductos/*` - Todas las rutas

**Middleware aplicado**:
```javascript
router.use(verificarToken);  // Verifica JWT válido
router.use(verificarAdmin); // Verifica rol de administrador
```

#### 2. Rutas Públicas (Sin JWT)

- ✅ `/products` - Catálogo público
- ✅ `/registro` - Registro de usuarios
- ✅ `/iniciarsesion` - Inicio de sesión

### Implementación del Middleware

**Archivo**: `src/middleware/auth.js`

**Funciones**:
1. `verificarToken(req, res, next)`
   - Extrae token del header `Authorization: Bearer <token>`
   - Verifica firma y expiración
   - Agrega `req.usuario` con datos decodificados

2. `verificarAdmin(req, res, next)`
   - Verifica que `req.usuario.tipo === "administrador"`
   - Retorna 403 si no es administrador

---

## 💾 Gestión de Sesiones

### Almacenamiento del JWT en el Frontend

**Recomendación**: Usar `localStorage` o `sessionStorage`

```javascript
// Después de iniciar sesión
const response = await iniciarSesion(email, password);
if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('usuario', JSON.stringify(response.usuario));
}
```

### Envío del Token en Peticiones

```javascript
export async function getUsuarios() {
    const token = localStorage.getItem('token');
    return fetch(BASE_URL_GESTIONUSUARIO, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(e => console.error(e));
}
```

### Gestión de Sesiones

**Flujo**:
1. Usuario inicia sesión → Recibe JWT
2. Frontend guarda token en `localStorage`
3. En cada petición protegida, envía token en header
4. Backend verifica token
5. Si token expira → Frontend redirige a login

**Cierre de sesión**:
```javascript
localStorage.removeItem('token');
localStorage.removeItem('usuario');
// Redirigir a login
```

---

## 🛡️ Protección de Rutas

### Rutas Protegidas en el Frontend

**Ejemplo con React Router**:

```javascript
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    
    if (!token) {
        return <Navigate to="/iniciarsesion" />;
    }
    
    // Verificar si es administrador para rutas de admin
    if (usuario?.tipo !== 'administrador') {
        return <Navigate to="/" />;
    }
    
    return children;
};
```

### Rutas de Administrador Protegidas

**Backend**: 
- `/gestionusuario/*` - Requiere JWT + rol administrador
- `/gestionproductos/*` - Requiere JWT + rol administrador

**Frontend**:
- `/administrador/*` - Debe verificar token y tipo de usuario

**Código de protección**:
```javascript
// En el componente de administrador
useEffect(() => {
    const token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    
    if (!token || usuario?.tipo !== 'administrador') {
        navigate('/iniciarsesion');
    }
}, []);
```

---

## 📝 Notas Adicionales

### Variables de Entorno

Crear archivo `.env`:
```
JWT_SECRET=tu_clave_secreta_super_segura
```

### Instalación de Dependencias

```bash
npm install jsonwebtoken dotenv
```

### Estructura de Archivos

```
Backend_ev3/
├── index.js                    # Servidor principal
├── swagger.js                  # Configuración Swagger
├── src/
│   ├── middleware/
│   │   └── auth.js            # Middleware JWT
│   └── routes/
│       ├── iniciarsesion.js   # Login con JWT
│       ├── registro.js        # Registro con JWT
│       ├── gestionusuario.js  # CRUD usuarios (protegido)
│       └── gestionproductos.js # CRUD productos (protegido)
└── package.json
```

---

## 🎯 Puntos Clave para la Presentación

1. ✅ **Backend desarrollado con Express y ES Modules**
2. ✅ **Datos en memoria (explicar que en producción sería BD)**
3. ✅ **CRUD completo en gestión de usuarios y productos**
4. ✅ **Integración con fetch API**
5. ✅ **JWT implementado en inicio de sesión y registro**
6. ✅ **Rutas protegidas con middleware de autenticación**
7. ✅ **Protección de rutas de administrador**
8. ✅ **Gestión de sesiones con localStorage**

---

**¡Éxito en tu presentación! 🚀**

