import { Request, Response, NextFunction } from "express";
import { CustomError } from "../middlewares/errorhandler";
import Lead from "../models/lead.model";

const getAllLeads = async (req: Request, res: Response, next: NextFunction) => {
  const {
    search,
    status,
    sort = "createdAt",
    order = "asc",
    page = 1,
    limit = 10,
  } = req.query;

  let query: any = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOrder = order === "desc" ? -1 : 1;

  const leads = await Lead.find(query)
    .sort({ [String(sort)]: sortOrder })
    .skip(skip)
    .limit(Number(limit));

  const total = await Lead.countDocuments(query);
  const totalPages = Math.ceil(total / Number(limit));

  res.json({
    status: true,
    message: "retrieve loads details successfully",
    data: leads,
    total,
    page: Number(page),
    totalPages,
  });
};
const getLeadById = async (req: Request, res: Response, next: NextFunction) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return next(new CustomError("Lead details not found", 404));
  res.json({
    status: true,
    message: "retrieve load details successfully",
    data: lead,
  });
};
const getLeadStats = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const totalLeads = await Lead.countDocuments();
  const converted = await Lead.countDocuments({ status: "Converted" });

  const byStatus = await Lead.collection
    .aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
    .toArray();

  const statusStats = byStatus.reduce((acc: any, item: any) => {
    acc[item._id] = item.count;
    return acc;
  }, {});

  res.json({
    status: true,
    message: "retrieve loads stats successfully",
    data: {
      totalLeads,
      converted,
      byStatus: statusStats,
    },
  });
};

export default { getAllLeads, getLeadById, getLeadStats };
