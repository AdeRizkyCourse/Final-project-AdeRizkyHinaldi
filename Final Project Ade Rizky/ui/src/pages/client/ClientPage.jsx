import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

function ClientPage() {
  const URL = "http://localhost:3000";
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    try {
      const result = await axios.get(`${URL}/clients`);
      setClients(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async (id) => {
    try {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
          await axios.delete(`${URL}/clients/delete/${id}`);
          Swal.fire("Berhasil!", "Data telah dihapus.", "success");
          getClients(); // refresh data
        } catch (error) {
          Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
        }
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-dark">Daftar Klien</h3>
        <Link to="/clients/create" className="btn btn-primary">
          + Tambah Klien
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Id</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>No HP</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 ? (
              clients.map(({ id, nama, alamat, no_hp, email }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{nama}</td>
                  <td>{alamat}</td>
                  <td className="text-success fw-semibold">{no_hp}</td>
                  <td>{email}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        to={`/clients/detail/${id}`}
                        className="btn btn-sm btn-outline-primary d-flex align-items-center"
                      >
                        <FiEye className="me-1" /> Detail
                      </Link>
                      <Link
                        to={`/clients/update/${id}`}
                        className="btn btn-sm btn-outline-warning d-flex align-items-center"
                      >
                        <FiEdit className="me-1" /> Edit
                      </Link>
                      <button
                        onClick={() => deleteHandler(id)}
                        className="btn btn-sm btn-outline-danger d-flex align-items-center"
                      >
                        <FiTrash2 className="me-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  There's no Clients available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientPage;
