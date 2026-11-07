const config = require("./config/config");
const mongoose = require("mongoose");
const app = require("./app");

// app.use("/api/v1/", userRoutes);
// app.use("/api/v1/", productRoutes);

async function bootstrap() {
  try {
    mongoose.connect(config.database_url);
    console.log(`DB connected`);
    app.listen(config.port, () => {
      console.log(`BongoCart is listening to port: ${config.port}`);
    });
  } catch (err) {
    console.log(`Error occurred`, err);
  }
}

bootstrap().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello from BongoCart Server");
});
