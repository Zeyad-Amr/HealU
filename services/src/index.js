// imorts
const express = require("express");
const equipmentsRouter =require("./routes/equipmentsRouter");
const supplyRouter = require ("./routes/supplyRouter")

const app = express();
const port= process.env.port|| 3000 ;

app.use(express.json());

app.use("/api/equipments", equipmentsRouter); 
app.use("/api/inventory", supplyRouter);

app.listen(port,()=>{
    console.log('Server up and running on port' ,port);
});
