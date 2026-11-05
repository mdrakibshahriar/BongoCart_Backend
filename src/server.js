const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const routes = require("./app/routes");

const globalErrorHandler = require("./app/middlewares/globalErrorHandler");
const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1", routes);
// app.use("/api/v1/", userRoutes);
// app.use("/api/v1/", productRoutes);

app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.status(400).json({ message: "Hello" });
});
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => console.log(err));
app.listen(port, () => console.log(`App is listening to port: ${port}`));
