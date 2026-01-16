import mongoose from "mongoose";

export interface IAUTH extends mongoose.Document {
  email: string;
  password: string;
}

const AuthSchema = new mongoose.Schema<IAUTH>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAUTH>("AUTH", AuthSchema);
