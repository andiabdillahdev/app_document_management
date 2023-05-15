import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface UsersAttribute {
  id?: number;
  nama?: string | null;
  email?: string | null;
  password?: string | null;
  accessToken?: string | null;
  verified?: boolean | null;
  active?: boolean | null;
  role: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

enum RoleValue {
  admin = "admin",
  user = "user",
}

export interface UsersInput extends Optional<UsersAttribute, "id"> {}
export interface UsersOutput extends Required<UsersAttribute> {}

class Users
  extends Model<UsersAttribute, UsersInput>
  implements UsersAttribute
{
  public id!: number;
  public nama!: string | null;
  public email!: string | null;
  public password!: string | null;
  public accessToken!: string | null;
  public active!: boolean | null;
  public verified!: boolean | null;
  public role!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    nama: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    accessToken: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    active: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    verified: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    role: {
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

export default Users;
