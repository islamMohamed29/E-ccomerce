import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
    .connect(process.env.DBURI)
    .then((res) => {
      console.log(`Connected DB Success`);
    })
    .catch((err) => console.log(`Fail to ConnectDB ${err}`));
};
export default connectDB;
