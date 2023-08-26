const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const user = require("./routes/user.routes");
const product = require("./routes/product.routes");
const userProduct = require("./routes/user.product.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerDodument = require("./swagger");

const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", user);
app.use("/api/products", product);
app.use("/api/userproducts", userProduct);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDodument.options));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
