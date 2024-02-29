const {Item} = require('../models/models')
const ApiError = require('../errors/apiError')

class ItemController {
    async create (req, res) {
        const {article, name, state, price, source} = req.body;
        const item = await Item.create({article, name, state, price, source});
        return res.json(item)
    }

    async getAll (req, res) {
        let {page, limit} = req.query;
        page = page || 1;
        limit = limit || 3;
        let offset = page * limit - limit;

        let items = await Item.findAndCountAll({ limit, offset})
        return res.json(items)
    }
}

module.exports = new ItemController()