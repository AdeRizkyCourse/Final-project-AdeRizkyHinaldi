import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/detail/${id}`);
        const data = res.data;
        setFormData({
          name: data.name || "",
          email: data.email || "",
          password: data.password || "",
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
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
      await axios.put(`http://localhost:3000/users/update/${id}`, formData);
      Swal.fire({
        title: "Success!",
        text: "User updated successfully",
        icon: "success",
      });
      navigate("/users");
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire({
        title: "Failed",
        text: "Failed to update user",
        icon: "error",
      });
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Edit User</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Nama */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nama</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">No HP</label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
