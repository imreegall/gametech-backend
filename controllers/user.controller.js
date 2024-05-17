import pool from '../db.js'

class UserController {
    async create(req, res) {
        const {
            name,
            surname,
            email,
            password
        } = req.body

        const usersWithSameEmail = await pool.query('SELECT * FROM Users WHERE email = $1', [email])

        const emailIsBusy = !!usersWithSameEmail.rows.length

        if (emailIsBusy) {
            res.json({
                status: 400,
                message: 'Email already exists'
            })

            return
        }

        const newPerson = await pool.query('INSERT INTO Users (name, surname, email, password) values ($1, $2, $3, $4) RETURNING *', [name, surname, email, password])

        res.json(newPerson.rows[0])
    }

    async getAll(req, res) {
        const users = await pool.query('SELECT * FROM Users')

        res.json(users.rows)
    }

    async update(req, res) {
        const requestBody = req.body

        const userFields = [
            "name",
            "surname",
            "email",
            "password",
        ]

        const usedFields = userFields.filter(fieldName => fieldName in requestBody)

        const user = await pool.query(`UPDATE Users SET ${ usedFields.map((fieldName, index) => `${ fieldName } = $${ index + 2 }`) } WHERE id = $1 RETURNING *`, [requestBody.id, ...usedFields.map(fieldName => requestBody[fieldName])])

        res.json(user.rows[0])
    }

    async remove(req, res) {
        const id = req.params.id

        const deletedGood = await pool.query('DELETE FROM person WHERE id = $1 RETURNING *', [id])

        res.json(deletedGood.rows[0])
    }
}

export default new UserController()