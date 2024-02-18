const app = require("./app");
const mongoose = require("mongoose");

const MONGODB_URI = 'mongodb+srv://user123:09876543210@cluster0.ppqewz9.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });
