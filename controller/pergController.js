const Pergunta = require("../models/pergModel");
const asyncHandler = require("express-async-handler");
const validadeMongodbid = require("../utils/validadeMongodbid");

const createPergunta = asyncHandler(async (req, res) => {
  try {
    const newPergunta = await Pergunta.create(req.body);
    res.json(newPergunta);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePergunta = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validadeMongodbid(id);
  try {
    const updatedPergunta = await Pergunta.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPergunta);
  } catch (error) {
    throw new Error(error);
  }
});

const deletePergunta = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validadeMongodbid(id);
  try {
    const deletedPergunta = await Pergunta.findByIdAndDelete(id);
    res.json(deletedPergunta);
  } catch (error) {
    throw new Error(error);
  }
});

const getPergunta = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validadeMongodbid(id);
  try {
    const getaPergunta = await Pergunta.findById(id);
    res.json(getaPergunta);
  } catch (error) {
    throw new Error(error);
  }
});

const getallPergunta = asyncHandler(async (req, res) => {
  try {
    const getallPergunta = await Pergunta.find();
    res.json(getallPergunta);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createPergunta,
  updatePergunta,
  deletePergunta,
  getPergunta,
  getallPergunta,
};
