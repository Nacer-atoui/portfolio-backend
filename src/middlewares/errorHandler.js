import AppError from "../errors/AppError.js";

const errorHandler = (err, req, res, next) => {

  if (err instanceof AppError) {
    return res.status (err.status).json({
      message: err.message,
    });
  }

  console.error(err.stack);
  res.status(500).json({ message: "Erreur serveur" });
};
export default errorHandler;
