const { PrismaClient } = require('@prisma/client');
const equipmentsClient= new PrismaClient();

// Add new equipments to the database
const addEquipments = async(req,res)=>{
    try{
        const equipmentData= req.body;
        const equipment= await equipmentsClient.equipments.create({
            data:equipmentData,
     });
        res.status(200).json({message: "success"});
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

// get all Equipments in clinic
 const getAllEquipments = async(req,res)=>{
    try{
        const allEquipments= await equipmentsClient.equipments.findMany();
        res.status(200).json({allEquipments});
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllEquipments,
    addEquipments
  };