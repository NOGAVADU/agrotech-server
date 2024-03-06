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

    async getItemsFavItems(req, res) {
        const {id} = req.query

        const favoriteItems = await FavoriteItem.findAll({where: {favoriteId: id}})

        const fetchFavItem = async (id) => {
            return await Item.findOne({where: {id: id}})
        }

        const getFavItems = Promise.all(favoriteItems.map(favItem => {
            return fetchFavItem(favItem.itemId);
        }));
        getFavItems.then(favItems => {
            res.json(favItems);
        })
    }
}

module.exports = new ItemController()