import jsonServer from 'json-server';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import express from 'express';

const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

// Configuración de Seguridad: Rate Limiting (Protección contra Fuerza Bruta)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Límite de 5 intentos fallidos
    message: { error: 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo en 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
});

server.use(middlewares);
server.use(express.json());

// --- ENDPOINT DE REGISTRO (CON VALIDACIÓN ESPEJO Y HASHEO) ---
server.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const db = router.db;

    // 1. Validación Espejo (Security Mirroring)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'La contraseña no cumple los requisitos de seguridad del servidor.' });
    }

    // 2. Verificar duplicados (Prevenir enumeración)
    const userExists = db.get('users').find({ email }).value();
    if (userExists) {
        return res.status(400).json({ error: 'El usuario ya existe.' });
    }

    // 3. Hasheo Seguro (bcrypt con Salt 10)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword, // Guardamos el HASH, nunca la clave plana
        role: 'user',
        createdAt: new Date().toISOString()
    };

    db.get('users').push(newUser).write();
    
    // Eliminamos datos sensibles antes de responder
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
});

// --- ENDPOINT DE LOGIN SEGURO (PROTEGIDO CONTRA FUERZA BRUTA) ---
server.post('/login', loginLimiter, async (req, res) => {
    const { email, password } = req.body;
    const db = router.db;
    const user = db.get('users').find({ email }).value();

    if (!user) {
        // Respuesta genérica para evitar enumeración de usuarios
        return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Comparación segura del Hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Login exitoso: Devolvemos perfil sin contraseña
    const { password: _, ...userProfile } = user;
    res.json({
        user: userProfile,
        token: 'mock-jwt-' + Math.random().toString(36).substring(7)
    });
});

server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Security-Hardened JSON Server running on port ${port}`);
});
