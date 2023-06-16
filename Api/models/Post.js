import { Sequelize } from "sequelize";
import sequelize from "../db/conex.js";

const Post = sequelize.define(
  "post",
  {
    asset_post: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type_post: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description_post: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    date_post: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "posts",
    timestamps: false,
  }
);

try {
  await sequelize.sync();
  console.log("modelo de posts sincronizado correctamente!".zalgo);
} catch (error) {
  throw new Error(error);
}

export { Post };