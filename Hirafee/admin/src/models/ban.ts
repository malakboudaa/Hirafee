import mongoose from "mongoose";

interface BanAttrs {
  userId: string;
  reason: string;
  createdAt: Date;
}

interface BanModel extends mongoose.Model<BanDoc> {
  build(attrs: BanAttrs): BanDoc;
}

interface BanDoc extends mongoose.Document {
  userId: string;
  reason: string;
  createdAt: Date;
}

const banSchema = new mongoose.Schema(
  {
    // the id of the user that got banned
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    // the reason why he got banned
    reason: {
      type: String,
      required: true,
    },
    // the date he got banned
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

banSchema.statics.build = (attrs: BanAttrs) => {
  return new Ban(attrs);
};

const Ban = mongoose.model<BanDoc, BanModel>("Ban", banSchema);

export { Ban };
