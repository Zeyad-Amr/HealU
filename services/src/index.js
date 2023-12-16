// imorts
const express = require("express");
const equipmentsRouter =require("./routes/equipmentsRouter");

const app = express();
const port= process.env.port|| 3000 ;
app.use(express.json());
app.use("/api/equipments",equipmentsRouter); 
app.listen(port,()=>{
    console.log('Server up and running on port' ,port);
});
