const { Client } = require("../models");

class ClientController {
    static async getPage(req, res) {
        try {
            let clients = await Client.findAll();
            res.json(clients);
        } catch (err) {
            res.json({
                err,
            });
        }
    }
    static async create(req, res) {
        try {
            const {nama, alamat, no_hp, email} = req.body;
            let result = await Client.create({
                nama,
                alamat,
                no_hp,
                email,
            });
        res.json(result);
        } catch (err) {
  console.error(err); // log error ke terminal
  res.status(500).json({
    error: err.message,
    stack: err.stack, // opsional, untuk debugging
  });
}

    }
    static async details(req, res) {
        try{
            const id = +req.params.id;
            let result = await Client.findOne({
                where: { id },
            });
        res.json(result);
        } catch (err) {
            res.json(err);
        }
    }
    static async delete(req, res) {
        try {
            const id = +req.params.id;
            let result = await Client.destroy({
                where: {id},
            });
            result === 1
            ? res.json({ message: `Client id ${id} has been deleted`})
            : res.json({ message: "Not deleted"});
        } catch (err) {
            res.json(err);
        }
    }
    static async update(req, res) {
        try {
            const id = +req.params.id;
            const { nama, alamat, no_hp, email } = req.body;
            let result = await Client.update(
                {
                    nama,
                    alamat,
                    no_hp,
                    email,

                },
                {
                    where: { id },
                }
            );
            
             result[0] === 1
            ? res.json({ message: `Client id ${id} has been updated`})
            : res.json({ message: "Not updated"});
        
        } catch (err) {
            res.json(err);
        }
    }
   


}

module.exports = ClientController;