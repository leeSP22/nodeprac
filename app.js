const express = require('express');
const app = express();
const port = 3000;

const connect = require("./schemas");
connect();

app.use(express.json());

const postsRouter = require("./routes/posts");
app.use([postsRouter]);

const cartsRouter = require("./routes/comments");
app.use([cartsRouter]);


app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });