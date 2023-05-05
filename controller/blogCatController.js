const Categoria = require("../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validadeMongodbid = require("../utils/validadeMongodbid");

const createCategoria = asyncHandler(async (req, res) => {
  try {
    const newCategoria = await Categoria.create(req.body);
    res.json(newCategoria);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCategoria = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validadeMongodbid(id);
  try {
    const updatedCategoria = await Categoria.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategoria);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCategoria = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validadeMongodbid(id);
  try {
    const deletedCategoria = await Categoria.findByIdAndDelete(id);
    res.json(deletedCategoria);
  } catch (error) {
    throw new Error(error);
  }
});
const getCategoria = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validadeMongodbid(id);
  try {
    const getaCategoria = await Categoria.findById(id);
    res.json(getaCategoria);
  } catch (error) {
    throw new Error(error);
  }
});
const getallCategoria = asyncHandler(async (req, res) => {
  try {
    const getallCategoria = await Categoria.find();
    res.json(getallCategoria);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCategoria,
  updateCategoria,
  deleteCategoria,
  getCategoria,
  getallCategoria,
};
