import mongoose from "mongoose";

interface ReviewAttrs {
  rating: number;
  comment: string;
  clientId: string; // The user who wrote the review
  artisanId: string; // The artisan being reviewed
  createdAt: Date;
}

interface ReviewModel extends mongoose.Model<ReviewDoc> {
  build(attrs: ReviewAttrs): ReviewDoc;
}

interface ReviewDoc extends mongoose.Document {
  rating: number;
  comment: string;
  clientId: string; // The user who wrote the review
  artisanId: string; // The artisan being reviewed
  createdAt: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    artisanId: {
      type: String,
      required: true,
    },
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

reviewSchema.statics.build = (attrs: ReviewAttrs) => {
  return new Review(attrs);
};

const Review = mongoose.model<ReviewDoc, ReviewModel>("Review", reviewSchema);

export { Review };
