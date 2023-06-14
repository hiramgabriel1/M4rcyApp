import multer from "multer";

export const upload_files = () => {
  // objeto de multer para configuar donde se guardará el archivo
  const storage = multer.diskStorage({
    // donde se almacenará el archivo
    destination: "../content-file-user",
    filename: (_req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

  let upload = multer({
    storage: storage,
    fileFilter: (_req, _file, cb) => {
      cb(null, true);
    },
  }).array("files", 100);

  return upload;
};