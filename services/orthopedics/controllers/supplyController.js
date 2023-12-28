const {PrismaClient} = require('@prisma/client');
const supplyClient = new PrismaClient().supply;

//Get all Supplies
const getAllSupplies = async (req, res) => {
    try {
        const allSupplies = await supplyClient.findMany();

        res.status(200).json({allSupplies});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get supply by ID
const getSupplyById = async (req, res) => {
    try {
        const allSupplies = await supplyClient.findUnique({
            where: {
                id: Number (req.params.id)
            }
        });

        res.status(200).json({allSupplies});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Add new supply to the database
const addSupply = async (req, res) => {
    try {
        const supplyData = req.body
        const post = await supplyClient.create({
            data: supplyData
        });

        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Update supply 
const updateSupply = async (req, res) => {
    try {
        const supplyData = req.body
        const post = await supplyClient.update({
            where:{
                id: Number (req.params.id),
            },
            data: supplyData
        });

        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete Supply
const deleteSupply = async (req, res) => {
    try {
        await supplyClient.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.status(200).json({ message: "Equipment Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSupplies,
    getSupplyById,
    addSupply,
    updateSupply,
    deleteSupply
}
