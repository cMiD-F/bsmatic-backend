const Produto = require("../models/produtoModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { Query } = require("mongoose");
const slugify = require("slugify");

// Cria um produto
const createProduto = asyncHandler(async (req, res) => {
  try {
    if (req.body.item) {
      req.body.slug = slugify(req.body.item);
    }
    const newProduto = await Produto.create(req.body);
    res.json(newProduto);
  } catch (error) {
    throw new Error(error);
  }
});

// Atualiza o produto
const updatedProduto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (req.body.item) {
      req.body.slug = slugify(req.body.item);
    }
    const updateProduto = await Produto.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProduto);
  } catch (error) {
    throw new Error(error);
  }
});

// Deleta um produto
const deletaProduto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduto = await Produto.findByIdAndDelete(id);
    res.json(deleteProduto);
  } catch (error) {
    throw new Error(error);
  }
});

//Obtem um produto
const getaProduto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduto = await Produto.findById(id);
    res.json(findProduto);
  } catch (error) {
    throw new Error(error);
  }
});

//Obtem todos os produtos.
const getAllProduto = asyncHandler(async (req, res) => {
  try {
    // Filtro
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Produto.find(JSON.parse(queryStr));

    // Ordenação
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limitando os campos
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Paginação
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const produtoCount = await Product.countDocuments();
      if (skip >= produtoCount) throw new Error("Esta página não existe");
    }
    console.log(page, limit, skip);

    const produto = await query;
    res.json(produto);
  } catch (error) {
    throw new Error(error);
  }
});

// Adiciona item a lista de desejos
const addListadeDesejos = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.ListadeDesejos.find(
      (id) => id.toString() === prodId
    );
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { ListadeDesejos: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { ListadeDesejos: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const classificacao = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comentario } = req.body;
  try {
    const produto = await Produto.findById(prodId);
    let alreadyRated = produto.classificacao.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateClassificacao = await Produto.updateOne(
        {
          classificacao: { $elemMatch: alreadyRated },
        },
        {
          $set: { "classificacao.$.star": star, "classificacao.$.comentario": comentario },
        },
        {
          new: true,
        }
      );
     
    } else {
      const rateProduto = await Produto.findByIdAndUpdate(
        prodId,
        {
          $push: {
            classificacao: {
              star: star,
              comentario: comentario,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
      
    }
    const getallclassificacao = await Produto.findById(prodId);
    let totalclassificacao = getallclassificacao.classificacao.length;
    let classificacaosum = getallclassificacao.classificacao
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let atualClassificacao = Math.round(classificacaosum / totalclassificacao);
    let finalproduto = await Produto.findByIdAndUpdate(
      prodId,
      {
        totalclassificacao: atualClassificacao,
      },
      { new: true }
    );
    res.json(finalproduto);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduto,
  getaProduto,
  getAllProduto,
  updatedProduto,
  deletaProduto,
  addListadeDesejos,
  classificacao,
};
