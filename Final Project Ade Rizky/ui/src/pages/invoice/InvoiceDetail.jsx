import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BsArrowLeftSquare } from "react-icons/bs";


const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const URL = "http://localhost:3000";

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`${URL}/invoices/detail/${id}`);
        setInvoice(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!invoice) return <p className="text-center text-danger">Invoice tidak ditemukan.</p>;

  return (
    <div className="container mt-4">
      <h3>Detail Invoice</h3>
      <Link to="/invoices" className="btn btn-primary mb-3">
        <BsArrowLeftSquare className="me-1" />Kembali ke Daftar Invoice
      </Link>

      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>No Invoice</th>
            <td>{invoice.no_invoice}</td>
          </tr>
          <tr>
            <th>Nama Klien</th>
            <td>{invoice.Client?.nama || "-"}</td>
          </tr>
          <tr>
            <th>Alamat Klien</th>
            <td>{invoice.Client?.alamat || "-"}</td>
          </tr>
          <tr>
            <th>Nama Pengguna</th>
            <td>{invoice.User?.name || "-"}</td>
          </tr>
          <tr>
            <th>Email Pengguna</th>
            <td>{invoice.User?.email || "-"}</td>
          </tr>
          <tr>
            <th>Detail Item</th>
            <td>
              {invoice.Items && invoice.Items.length > 0 ? (
                invoice.Items.map((item, i) => (
                  <div key={i}>
                    {item.nama_barang} | {item.jumlah} x {item.harga_satuan} = {item.total_harga_item}

                  </div>
                ))
              ) : (
                <span>-</span>
              )}
            </td>
          </tr>
          <tr>
            <th>Total Harga</th>
            <td>{invoice.total_harga}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>
              <span
                className={`badge ${invoice.status === "dibayar" ? "bg-success" : "bg-danger"
                  }`}
              >
                {invoice.status}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDetail;
