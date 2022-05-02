const express = require("express");
const app = express();

const nodemailer = require("nodemailer");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use("/", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
