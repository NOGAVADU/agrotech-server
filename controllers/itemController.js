const {Item, Favorite, FavoriteItem} = require('../models/models')
const {Op} = require("sequelize");

class ItemController {
    async create(req, res) {
        try {
            let {name, article, state, price, source} = req.body;
            name = name.toLowerCase()
            const item = await Item.create({name, article, state, price, source});
            return res.json(item)
        } catch (e) {
            console.log(e)
        }
    }
    async deleteOne(req, res) {
        try {
            const {id} = req.body
            const item = Item.destroy({where: {id: id}})
            return res.json(item)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(req, res) {
        let {page, limit} = req.query;
        page = page || 1;
        limit = limit || 3;
        let offset = page * limit - limit;

        let items = await Item.findAndCountAll({limit, offset})
        return res.json(items)
    }

    async getOne(req, res) {
        const {id} = req.query
        const item = await Item.findOne({where: id})
        return res.json(item)
    }

    async findAll(req, res) {
        let {value, page, limit} = req.query;

        page = page || 1;
        limit = limit || 3;

        let offset = page * limit - limit;

        await Item.findAndCountAll(
            {
                where: {
                    name: {
                        [Op.like]: '%' + value.toLowerCase() + '%'
                    }
                }
                , limit, offset
            }).then(items => {
            return res.json(items)
        }).catch(e => {
            console.log(e)
        })
    }
}

module.exports = new ItemController()