const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb+srv://pyo:<password>@cluster0.nygwmem.mongodb.net/?retryWrites=true&w=majority")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
