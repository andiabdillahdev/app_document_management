import { Request, Response, NextFunction } from "express";
import Documents from "../db/models/Documents";
import path from "path";
const fs = require("fs");

const View = async (req: Request, res: Response, next: NextFunction) => {
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };
  const data = await Documents.findAll();
  const user = req.session?.user;
  return res.render("pages/dokumen/index", { user, alert, data });
};

const Store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { judul, deskripsi, tanggal_unggah } = req.body;
    // return res.status(200).send({ body: req.body, file: req.file });

    const data = await Documents.create({
      judul,
      deskripsi,
      tanggal_unggah,
      nama_pengunggah: req.session.user?.nama,
      file: req.file?.filename,
      path: req.file?.path,
    });

    req.flash("alertMessage", "Dokumen berhasil di upload");
    req.flash("alertStatus", "success");
    return res.redirect("/dokumen");
  } catch (error: any) {
    req.flash("alertMessage", "Gagal menambah data dokumen");
    req.flash("alertStatus", "danger");
    return res.redirect("/dokumen");
  }
};

const DownloadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../public", filename);

  // Initiate the file download
  res.download(filePath, function (err) {
    if (err) {
      req.flash("alertMessage", "Gagal mengunduh dokumen");
      req.flash("alertStatus", "danger");
      return res.redirect("/dokumen");
    }
  });
};

const Delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await Documents.findByPk(id);

    if (!data) {
      req.flash("alertMessage", "data dokumen tidak ditemukan");
      req.flash("alertStatus", "danger");
      return res.redirect("/dokumen");
    }

    fs.unlink(data.path, (err: any) => {
      if (err) {
        req.flash("alertMessage", "data dokumen tidak ditemukan");
        req.flash("alertStatus", "danger");
        return res.redirect("/dokumen");
      }
    });

    await data.destroy();
    req.flash("alertMessage", "Data dokumen berhasil di hapus");
    req.flash("alertStatus", "success");
    return res.redirect("/dokumen");
  } catch (error: any) {
    req.flash("alertMessage", "Gagal menghapus data dokumen");
    req.flash("alertStatus", "danger");
    return res.redirect("/dokumen");
  }
};
export default { View, Store, DownloadFile, Delete };
