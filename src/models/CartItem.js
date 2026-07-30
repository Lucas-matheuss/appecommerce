import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from './User.js'
import Product from './Product.js'

const CartItem = sequelize.define('CartItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    }
})

User.hasMany(CartItem, { foreignKey: 'userId' })
CartItem.belongsTo(User, { foreignKey: 'userId' })

Product.hasMany(CartItem, { foreignKey: 'productId' })
CartItem.belongsTo(Product, { foreignKey: 'productId' })

export default CartItem