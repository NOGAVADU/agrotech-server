const sequelize = require('../db');
const {DataTypes, STRING} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
});

const Favorite = sequelize.define('favorite', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const FavoriteItem = sequelize.define('favorite_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    article: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    state: {type: DataTypes.STRING},
    price: {type: DataTypes.FLOAT},
    source: {type: DataTypes.STRING},
});

User.hasOne(Favorite);
Favorite.belongsTo(User);

Favorite.hasMany(FavoriteItem);
FavoriteItem.belongsTo(Favorite);

Item.hasOne(FavoriteItem);
FavoriteItem.belongsTo(Item);


module.exports = {
    User, Favorite, FavoriteItem, Item
};