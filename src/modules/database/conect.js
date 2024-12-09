const mongoose = require("mongoose");

const connectToDataBase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASSWORD}@mongoosernodejs.sn8x3ai.mongodb.net/database?retryWrites=true&w=majority&appName=MongooserNodeJs`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Conexão com sucesso ao DB!");
    } catch (error) {
        console.log("Error: Não Connect", error); 
    }
};

module.exports = connectToDataBase;
