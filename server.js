const express = require("express");
const cors = require("cors");

const chatRoutes = require("./chatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chatRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`EYANO server running on port ${PORT}`);
});