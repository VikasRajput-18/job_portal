import mongoose from "mongoose";

const connection = async () => {
  const mongo_url = process.env.MONGO_URL;
  try {
    await mongoose.connect(mongo_url);
    console.log(
      `Database Connected Successfully ${mongoose.connection.host}`.bgMagenta
    );
  } catch (error) {
    console.log(error);
  }
};

export default connection;
