const express = require("express");
const path = require("path");
const app = express();
//const socketIO = require("socket.io");

const cors = require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
require("dotenv").config();

// middleware
app.use(express.json());

// routes
const users = require("./routes/userRoute");
const formulario = require("./routes/formularioRoute");
users(app);
formulario(app);

app.use(require("./routes/bitacora"));

// START
app.listen(process.env.NODE_PORT, () => {
  console.log(
    `CORS-Enabled: Listening to port ${process.env.NODE_PORT} - Express JS`
  );
});

// sockets
/*const io = socketIO.listen(server);
io.on("connection", () => {
  console.log("new conn!!");
});*/
