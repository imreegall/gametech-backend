import pool from '../db.js'

class PostController {
    async createPost(req, res) {
        const { title, content, userId } = req.body

        const newPost = await pool.query('INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *', [title, content, userId])

        res.json(newPost.rows[0])
    }

    async getPostsByUser(req, res) {
        const id = req.query.id

        const posts = await pool.query('SELECT * FROM post WHERE user_id = $1', [id])

        res.json(posts.rows)
    }
}

export default new PostController()