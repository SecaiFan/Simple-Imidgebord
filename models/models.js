const sequelize = require('../DB.js');
const {DataTypes} = require('sequelize');

const Posts = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    author: {type: DataTypes.STRING, defaultValue: 'Аноним'},
    title: {type: DataTypes.STRING, required: true},
    text: {type: DataTypes.STRING, required: true},
    likes:{type: DataTypes.INTEGER, defaultValue: 0},
    picture:{type: DataTypes.STRING}
});

const Comments = sequelize.define('comments', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text:{type: DataTypes.STRING, required: true}
});

Posts.hasMany(Comments);
Comments.belongsTo(Posts);

module.exports = {
    Posts,
    Comments
}
