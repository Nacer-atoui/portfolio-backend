import db from "../config/db.js";

// --- FONCTION UTILITAIRE ---
// Va chercher les images et les stacks liés à un projet pour compléter l'objet
const attachRelations = async (project) => {
  // 1. On récupère les images
  const [images] = await db.query(
    "SELECT image_url FROM images WHERE projects_id = ?",
    [project.id]
  );

  // 2. On récupère les technos via la table de liaison 'contain'
  const [stacks] = await db.query(
    `SELECT s.id, s.name, s.type, s.logo_url 
     FROM stacks s 
     JOIN contain c ON s.id = c.stacks_id 
     WHERE c.projects_id = ?`,
    [project.id]
  );

  // On retourne le projet avec ses nouveaux tableaux
  return { ...project, images, stacks };
};

// --- LECTURE ---

export const findAll = async () => {
  const [projects] = await db.query(
    "SELECT * FROM projects ORDER BY created_at DESC"
  );
  
  // On attache les images et stacks pour chaque projet de la liste
  const projectsWithRelations = await Promise.all(
    projects.map((project) => attachRelations(project))
  );

  return projectsWithRelations;
};

export const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM projects WHERE id = ?", [id]);
  
  if (rows.length === 0) return null;

  // On attache les relations au projet trouvé
  return attachRelations(rows[0]);
};

// --- CREATION ---

export const create = async ({
  title,
  description,
  github_url,
  demo_url,
  users_id,
  images = [],
  stacks = []
}) => {
  // On demande une connexion spécifique pour utiliser une transaction
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Création du projet
    const [projectResult] = await connection.execute(
      "INSERT INTO projects (title, description, github_url, demo_url, users_id) VALUES (?, ?, ?, ?, ?)",
      [title, description, github_url, demo_url, users_id]
    );
    const projectId = projectResult.insertId;

    // 2. Insertion des images
    for (const img of images) {
      if (img.image_url) {
        await connection.execute(
          "INSERT INTO images (image_url, projects_id) VALUES (?, ?)",
          [img.image_url, projectId]
        );
      }
    }

    // 3. Insertion des stacks et création des liaisons
    for (const stack of stacks) {
      if (stack.name && stack.type) {
        // On crée la techno
        const [stackResult] = await connection.execute(
          "INSERT INTO stacks (name, type, logo_url) VALUES (?, ?, ?)",
          [stack.name, stack.type, stack.logo_url || null]
        );
        
        // On relie la techno au projet dans 'contain'
        await connection.execute(
          "INSERT INTO contain (projects_id, stacks_id) VALUES (?, ?)",
          [projectId, stackResult.insertId]
        );
      }
    }

    // Si on arrive ici, tout s'est bien passé, on valide les modifications !
    await connection.commit();
    return projectId;

  } catch (error) {
    // En cas d'erreur, on annule toutes les requêtes de ce bloc
    await connection.rollback();
    throw error;
  } finally {
    // On libère la connexion pour qu'elle puisse être réutilisée
    connection.release();
  }
};

// --- MISE A JOUR ---

export const update = async (
  id,
  { title, description, github_url, demo_url, images = [], stacks = [] }
) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Mise à jour des infos de base
    await connection.execute(
      "UPDATE projects SET title=?, description=?, github_url=?, demo_url=? WHERE id=?",
      [title, description, github_url, demo_url, id]
    );

    // 2. Mise à jour des images : on supprime tout et on recrée
    await connection.execute("DELETE FROM images WHERE projects_id = ?", [id]);
    for (const img of images) {
      if (img.image_url) {
        await connection.execute(
          "INSERT INTO images (image_url, projects_id) VALUES (?, ?)",
          [img.image_url, id]
        );
      }
    }

    // 3. Mise à jour des stacks : on supprime les liaisons et on recrée
    await connection.execute("DELETE FROM contain WHERE projects_id = ?", [id]);
    for (const stack of stacks) {
      if (stack.name && stack.type) {
        const [stackResult] = await connection.execute(
          "INSERT INTO stacks (name, type, logo_url) VALUES (?, ?, ?)",
          [stack.name, stack.type, stack.logo_url || null]
        );
        
        await connection.execute(
          "INSERT INTO contain (projects_id, stacks_id) VALUES (?, ?)",
          [id, stackResult.insertId]
        );
      }
    }

    await connection.commit();
    return await findById(id);

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// --- SUPPRESSION ---

export const remove = async (id) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    // On supprime d'abord les images pour éviter les erreurs de clé étrangère
    await connection.execute("DELETE FROM images WHERE projects_id = ?", [id]);
    
    // Le 'ON DELETE CASCADE' sur 'contain' supprimera automatiquement les liaisons
    const [result] = await connection.execute("DELETE FROM projects WHERE id = ?", [id]);
    
    await connection.commit();
    return result.affectedRows > 0;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};