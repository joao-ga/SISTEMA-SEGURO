const {Insurance: InsuranceModel} = require("../models/Insurance");

const insuranceController = {
    create: async(req, res) => {
        try{
            const insurance = {
                name: req.body.name,
                price: req.body.price,
                company: req.body.company
            };
            const response = await InsuranceModel.create(insurance);
            res
            .status(201)
            .json({response, msg:"Tipo de seguro criado com sucesso!"});
        }catch(err) {
            console.log(err);
        }
    },
    getAll: async(req, res) => {
        try {
            const insurances = await InsuranceModel.find();
            res
            .status(200)
            .json(insurances);
        } catch(err) {
            console.log(err);
        }
    },
    get: async(req, res) => {
        try {
            const id = req.params.id;
            const insurance = await InsuranceModel.findById(id);
            if(!insurance) {
                res
                .status(404)
                .json({msg:"Seguro não encontrado."});
                return
            }
            res.json(insurance)
        } catch(err) {
            console.log(err);
        }
    },
    delete: async(req, res) => {
        try {
            const id = req.params.id;
            const deletedInsurance = await InsuranceModel.findByIdAndDelete(id);
            if(!deletedInsurance) {
                res
                .status(404)
                .json({msg:"Seguro não encontrado."});
                return
            }
            res
            .status(200)
            .json({deletedInsurance, msg: "Seguro excluído com sucesso"});
        } catch(err) {
            console.log(err)
        }
    },
    update: async(req, res) => {
        try { 
            const id = req.params.id;
            const insurance = {
                name: req.body.name,
                price: req.body.price,
                company: req.body.company
            };
            const updatedInsurance = await InsuranceModel.findByIdAndUpdate(id, insurance);
            if(!updatedInsurance) {
                res
                .status(404)
                .json({msg:"Seguro não encontrado."});
                return
            }
            res
            .status(200)
            .json({insurance, msg: "Seguro editado com sucesso!"})
        } catch(err){
            console.log(err);
        }
    }
};

module.exports = insuranceController;