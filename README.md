# React E-commerce Premium & Secure

Una aplicación E-commerce de alto rendimiento construida con React 19 y un Backend blindado bajo estándares de seguridad **AppSec/OWASP**.

## ✨ Características Destacadas

### 🎨 Diseño Premium (Bento Style)
- **Interfaz Sofisticada**: Estética minimalista con gradientes profundos y efectos de cristal (Glassmorphism).
- **Experiencia Fluida**: Animaciones de entrada escalonadas y transiciones de alto nivel.
- **Tipografía de Lujo**: Jerarquía visual optimizada con las fuentes `Outfit` e `Inter`.

### 🛡️ Seguridad Avanzada (AppSec)
- **Password Hardening**: Validación estricta en tiempo real (8+ caracteres, mayúsculas, números y símbolos).
- **Hasheo Irreversible**: Contraseñas cifradas en el servidor mediante **bcryptjs** (Salt 10).
- **Anti-Brute Force**: Implementación de **Rate Limiting** para bloquear intentos de acceso no autorizados.
- **Endpoints Blindados**: Flujo de autenticación seguro mediante POST `/login` y `/register` con prevención de enumeración de usuarios.

## 🚀 Tecnologías

- **Frontend**: React 19 + Vite + Zustand
- **Seguridad**: bcryptjs + express-rate-limit
- **Estilos**: TailwindCSS + Premium Custom CSS
- **Gestor de Paquetes**: pnpm v11.1.2 (Obligatorio)

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js (v18+)
- pnpm (v11+)

### Inicio Rápido
1. Instala las dependencias:
   ```bash
   pnpm install
   ```
2. Inicia todo el ecosistema (Frontend + Backend):
   ```bash
   pnpm fullstack
   ```

## 📁 Estructura del Proyecto

```
/
  ├── src/
  │   ├── components/ui/  # Incluye el nuevo PasswordField seguro
  │   ├── pages/          # Vistas con lógica de autenticación reforzada
  │   ├── store/          # Gestión de estado (Auth & Cart)
  │   └── App.css         # Core del diseño premium
  ├── server/
  │   └── db.json         # Base de datos con passwords hasheados
  ├── server.js           # Servidor seguro con middlewares de protección
  └── package.json        # Scripts y dependencias actualizadas
```

## 🔐 Acceso de Administrador (Seguro)

Para pruebas de administración, utiliza estas credenciales:
- **Email**: `admin@example.com`
- **Password**: `admin123`

---
*Este proyecto ha sido auditado y refactorizado para garantizar la integridad de los datos de los usuarios.*
