const mongoose = require("mongoose");

const FinancialRecord = require("../models/FinancialRecord");
const ApiError = require("../utils/ApiError");

function buildFilter(query) {
  const filter = {};

  if (query.type) {
    filter.type = query.type;
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) {
      filter.date.$gte = new Date(query.startDate);
    }
    if (query.endDate) {
      filter.date.$lte = new Date(query.endDate);
    }
  }

  return filter;
}

async function createRecord(payload, userId) {
  const record = await FinancialRecord.create({
    ...payload,
    createdBy: userId,
  });

  return record;
}

async function listRecords(query) {
  const page = Number(query.page) > 0 ? Number(query.page) : 1;
  const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
  const skip = (page - 1) * limit;

  const filter = buildFilter(query);

  const [records, total] = await Promise.all([
    FinancialRecord.find(filter)
      .populate("createdBy", "name email role")
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    FinancialRecord.countDocuments(filter),
  ]);

  return {
    data: records,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
}

async function getRecordById(recordId) {
  if (!mongoose.Types.ObjectId.isValid(recordId)) {
    throw new ApiError(400, "Invalid record id");
  }

  const record = await FinancialRecord.findById(recordId).populate(
    "createdBy",
    "name email role",
  );

  if (!record) {
    throw new ApiError(404, "Financial record not found");
  }

  return record;
}

async function updateRecord(recordId, payload) {
  if (!mongoose.Types.ObjectId.isValid(recordId)) {
    throw new ApiError(400, "Invalid record id");
  }

  const record = await FinancialRecord.findByIdAndUpdate(recordId, payload, {
    new: true,
    runValidators: true,
  }).populate("createdBy", "name email role");

  if (!record) {
    throw new ApiError(404, "Financial record not found");
  }

  return record;
}

async function deleteRecord(recordId) {
  if (!mongoose.Types.ObjectId.isValid(recordId)) {
    throw new ApiError(400, "Invalid record id");
  }

  const deleted = await FinancialRecord.findByIdAndDelete(recordId);
  if (!deleted) {
    throw new ApiError(404, "Financial record not found");
  }
}

module.exports = {
  createRecord,
  listRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
