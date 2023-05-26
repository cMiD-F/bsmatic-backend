//const Color = require("../models/colorModel");
const Aplicacao = require("../models/aplicacaoModel")
const asyncHandler = require("express-async-handler");
const validadeMongodbid = require("../utils/validadeMongodbid");

const createAplicacao = asyncHandler(async (req, res) => {
  try {
    const newAplicacao = await Aplicacao.create(req.body);
    res.json(newAplicacao);
  } catch (error) {
    throw new Error(error);
  }
});
const updateAplicacao = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validadeMongodbid(id);
  try {
    const updatedAplicacao = await Aplicacao.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedAplicacao);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteAplicacao = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validadeMongodbid(id);
  try {
    const deletedAplicacao = await Aplicacao.findByIdAndDelete(id);
    res.json(deletedAplicacao);
  } catch (error) {
    throw new Error(error);
  }
});
const getAplicacao = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validadeMongodbid(id);
  try {
    const getaAplicacao = await Aplicacao.findById(id);
    res.json(getaAplicacao);
  } catch (error) {
    throw new Error(error);
  }
});
const getallAplicacao = asyncHandler(async (req, res) => {
  try {
    const getallAplicacao = await Aplicacao.find();
    res.json(getallAplicacao);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createAplicacao,
  updateAplicacao,
  deleteAplicacao,
  getAplicacao,
  getallAplicacao,
};
