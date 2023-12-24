const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");

const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = 5000;

const authRouter = require("./routes/authRoute");
const produtoRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoriaRouter = require("./routes/prodcategoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const marcaRouter = require("./routes/marcaRoute");
const aplicacaoRouter = require("./routes/aplicacaoRoute");
const pergRouter = require("./routes/pergRoute");
const cupomRouter = require("./routes/cupomRoute");
const uploadRouter = require("./routes/uploadRoute");

dbConnect();

// Configuração do CORS
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Adição de Headers na Resposta
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Rotas
app.use("/api/user", authRouter);
app.use("/api/produtos", produtoRouter);
app.use("/api/blog", blogRouter);
app.use("/api/categoria", categoriaRouter);
app.use("/api/blogcategoria", blogcategoryRouter);
app.use("/api/marca", marcaRouter);
app.use("/api/cupom", cupomRouter);
app.use("/api/aplicacao", aplicacaoRouter);
app.use("/api/pergunta", pergRouter);
app.use("/api/upload", uploadRouter);

// Middleware de tratamento de erros
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na PORT ${PORT}`);
});

