const {Item, Favorite, FavoriteItem} = require('../models/models')
const {Op, where} = require("sequelize");
const XLSX = require('xlsx')
const fs = require("fs");
const model = require('../models/models')
const sequelize = require('sequelize')

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

    async createMany(req, res) {
        try {
            if (!req.files) {
                return res.status(400).send("No excel were uploaded")
            }

            const file = req.files.file;

            await file.mv(`./${file.name}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }

                const workbook = XLSX.readFile(file.name);
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                const data = XLSX.utils.sheet_to_json(worksheet, {header: 1});

                fs.rmSync(`./${file.name}`, {
                    force: true
                })

                data.map(async function (item) {
                    let [name, article, price, state, source] = item;
                    price = parseFloat(price)
                    name = name.toLowerCase()
                    await Item.create({name, article,state, price, source});
                })
                return res.json(data)
            });

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

    async deleteAll(req, res) {
        try {
            await Item.destroy({where: {}});
            return res.json('All data was deleted')
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