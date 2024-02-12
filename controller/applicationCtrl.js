const Application = require("../models/applicationModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createApplication = asyncHandler(async (req, res) => {
  try {
    const newApplication = await Application.create(req.body);
    res.json(newApplication);
  } catch (error) {
    throw new Error(error);
  }
});
const updateApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedApplication = await Application.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedApplication);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedApplication = await Application.findByIdAndDelete(id);
    res.json(deletedApplication);
  } catch (error) {
    throw new Error(error);
  }
});
const getApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaApplication = await Application.findById(id);
    res.json(getaApplication);
  } catch (error) {
    throw new Error(error);
  }
});
const getallApplication = asyncHandler(async (req, res) => {
  try {
    const getalllApplication = await Application.find();
    res.json(getalllApplication);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createApplication,
  updateApplication,
  deleteApplication,
  getApplication,
  getallApplication,
};
