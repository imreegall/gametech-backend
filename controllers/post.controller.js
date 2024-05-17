import pool from '../db.js'

class PostController {
    async create(req, res) {
        const requestBody = req.body

        const postFields = [
            "title",
            "description",
            "img"
        ]

        const usedFields = postFields.filter(fieldName => fieldName in requestBody)

        const newPost = await pool.query(`INSERT INTO posts (${ usedFields.join(', ') }) values (${ usedFields.map((value, index) => `$${ index + 1 }`).join(', ') }) RETURNING *`, usedFields.map(fieldName => requestBody[fieldName]))

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")

        res.json(newPost.rows[0])
    }

    async get(req, res) {
        const {
            category,
            id
        } = req.query

        if (id) {
            const post = await pool.query('SELECT * FROM posts WHERE id = $1', [id])

            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "X-Requested-With")

            res.json(post.rows[0])

            return
        }

        const allPosts = await pool.query('SELECT * FROM posts;')

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")

        res.json(allPosts.rows)
    }

    async remove(req, res) {
        const { id } = req.query

        const removedPost = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id])

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")

        res.json(removedPost.rows[0])
    }

    async update(req, res) {
        const { id } = req.query

        const requestBody = req.body

        const goodFields = [
            "title",
            "description"
        ]

        const usedFields = goodFields.filter(fieldName => fieldName in requestBody)

        const updatedPost = await pool.query(`UPDATE posts SET ${ usedFields.map((fieldName, index) => `${ fieldName } = $${ index + 2 }`).join(', ') } WHERE id = $1 RETURNING *`, [ id, ...usedFields.map(fieldName => requestBody[fieldName])])

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "PUT")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")

        res.json(updatedPost.rows[0])
    }
}

export default new PostController()