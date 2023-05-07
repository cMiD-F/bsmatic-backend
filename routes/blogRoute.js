const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  curtidaBlog,
  ncurtidaBlog,
  uploadImagens,
} = require("../controller/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadFoto, blogImgResize } = require("../middlewares/uploadImagens");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadFoto.array("imagens", 2),
  blogImgResize,
  uploadImagens
);


router.put("/curtidas", authMiddleware, curtidaBlog);
router.put("/ncurtidas", authMiddleware, ncurtidaBlog);


router.put("/:id", authMiddleware, isAdmin, updateBlog);

router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
