const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use("/api/user", authRouter);

app.use(notFound);
app.request(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor está rodando na PORT ${PORT}`);
});