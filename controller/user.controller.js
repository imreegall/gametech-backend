import pool from '../db.js'

class UserController {
    async createUser(req, res) {
        const { name, surname } = req.body

        const newPerson = await pool.query('INSERT INTO person (name, surname) values ($1, $2) RETURNING *', [name, surname])

        res.json(newPerson)
    }

    async getUsers(req, res) {

    }

    async getOneUser(req, res) {

    }

    async updateUser(req, res) {

    }

    async deleteUser(req, res) {

    }
}

export default new UserController()