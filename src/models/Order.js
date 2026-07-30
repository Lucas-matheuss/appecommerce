import { DataTypes } from "sequelize";
import sequelize from '../config/database.js'
import User from './User.js'
import CartItem from './CartItem.js'

const Order = sequelize.define('Order', {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', // pedding, paid, shipped, delivered
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    }
})

User.hasMany(Order, {foreignKey: 'userId' })
Order.belongsTo(User, { foreignKey: 'userId' })

Order.hasMany(CartItem, { foreignKey: 'orderId' })
CartItem.belongsTo(Order, { foreignKey: 'orderId'})

export default Order