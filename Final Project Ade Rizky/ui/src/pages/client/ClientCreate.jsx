import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ClientCreate = () => {
  const URL = "http://localhost:3000";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    no_hp: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${URL}/clients/create`, formData);
      console.log("Created successfully:", res);

      setFormData({
        nama: "",
        alamat: "",
        no_hp: "",
        email: "",
      });

      Swal.fire({
        title: "Good job!",
        text: "Client has been added",
        icon: "success",
      });

      navigate("/clients");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title mb-4">Buat Klien Baru</h3>

          <form onSubmit={handleSubmit}>
            {/* Nama */}
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Nama
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                className="form-control"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Enter client name"
                required
              />
            </div>

            {/* Alamat */}
            <div className="mb-3">
              <label htmlFor="alamat" className="form-label">
                Alamat
              </label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                className="form-control"
                value={formData.alamat}
                onChange={handleChange}
                required
              />
            </div>

            {/* Nomer HP */}
            <div className="mb-3">
              <label htmlFor="no_hp" className="form-label">
                Nomer HP
              </label>
              <input
                type="text"
                id="no_hp"
                name="no_hp"
                className="form-control"
                value={formData.no_hp}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
            </div>

            {/* Submit */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Create Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientCreate;
