import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface DocumentsAttribute {
  id?: number;
  judul?: string | null;
  deskripsi?: string | null;
  nama_pengunggah?: string | null;
  file?: string | null;
  path?: string | null;
  tanggal_unggah?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DocumentsInput extends Optional<DocumentsAttribute, "id"> {}
export interface DocumentsOutput extends Required<DocumentsAttribute> {}

class Documents
  extends Model<DocumentsAttribute, DocumentsInput>
  implements DocumentsAttribute
{
  public id!: number;
  public judul!: string;
  public deskripsi!: string;
  public nama_pengunggah!: string;
  public file!: string;
  public path!: string;
  public tanggal_unggah!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Documents.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    judul: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    deskripsi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    nama_pengunggah: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    tanggal_unggah: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    file: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    path: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    underscored: false,
    timestamps: true,
  }
);

export default Documents;
