import { describe, it, expect, vi } from "vitest";
import { authenticate } from "./auth.middleware.js";
import jwt from "jsonwebtoken";

// On définit le secret JWT directement
process.env.JWT_SECRET = "secret_test";

describe("authenticate", () => {
  const mockRes = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  it("lève une erreur si le header Authorization est absent", () => {
    // Arrange
    const req = { headers: {} };
    const res = mockRes();
    const next = vi.fn();

    // Act & Assert
    // Pour tester un throw, il faut encapsuler l'appel dans une fonction fléchée
    expect(() => authenticate(req, res, next)).toThrowError("Accès non autorisé");
    
    // On vérifie que next n'a pas été appelé
    expect(next).not.toHaveBeenCalled();
  });

  it("lève une erreur 403 si le token est invalide", () => {
    // Arrange
    const req = { headers: { authorization: "Bearer token_invalide" } };
    const res = mockRes();
    const next = vi.fn();

    // Act & Assert
    expect(() => authenticate(req, res, next)).toThrowError("Token invalide ou expiré");
    expect(next).not.toHaveBeenCalled();
  });

  it("appelle next() et renseigne req.user si le token est valide", () => {
    // Arrange
    const payload = { userId: 1, role: "user" };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = mockRes();
    const next = vi.fn();

    // Act
    authenticate(req, res, next);

    // Assert
    expect(next).toHaveBeenCalled();
    expect(req.user).toMatchObject(payload);
  });
});