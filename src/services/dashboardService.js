const FinancialRecord = require("../models/FinancialRecord");

function buildDateMatch(startDate, endDate) {
  const dateMatch = {};

  if (startDate) {
    dateMatch.$gte = new Date(startDate);
  }

  if (endDate) {
    dateMatch.$lte = new Date(endDate);
  }

  return Object.keys(dateMatch).length > 0 ? { date: dateMatch } : {};
}

async function getSummary(startDate, endDate) {
  const matchStage = buildDateMatch(startDate, endDate);

  const totals = await FinancialRecord.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  const income = totals.find((item) => item._id === "income")?.total || 0;
  const expenses = totals.find((item) => item._id === "expense")?.total || 0;

  return {
    totalIncome: income,
    totalExpenses: expenses,
    netBalance: income - expenses,
  };
}

async function getCategoryTotals(startDate, endDate) {
  const matchStage = buildDateMatch(startDate, endDate);

  return FinancialRecord.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          category: "$category",
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id.category",
        type: "$_id.type",
        total: 1,
      },
    },
    { $sort: { category: 1, type: 1 } },
  ]);
}

async function getMonthlyTrends(startDate, endDate) {
  const matchStage = buildDateMatch(startDate, endDate);

  return FinancialRecord.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $group: {
        _id: {
          year: "$_id.year",
          month: "$_id.month",
        },
        totals: {
          $push: {
            type: "$_id.type",
            total: "$total",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        income: {
          $ifNull: [
            {
              $first: {
                $map: {
                  input: {
                    $filter: {
                      input: "$totals",
                      as: "t",
                      cond: { $eq: ["$$t.type", "income"] },
                    },
                  },
                  as: "incomeValue",
                  in: "$$incomeValue.total",
                },
              },
            },
            0,
          ],
        },
        expense: {
          $ifNull: [
            {
              $first: {
                $map: {
                  input: {
                    $filter: {
                      input: "$totals",
                      as: "t",
                      cond: { $eq: ["$$t.type", "expense"] },
                    },
                  },
                  as: "expenseValue",
                  in: "$$expenseValue.total",
                },
              },
            },
            0,
          ],
        },
      },
    },
    { $sort: { year: 1, month: 1 } },
  ]);
}

module.exports = {
  getSummary,
  getCategoryTotals,
  getMonthlyTrends,
};
