import pool from '../db.js'

class GoodController {
    async create(req, res) {
        const requestBody = req.body

        const goodFields = [
            "name",
            "description",
            "brand",
            "price",
            "img",
            "popular",
            "discount",
            "count",
            "category"
        ]

        const usedFields = goodFields.filter(fieldName => fieldName in requestBody)

        const newGood = await pool.query(`INSERT INTO goods (${ usedFields.join(', ') }) values (${ usedFields.map((value, index) => `$${ index + 1 }`).join(', ') }) RETURNING *`, usedFields.map(fieldName => requestBody[fieldName]))

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")

        res.json(newGood.rows[0])
    }

    async get(req, res) {
        const {
            category,
            id
        } = req.query

        if (id) {
            const good = await pool.query('SELECT * FROM goods WHERE id = $1', [id])

            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "X-Requested-With")

            res.json(good.rows[0])

            return
        }

        let allGoods

        if (category) {
            allGoods = await pool.query('SELECT * FROM goods WHERE category = $1', [category])
        } else {
            allGoods = await pool.query('SELECT * FROM goods')
        }

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")

        res.json(allGoods.rows)
    }

    async remove(req, res) {
        const { id } = req.query

        const removedGood = await pool.query('DELETE FROM goods WHERE id = $1 RETURNING *', [id])

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")

        res.json(removedGood.rows[0])
    }

    async update(req, res) {
        const { id } = req.query

        const requestBody = req.body

        const goodFields = [
            "name",
            "description",
            "brand",
            "price",
            "img",
            "popular",
            "discount",
            "count",
            "category"
        ]

        const usedFields = goodFields.filter(fieldName => fieldName in requestBody)

        const updatedGood = await pool.query(`UPDATE goods SET ${ usedFields.map((fieldName, index) => `${ fieldName } = $${ index + 2 }`).join(', ') } WHERE id = $1 RETURNING *`, [ id, ...usedFields.map(fieldName => requestBody[fieldName])])

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "PUT")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")

        res.json(updatedGood.rows[0])
    }
}

export default new GoodController()