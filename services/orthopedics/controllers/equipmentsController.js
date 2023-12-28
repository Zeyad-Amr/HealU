const { PrismaClient } = require('@prisma/client');
const equipmentsClient= new PrismaClient();

// get all Equipments in clinic
 const getAllEquipments = async(req,res)=>{
    try{
        const allEquipments= await equipmentsClient.equipments.findMany();
        
        res.status(200).json({allEquipments});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

//Get Equipment by ID
const getEquipmentById = async( req, res) => {
    try {
        const post = await equipmentsClient.equipments.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        
        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new equipments to the database
const addEquipments = async(req,res)=>{
    try{
        const equipmentData= req.body;

        const equipment = await equipmentsClient.equipments.create({
            data: equipmentData,
        });
       
        res.status(200).json({equipment});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

//Update Equipment
const updateEquipment = async (req, res) => {
    try {
        const equipmentData= req.body;
        const post = await equipmentsClient.equipments.update({
            where:{
                id: Number(req.params.id),
            },
            data: equipmentData,
        });
 
        res.status(200).json({ post }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete Equipment
const deleteEquipment = async (req, res) => {
    try {
        await equipmentsClient.equipments.delete({
            where: {
                id: Number (req.params.id)
            }
        });

        res.status(200).json({message: "Equipment Deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEquipments,
    addEquipments,
    getEquipmentById,
    updateEquipment,
    deleteEquipment
};