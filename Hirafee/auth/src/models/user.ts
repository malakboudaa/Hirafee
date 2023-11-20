import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  location: string;
  biography: string;
  categorie: string;
  portfolio: Array<PortfolioItem>;
  role: "artisan" | "client" | "admin";
  // belongsTo: string;
  // createdTheProfile: string;
  banned: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
interface PortfolioItem {
  image: string;
  description: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  location: string;
  biography: string;
  categorie: string;
  portfolio: Array<PortfolioItem>;
  role: ["artisan", "client", "admin"];
  // belongsTo: string;
  // createdTheProfile: string;
  banned: boolean;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // belongsTo: {
    //   type: String,
    //   required: true,
    // },
    role: {
      type: String,
      enum: ["artisan", "client", "admin"],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    categorie: {
      type: String,
      required: false,
    },
    portfolio: [
      {
        image: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    // createdTheProfile: {
    //   type: String,
    //   required: true,
    // },
    biography: {
      type: String,
      required: true,
    },
    banned: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id, delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
