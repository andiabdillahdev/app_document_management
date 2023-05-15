"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../../config/dbConnect"));
class Documents extends sequelize_1.Model {
}
Documents.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    judul: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    deskripsi: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    nama_pengunggah: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    tanggal_unggah: {
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
    },
    file: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    path: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: dbConnect_1.default,
    underscored: false,
    timestamps: true,
});
exports.default = Documents;
