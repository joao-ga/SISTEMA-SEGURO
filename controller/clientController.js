const ClientModel = require("../models/Client");

function formatarDataBrasileira(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
          
    return `${dia}/${mes}/${ano}`;
  }

const clientController = {
    create: async(req, res)=> {
        try {
            const client = {
                name: req.body.name,
                email: req.body.email,
                cpf: req.body.cpf,
                phone: req.body.phone,
                address: req.body.address,
                plate: req.body.plate,
                insurances: req.body.insurances
            };
            const response = await ClientModel.create(client);
            res
            .status(201)
            .json({response, msg:"Cliente cadastrado com sucesso"});
        } catch(err) {
            console.log(err);
        }
    },
    getAll: async(req, res) =>{
        try {
            const response = await ClientModel.find();
            res
            .status(201)
            .json({response})
        } catch(err) {
            console.log(err)
        }
    },
    get: async(req, res) =>{
        try {
            const plate = req.params.plate;
            console.log(plate)
            const client = await ClientModel.findOne({plate: plate});
            if(!client) {
                res
                .status(404)
                .json({msg:"Cliente não encontrado."})
                return
            }
            res
            .json({client})
        } catch(err) {
            console.log(err)
        }
    },
    getNextMonth: async (req, res) => {
        try {
          const id = req.params.id;
          const clientId = await ClientModel.findById(id);
      
          if (!clientId) {
            res.status(404).json({ msg: "Cliente não encontrado." });
            return;
          }
      
          const insurances = clientId.insurances;
      
          if (!insurances || insurances.length === 0) {
            res.status(404).json({ msg: "Nenhum seguro encontrado para este cliente." });
            return;
          }
      
            const proximasDatas = insurances.map((insurance) => {
            const nameInsurance = insurance.name;
            const dataCriacao = new Date(insurance.createdAt);
            const nextMonth = new Date(dataCriacao);
      
            if (nextMonth.getMonth() === 0) {
              nextMonth.setMonth(nextMonth.getMonth() + 1);
              nextMonth.setMonth(nextMonth.getMonth() - 1);
              nextMonth.setDate(27);
            } else {
              nextMonth.setMonth(nextMonth.getMonth() + 1);
            }
            const formatedDate = formatarDataBrasileira(nextMonth);
      
            return { nameInsurance, formatedDate };
          });
      
          res.json({ proximasDatas });
        } catch (err) {
          console.error(err);
          res.status(500).json({ msg: "Erro interno do servidor." });
        }
      },     
    delete: async(req, res) => {
        try {
            const searchName = req.params.name;
            const deletedClient = await ClientModel.findOneAndDelete({name: searchName})
            if(!deletedClient) {
                res
                .status(404)
                .json({msg:"Cliente não encontrado."})
                return
            }
            res
            .status(200)
            .json({deletedClient, msg: "Cliente excluído com sucesso"});
        } catch(err) {
            console.log(err)
        }
    },
    update: async(req, res)=> {
        try{
            const searchName = req.params.name;
            const clientUpdated = {
                name: req.body.name,
                email: req.body.email,
                cpf: req.body.cpf,
                phone: req.body.phone,
                address: req.body.address,
                licence_plate: req.body.licence_plate,
                insurances: req.body.insurances
            };
            const updatedClient = await ClientModel.findByIdAndUpdate({name: searchName}, clientUpdated, {new: true});
            if(!updatedClient) {
                res
                .status(404)
                .json({msg: "Cliente não encontrado"})
            }
            res
            .status(201)
            .json({updatedClient, msg: "Cliente alterado com sucesso"})
        } catch(err){
            console.log(err)
        } 
    }
}

module.exports = clientController;