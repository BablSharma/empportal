const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // your Sequelize instance

const Leave = sequelize.define("Leave", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING, // or INTEGER depending on your user ID type
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [["Sick Leave", "Casual Leave", "Paid Leave"]],
        msg: "Invalid leave category. Allowed: Sick Leave, Casual Leave, Paid Leave",
      },
    },
  },
  total_days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  },
}, {
  tableName: "leaves",
  timestamps: true,
});

module.exports = Leave;
