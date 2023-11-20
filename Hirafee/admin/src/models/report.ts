import mongoose from "mongoose";

interface ReportAttrs {
  reportedItemId: string;
  type: "gig" | "profile";
  reason: string;
  state: "processed" | "unprocessed";
  createdAt: Date;
}

interface ReportModel extends mongoose.Model<ReportDoc> {
  build(attrs: ReportAttrs): ReportDoc;
}

interface ReportDoc extends mongoose.Document {
  reportedItemId: string;
  type: "gig" | "profile";
  reason: string;
  state: "processed" | "unprocessed";
  createdAt: Date;
}

const reportSchema = new mongoose.Schema(
  {
    // id the reported item
    reportedItemId: {
      type: String,
      required: true,
    },
    // type of the report
    type: {
      type: String,
      enum: ["gig", "profile"],
      required: true,
    },
    // reason for the report
    reason: {
      type: String,
      required: true,
    },
    // state of the report
    state: {
      type: String,
      enum: ["processed", "unprocessed"],
      required: true,
    },
    // date of the report
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

reportSchema.statics.build = (attrs: ReportAttrs) => {
  return new Report(attrs);
};

const Report = mongoose.model<ReportDoc, ReportModel>("Report", reportSchema);

export { Report };
