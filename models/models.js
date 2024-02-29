const sequelize = require('../db');
const {DataTypes, STRING} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
});

const Favorite = sequelize.define('favorite', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const UserItem = sequelize.define('user_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    article: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    state: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    source: {type: DataTypes.STRING},
});

User.hasOne(Favorite);
Favorite.belongsTo(User);

Favorite.hasMany(UserItem);
UserItem.belongsTo(Favorite);

Item.hasOne(UserItem);
UserItem.belongsTo(Item);


module.exports = {
    User, Favorite, UserItem, Item,
};