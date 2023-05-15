"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../../config/dbConnect"));
var RoleValue;
(function (RoleValue) {
    RoleValue["admin"] = "admin";
    RoleValue["user"] = "user";
})(RoleValue || (RoleValue = {}));
class Users extends sequelize_1.Model {
}
Users.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    nama: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    accessToken: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    active: {
        allowNull: true,
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    verified: {
        allowNull: true,
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    role: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: dbConnect_1.default,
    underscored: false,
    timestamps: true,
});
exports.default = Users;
