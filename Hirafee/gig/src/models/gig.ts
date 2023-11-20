import mongoose from "mongoose";

interface GigAttrs {
  title: string;
  description: string;
  budget: number;
  location: string;
  clientId: string;
  category: string;
  proposals: string[];
  takenBy: string;
  requirements: string;
  banned: boolean;
}

interface GigModel extends mongoose.Model<GigDoc> {
  build(attrs: GigAttrs): GigDoc;
}

interface GigDoc extends mongoose.Document {
  title: string;
  description: string;
  budget: number;
  location: string;
  clientId: string;
  category: string;
  proposals: string[];
  takenBy: string;
  requirements: string;
  banned: boolean;
}

const gigSchema = new mongoose.Schema(
  {
    takenBy: {
      type: String,
      default: null,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    proposals: {
      type: [String],
      required: false,
    },
    banned: {
      type: Boolean,
      required: false,
      default: false,
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

gigSchema.statics.build = (attrs: GigAttrs) => {
  return new Gig(attrs);
};

const Gig = mongoose.model<GigDoc, GigModel>("Gig", gigSchema);

export { Gig };
