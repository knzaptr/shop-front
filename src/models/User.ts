import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: String,
  token: String,
  salt: String,
  hash: String,
  admin: Boolean,
});

export default models.User || model("User", userSchema);
