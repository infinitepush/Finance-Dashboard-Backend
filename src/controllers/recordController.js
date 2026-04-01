const asyncHandler = require("../utils/asyncHandler");
const recordService = require("../services/recordService");

const createRecord = asyncHandler(async (req, res) => {
  const record = await recordService.createRecord(req.body, req.user.id);
  res.status(201).json(record);
});

const listRecords = asyncHandler(async (req, res) => {
  const result = await recordService.listRecords(req.query);
  res.status(200).json(result);
});

const getRecordById = asyncHandler(async (req, res) => {
  const record = await recordService.getRecordById(req.params.id);
  res.status(200).json(record);
});

const updateRecord = asyncHandler(async (req, res) => {
  const record = await recordService.updateRecord(req.params.id, req.body);
  res.status(200).json(record);
});

const deleteRecord = asyncHandler(async (req, res) => {
  await recordService.deleteRecord(req.params.id);
  res.status(204).send();
});

module.exports = {
  createRecord,
  listRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
