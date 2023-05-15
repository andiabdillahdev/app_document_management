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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Documents_1 = __importDefault(require("../db/models/Documents"));
const path_1 = __importDefault(require("path"));
const fs = require("fs");
const View = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    const data = yield Documents_1.default.findAll();
    const user = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user;
    return res.render("pages/dokumen/index", { user, alert, data });
});
const Store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    try {
        const { judul, deskripsi, tanggal_unggah } = req.body;
        // return res.status(200).send({ body: req.body, file: req.file });
        const data = yield Documents_1.default.create({
            judul,
            deskripsi,
            tanggal_unggah,
            nama_pengunggah: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.nama,
            file: (_c = req.file) === null || _c === void 0 ? void 0 : _c.filename,
            path: (_d = req.file) === null || _d === void 0 ? void 0 : _d.path,
        });
        req.flash("alertMessage", "Dokumen berhasil di upload");
        req.flash("alertStatus", "success");
        return res.redirect("/dokumen");
    }
    catch (error) {
        req.flash("alertMessage", "Gagal menambah data dokumen");
        req.flash("alertStatus", "danger");
        return res.redirect("/dokumen");
    }
});
const DownloadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.params.filename;
    const filePath = path_1.default.join(__dirname, "../public", filename);
    // Initiate the file download
    res.download(filePath, function (err) {
        if (err) {
            req.flash("alertMessage", "Gagal mengunduh dokumen");
            req.flash("alertStatus", "danger");
            return res.redirect("/dokumen");
        }
    });
});
const Delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield Documents_1.default.findByPk(id);
        if (!data) {
            req.flash("alertMessage", "data dokumen tidak ditemukan");
            req.flash("alertStatus", "danger");
            return res.redirect("/dokumen");
        }
        fs.unlink(data.path, (err) => {
            if (err) {
                req.flash("alertMessage", "data dokumen tidak ditemukan");
                req.flash("alertStatus", "danger");
                return res.redirect("/dokumen");
            }
        });
        yield data.destroy();
        req.flash("alertMessage", "Data dokumen berhasil di hapus");
        req.flash("alertStatus", "success");
        return res.redirect("/dokumen");
    }
    catch (error) {
        req.flash("alertMessage", "Gagal menghapus data dokumen");
        req.flash("alertStatus", "danger");
        return res.redirect("/dokumen");
    }
});
exports.default = { View, Store, DownloadFile, Delete };
