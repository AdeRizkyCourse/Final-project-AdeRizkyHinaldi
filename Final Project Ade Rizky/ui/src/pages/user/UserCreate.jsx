import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserCreate = () => {
  const URL = "http://localhost:3000";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      const res = await axios.post(`${URL}/users/create`, formData);
      console.log("Created successfully:", res);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      Swal.fire({
        title: "Good job!",
        text: "Users has been added",
        icon: "success",
      });

      navigate("/users");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title mb-4">Buat Pengguna Baru</h3>

          <form onSubmit={handleSubmit}>
            {/* Nama */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter client name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-control"
                value={formData.alamat}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                className="form-control"
                value={formData.no_hp}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Create Users
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
