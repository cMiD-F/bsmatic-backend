const Cupom = require("../models/cupomModel");
const validadeMongodbid = require("../utils/validadeMongodbid");
const asynHandler = require("express-async-handler");

const createCupom = asynHandler(async (req, res) => {
  try {
    const newCoupon = await Cupom.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCupons = asynHandler(async (req, res) => {
    try {
      const cupons = await Cupom.find();
      res.json(cupons);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateCupom = asynHandler(async (req, res) => {
    const {id} = req.params;
    validadeMongodbid(id);
    try {
      const cupons = await Cupom.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(cupons);
    } catch (error) {
      throw new Error(error);
    }
  });

  const deleteCupom = asynHandler(async (req, res) => {
    const {id} = req.params;
    validadeMongodbid(id);
    try {
      const cupons = await Cupom.findByIdAndDelete(id);
      res.json(cupons);
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports={createCupom, getAllCupons, updateCupom, deleteCupom};