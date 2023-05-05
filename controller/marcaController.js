const Marca = require("../models/marcaModel");
const asyncHandler = require("express-async-handler");
const validadeMongodbid = require("../utils/validadeMongodbid");

const createMarca = asyncHandler(async (req, res) => {
  try {
    const newMarca = await Marca.create(req.body);
    res.json(newMarca);
  } catch (error) {
    throw new Error(error);
  }
});
const updateMarca = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validadeMongodbid(id);
  try {
    const updatedMarca = await Marca.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedMarca);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteMarca = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validadeMongodbid(id);
  try {
    const deletedMarca = await Marca.findByIdAndDelete(id);
    res.json(deletedMarca);
  } catch (error) {
    throw new Error(error);
  }
});
const getMarca = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validadeMongodbid(id);
  try {
    const getaMarca = await Marca.findById(id);
    res.json(getaMarca);
  } catch (error) {
    throw new Error(error);
  }
});
const getallMarca = asyncHandler(async (req, res) => {
  try {
    const getallMarca = await Marca.find();
    res.json(getallMarca);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createMarca,
  updateMarca,
  deleteMarca,
  getMarca,
  getallMarca,
};
