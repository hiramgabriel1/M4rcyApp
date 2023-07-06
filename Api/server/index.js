import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import sequelize from "../db/conex.js";
import register from "../routes/auth/register.auth.js";
import login from "../routes/auth/login.auth.js";
import posts from "../routes/users/posts.routes.js";
import upload_file from "../routes/files/upload.file.js";
import upload_asset from "../routes/files/upload.asset.js";
import index from "../routes/index.routes.js";
import filter_content from "../routes/search/filter.data.search.js";
import filter_country from "../routes/search/filter.country.search.js";
import comments from "../routes/users/users.comments.js";
import report_create from "../routes/admin/add.report.js";
import report_show from "../routes/admin/showReports.js";
import routerUser from "../routes/users/user.js";
import routerAvatar from "../routes/Avatars/getAvatars.js"
// authorization db
async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("autenticado!".rainbow);
  } catch (error) {
    throw new Error(error);
  }
};

// initialization
const app = express();

// env configuration
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/auth/user", register);
app.use("/auth/user", login);
app.use("/upload/files", upload_file);
app.use("/upload/asset", upload_asset);
app.use("/search", filter_content);
app.use("/search/country", filter_country);
app.use("/add/comment", comments);

// ? routes admin
app.use("/admin/report", report_create);
app.use("/admin/report", report_show);

// users
app.use("/user", posts);
app.use(routerAvatar)
app.use(routerUser)
// * index route
app.use("/inicio", index);

// PORT
const PORT = process.env.PORT || 3000;

// listen on port 3000
app.listen(PORT);
