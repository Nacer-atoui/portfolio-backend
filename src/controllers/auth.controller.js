import * as authService from "../services/auth.service.js";

export const login = async (req, res) => {
    const token = await authService.loginUser(req.body);
    res.json({ token });
}