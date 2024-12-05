const express = require("express");

const app = express();
app.use(express.json())


app.get("/", (req, res) => {
    return res.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.listen(3333, () => console.log("http://localhost:3333"));