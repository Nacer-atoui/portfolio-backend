export function findByEmail(email) {
    const [rows] = db.query(
        "SELECT * FROM users WHERE email = ?" , [email]
    );
    return rows[0] || null;
}