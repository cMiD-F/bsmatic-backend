const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");

const uploadImagens = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "imagens");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      console.log(file);
      fs.unlinkSync(path);
    }
    const imagens = urls.map((file) => {
      return file;
    });
    res.json(imagens);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImagens = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletado = cloudinaryDeleteImg(id, "imagens");
    res.json({ message: "Deletado" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImagens,
  deleteImagens,
};
