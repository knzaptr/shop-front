import mongoose from "mongoose";

const connectToDbIfNotConnected = () => {
  if (
    mongoose.connection.readyState !== 1 &&
    mongoose.connection.readyState !== 2 &&
    process.env.MONGODB_URI
  ) {
    return mongoose.connect(process.env.MONGODB_URI);
  }
};

export default connectToDbIfNotConnected;
