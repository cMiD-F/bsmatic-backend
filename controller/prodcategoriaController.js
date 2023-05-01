const Categoria = require("../models/prodcategoriaModel");
const asyncHandler = require("express-async-handler");
const validadeMongodbid = require("../utils/validadeMongodbid");


//Cria uma categoria
const createCategoria = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Categoria.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});


// Atualiza categoria
const updateCategoria = asyncHandler(async (req, res) => {
  const {id} = req.params;
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

// Deleta categoria
const deleteCategoria = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validadeMongodbid(id);
    try {
      const deletedCategoria = await Categoria.findByIdAndDelete(id);
      res.json(deletedCategoria);
    } catch (error) {
      throw new Error(error);
    }
  });

  //Obtem uma categoria
  const getCategoria = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validadeMongodbid(id);
    try {
      const getaCategoria = await Categoria.findById(id);
      res.json(getaCategoria);
    } catch (error) {
      throw new Error(error);
    }
  });

    //Obtem todas as categorias
    const getallCategoria = asyncHandler(async (req, res) => {

        try {
          const gettdscategorias = await Categoria.find();
          res.json(gettdscategorias);
        } catch (error) {
          throw new Error(error);
        }
      });

module.exports = { createCategoria, updateCategoria, deleteCategoria, getCategoria, getallCategoria };
