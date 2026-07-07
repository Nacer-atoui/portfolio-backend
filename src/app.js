import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// TODO : importer vos routes au fur et à mesure

import errorHandler from './middlewares/errorHandler.js';
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globaux
const corsOptions = {
  // Cette fonction permet de voir EXACTEMENT ce que le navigateur envoie
  origin: function (origin, callback) {
    console.log("=== DEBUG CORS - ORIGINE ENTRANTE ===");
    console.log("Origine :", origin);
    
    // On autorise temporairement TOUTES les requêtes pour débloquer le frontend
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

// 1. Appliquer les options
app.use(cors(corsOptions));

// 2. FORCER la réponse HTTP 200 pour toutes les requêtes OPTIONS (Preflight)
app.options('*', cors(corsOptions));

// Exemple avec une route — à dupliquer pour chaque groupe de routes
app.use('/api/auth', authRoutes);
// TODO : brancher les autres routes ici
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// Gestionnaire d'erreurs — toujours EN DERNIER
app.use(errorHandler);

export default app;