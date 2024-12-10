const dotEnv = require("dotenv");
dotEnv.config();

const express = require("express")
const cors = require("cors")
const UserModal = require("./models/user.model");
const connectToDataBase = require("./modules/database/conect");
import middleware from "./middlewares/middleware"

const app = express();
connectToDataBase();

app.use(express.json());
app.use(cors());

app.get("/users", middleware,async (req, res) => {
    try{
        const user = await UserModal.find({});
        return res.status(200).json(user)
    }
    catch(error) {
        return res.status(400).send(error.mensage)
    }
})

app.get("/users/:id", async (req, res) => {
    try{
        const id  = req.params.id;
        const user = await UserModal.findById(id);
        return res.status(200).json(user)
    }
    catch(error) {
        return res.status(400).send(error.mensage)
    }
})

app.post("/users", async (req, res) => {
    try{
        const user = await UserModal.create(req.body);
        return res.status(200).json(user)
    }
    catch(error) {
        console.log("Deu ruim", error)
        return res.status(400).send(error.mensage)
    }
})

app.patch("/users/:id", async (req, res) => {
    try{
        const id  = req.params.id;
        const user = await UserModal.findByIdAndUpdate(id, req.body, { new: true });

        return res.status(200).json(user)
    }
    catch(error) {
        return res.status(400).send(error.mensage)
    }
})

app.delete("/users/:id", async (req, res) => {
    try{
        const id  = req.params.id;
        const user = await UserModal.findByIdAndDelete(id);

        return res.status(200).json(user)
    }
    catch(error) {
        return res.status(400).send(error.mensage)
    }
})

app.listen(3333, () => {
    console.log("Rodando na port: http://localhost:3333")
});
