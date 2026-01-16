import mongoose from "mongoose";

export interface ILead extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  source: string;
}

const leadSchema = new mongoose.Schema<ILead>(
  {
    name: String,
    email: String,
    phone: String,
    company: String,
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Converted", "Lost"],
      default: "New",
    },
    source: {
      type: String,
      enum: ["Website", "Referral", "Ads", "Cold Call"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILead>("Lead", leadSchema);
