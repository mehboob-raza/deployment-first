import { pool } from "../db/pool.js";

export async function getUsers(req, res) {
    try {
        const result = await pool.query(`
            SELECT id, name, email, age, created_at, updated_at
            FROM users
            ORDER BY id DESC
        `);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users exist",
                data: [],
            });
        }

        res.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to get users",
        });
    }
}


export async function getUser(req, res) {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT id, name, email, age, created_at, updated_at
            FROM users
            WHERE id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to get user",
        });
    }
}

export async function createUser(req, res) {
    try {
        const { name, email, age } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required",
            });
        }

        const result = await pool.query(
            `
            INSERT INTO users (name, email, age)
            VALUES ($1, $2, $3)
            RETURNING id, name, email, age, created_at, updated_at
            `,
            [
                name.trim(),
                email.trim().toLowerCase(),
                age ?? null,
            ]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to create user",
        });
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required",
            });
        }

        const result = await pool.query(
            `
            UPDATE users
            SET
                name = $1,
                email = $2,
                age = $3,
                updated_at = NOW()
            WHERE id = $4
            RETURNING id, name, email, age, created_at, updated_at
            `,
            [
                name.trim(),
                email.trim().toLowerCase(),
                age ?? null,
                id,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update user",
        });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `
            DELETE FROM users
            WHERE id = $1
            RETURNING id
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete user",
        });
    }
}
