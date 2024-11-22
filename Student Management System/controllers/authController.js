import jwt from 'jsonwebtoken'

const ADMIN_CREDENTIALS = {
    email: "admin@example.com",
    password: "password123"
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: "admin", role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
};
