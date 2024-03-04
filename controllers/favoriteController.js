const {Item, FavoriteItem, Favorite} = require('../models/models')
const ApiError = require('../errors/apiError')
const {Op} = require("sequelize");

class ItemController {
    async add(req, res) {
        const {itemId, userId} = req.body;
        const favoriteItem = await FavoriteItem.create({itemId, favoriteId: userId})
        res.json(favoriteItem)
    }

    async remove(req, res) {
        const {itemId, userId} = req.body;
        const favoriteItem = await FavoriteItem.destroy({where: {itemId, favoriteId: userId}})
        res.json(favoriteItem)
    }

    async getAll(req, res) {
        const {favoriteId} = req.query
        const favorite = await FavoriteItem.findAll({where: {favoriteId: favoriteId}})
        res.json(favorite)
    }

    async getFavoriteList(req, res) {
        const {id} = req.params;
        const favorites = await Favorite.findOne({where: {id: id}, include: FavoriteItem})
        res.json(favorites)
        // const {id} = req.params
        // const favorites = await Item.findAll({where: {favorite_item.favoriteId: parseInt(id)}})
        // res.json(favorites)
    }

}

module.exports = new ItemController()