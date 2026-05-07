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
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Exemple avec une route — à dupliquer pour chaque groupe de routes
app.use('/api/auth', authRoutes);
// TODO : brancher les autres routes ici
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// Gestionnaire d'erreurs — toujours EN DERNIER
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});