import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

const InvoicePage = () => {
  const [invoices, setInvoices] = useState([]);
  const URL = "http://localhost:3000";

  const getInvoices = async () => {
    try {
      const res = await axios.get(`${URL}/invoices`); // Pastikan endpoint ini menyertakan relasi client dan user
      setInvoices(res.data);
    } catch (err) {
      console.error("Gagal fetch invoice", err);
    }
  };

  const deleteHandler = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${URL}/invoices/delete/${id}`);
          Swal.fire("Berhasil!", "Data telah dihapus.", "success");
          getInvoices(); // refresh data
        } catch (error) {
          Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
        }
      }
    });
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className="container mt-4">
         <div className="d-flex justify-content-between align-items-center mb-3">
           <h3 className="text-dark">Daftar Invoice</h3>
           <Link to="/invoices/create" className="btn btn-primary">
             + Tambah Invoice
           </Link>
         </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>No Invoice</th>
              <th>Nama Klien</th>
              <th>Alamat Klien</th>
              <th>Nama Pengguna</th>
              <th>Email Pengguna</th>
              <th>Total Harga</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.no_invoice}</td>
                  <td>{invoice.Client?.nama || "-"}</td>
                  <td>{invoice.Client?.alamat || "-"}</td>
                  <td>{invoice.User?.name || "-"}</td>
                  <td>{invoice.User?.email || "-"}</td>
                  <td>{invoice.total_harga}</td>
                  <td>
                    <span
                      className={`badge ${
                        invoice.status === "dibayar"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/invoices/detail/${invoice.id}`}
                      className="btn btn-sm btn-outline-primary d-flex align-items-center"
                    >
                    <FiEye className="me-1" /> Detail
                    </Link>
                    <Link
                      to={`/invoices/update/${invoice.id}`}
                      className="btn btn-sm btn-outline-warning d-flex align-items-center"
                    >
                     <FiEdit className="me-1" /> Edit
                    </Link>
                    <button
                      onClick={() => deleteHandler(invoice.id)}
                      className="btn btn-sm btn-outline-danger d-flex align-items-center"
                    >
                      <FiTrash2 className="me-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted py-3">
                  Tidak ada data invoice.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicePage;
