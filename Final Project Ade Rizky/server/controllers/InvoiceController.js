const { Op } = require("sequelize");
const { Invoice, Client, User, Item } = require("../models");
const invoice = require("../models/invoice");

class InvoiceController {
    static async getPage(req, res) {
        try {
            let invoices = await Invoice.findAll({
                include: [Client, User, Item],
            });
            res.json(invoices);
        } catch (err) {
            res.json(err);
        }
    }
    static async create(req, res) {
        try {
            const { no_invoice, id_client, id_user, total_harga, status, nama_barang, jumlah, harga_satuan, total_harga_item } = req.body;

            let invoice = await Invoice.create({
                include: [Client, User, Item],
                no_invoice,
                id_client,
                id_user,
                total_harga,
                status,
            });

            for (let i = 0; i < nama_barang.length; i++) {
                await Item.create({
                    id_invoice: invoice.id,
                    nama_barang: nama_barang[i],
                    jumlah: jumlah[i],
                    harga_satuan: harga_satuan[i],
                    total_harga_item: total_harga_item[i]
                });
            }
            res.json(invoice);
        } catch (err) {
            console.error(err); // log error ke terminal
            res.status(500).json({
                error: err.message,
                stack: err.stack, // opsional, untuk debugging
            });
        }

    }

    static async details(req, res) {
        try {
            const id = +req.params.id;
            let result = await Invoice.findOne({
                where: { id },
                include: [Client, User, Item],
            });
            res.json(result);
        } catch (err) {
            res.json(err);
        }
    }

    static async delete(req, res) {
        try {
            const id = +req.params.id;
            await Item.destroy({ where: { id_invoice: id } });
            let result = await Invoice.destroy({
                where: { id },
            });
            result === 1
                ? res.json({ message: `Invoices id ${id} has been deleted` })
                : res.json({ message: "Not deleted" });
        } catch (err) {
            res.json(err);
        }
    }
    static async update(req, res) {
        try {
            const id = +req.params.id;
            const { no_invoice, id_client, id_user, total_harga, status, nama_barang, jumlah, harga_satuan, total_harga_item } = req.body;

            // 1. Update data invoice utama
            let result = await Invoice.update(
                {
                    no_invoice,
                    id_client,
                    id_user,
                    total_harga,
                    status,
                },
                {
                    where: { id },
                }
            );

            // 2. Hapus semua items lama terkait invoice ini
            await Item.destroy({ where: { id_invoice: id } });
            
            // 3. Masukkan ulang data items-nya
            for (let i = 0; i < nama_barang.length; i++) {
                await Item.create({
                    id_invoice: id,
                    nama_barang: nama_barang[i],
                    jumlah: jumlah[i],
                    harga_satuan: harga_satuan[i],
                    total_harga_item: total_harga_item[i]
                });
            }

            // 4. Ambil ulang data invoice beserta relasinya
            const updatedInvoice = await Invoice.findOne({
                where: { id: invoice.id },
                include: [Client, User, Item],
            });

            result[0] === 1
                ? res.json({ message: `Invoices id ${id} has been updated` })
                : res.json({ message: "Not updated" });

        } catch (err) {
            res.json(err);
        }
    }

    static async show(req, res) {
        try {
            const id = +req.params.id;

            const invoice = await Invoice.findOne({
                where: { id },
                include: [Client, User, Item], // Tanpa 'as'
            });

            if (!invoice) {
                return res.status(404).json({ message: "Invoice tidak ditemukan" });
            }

            res.json(invoice);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Terjadi kesalahan", error: err });
        }
    }
}
module.exports = InvoiceController;