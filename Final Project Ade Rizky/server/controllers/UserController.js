const { User } = require("../models");

class UserController {
    static async getPage(req, res) {
        try {
            let users = await User.findAll();
            res.json(users);
        } catch (err) {
            res.json({
                err,
            });
        }
    }
    static async create(req, res) {
        try {
            const { name, email, password } = req.body;
            let result = await User.create({
                name,
                email,
                password,
            });
            res.json(result);
        } catch (err) {
            res.json({
                err,
            });
        }
    }
    static async details(req, res) {
        try {
            const id = +req.params.id;
            let result = await User.findOne({
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
            let result = await User.destroy({
                where: { id },
            });
            result === 1
                ? res.json({ message: `Users id ${id} has been deleted` })
                : res.json({ message: "Not deleted" });
        } catch (err) {
            res.json(err);
        }
    }
    static async update(req, res) {
        try {
            const id = +req.params.id;
            const { name, email, password } = req.body;
            let result = await User.update(
                {
                    name,
                    email,
                    password,

                },
                {
                    where: { id },
                }
            );

            result[0] === 1
                ? res.json({ message: `Users id ${id} has been updated` })
                : res.json({ message: "Not updated" });

        } catch (err) {
            res.json(err);
        }
    }



}

module.exports = UserController;