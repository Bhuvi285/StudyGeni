import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);
export default File;
