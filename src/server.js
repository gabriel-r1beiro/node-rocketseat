const express = require("express");
const { v4: uuidV4 } = require("uuid")

const app = express();
app.use(express.json());

const customers = [];

function veryfyExistsAccountCpf (req, res, next) {
    const { cpf } = req.headers;

    const customer = customers.find(customer => customer.cpf === cpf);

    if(!customer) {
        return res.status(400).json({ error: "Customer not found"  })
    };

    req.customer = customer;

    return next();    
}

app.post("/account", (req, res) => {
    const { name, cpf } = req.body;

    const customersAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );

    if(customersAlreadyExists) {
        return res.status(400).json({ error: "Customer already exists!" })
    } 

    customers.push({
        cpf,
        name,
        id: uuidV4(),
        statement: []
    });

    return res.status(201).json({ mensage: "Sucsses" })
});

app.get("/statement", veryfyExistsAccountCpf, (req, res) => {
    const { customer } = req;
    return res.json( customer.statement );
});

app.post("/deposit", veryfyExistsAccountCpf ,(req, res) => {
    const {description, amount} = req.body;

    const { customer } = req;
    

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);

    return res.status(201).json({ sucsses: "Sucesso ao inserir" })
})

app.listen(3333, () => console.log("http://localhost:3333"));