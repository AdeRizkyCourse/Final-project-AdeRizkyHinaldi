import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ClientUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    no_hp: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/clients/detail/${id}`);
        const data = res.data;
        setFormData({
          nama: data.nama || "",
          alamat: data.alamat || "",
          no_hp: data.no_hp || "",
          email: data.email || "",
        });
      } catch (err) {
        console.error("Error fetching client:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

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
      await axios.put(`http://localhost:3000/clients/update/${id}`, formData);
      Swal.fire({
        title: "Success!",
        text: "Client updated successfully",
        icon: "success",
      });
      navigate("/clients");
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire({
        title: "Failed",
        text: "Failed to update client",
        icon: "error",
      });
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Edit Klien</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Nama */}
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">Nama</label>
              <input
                type="text"
                className="form-control"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </div>

            {/* Alamat */}
            <div className="mb-3">
              <label htmlFor="alamat" className="form-label">Alamat</label>
              <input
                type="text"
                className="form-control"
                id="alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
              />
            </div>

            {/* No HP */}
            <div className="mb-3">
              <label htmlFor="no_hp" className="form-label">No HP</label>
              <input
                type="text"
                className="form-control"
                id="no_hp"
                name="no_hp"
                value={formData.no_hp}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Update Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientUpdate;
