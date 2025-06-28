const { Invoice } = require("../models");

class DashboardController {
  static async getPage(req, res) {
    try {
      // Hitung jumlah invoice berdasarkan status
      const terbayar = await Invoice.count({
        where: { status: 'dibayar' },
      });

      const belumTerbayar = await Invoice.count({
        where: { status: 'belum dibayar' },
      });

      res.status(200).json({
        title: 'Dashboard',
        terbayar,
        belumTerbayar,
      });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  }
}

module.exports = DashboardController;
