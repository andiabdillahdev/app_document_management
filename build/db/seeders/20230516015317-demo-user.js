"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert("Users", [
                {
                    nama: "Admin",
                    email: "admin@gmail.com",
                    password: yield bcrypt.hash("admin12345", 10),
                    verified: true,
                    active: true,
                    role: "admin",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nama: "Andi Abdillah",
                    email: "andiabdillah004@gmail.com",
                    password: yield bcrypt.hash("user12345", 10),
                    verified: true,
                    active: true,
                    role: "user",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ], {});
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("Users", null, {});
            /**
             * Add commands to revert seed here.
             *
             * Example:
             * await queryInterface.bulkDelete('People', null, {});
             */
        });
    },
};
