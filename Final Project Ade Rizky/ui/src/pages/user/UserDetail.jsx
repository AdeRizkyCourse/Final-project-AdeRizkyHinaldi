import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BsArrowLeftSquare } from "react-icons/bs";


export default function UserDetail() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const URL = 'http://localhost:3000';

  const getUserById = async () => {
    try {
      const result = await axios.get(`${URL}/users/detail/${+params.id}`);
      setUser(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h3> Detail Pengguna</h3>
           <Link to="/users" className="btn btn-primary mb-3">
        <BsArrowLeftSquare className="me-1" />Kembali ke Daftar Pengguna
      </Link>
          {user ? (
            <div className="row">
              <div className="col-md-12 mb-3">
                <strong>Nama:</strong> <span>{user.name}</span>
              </div>
              <div className="col-md-12 mb-3">
                <strong>Email:</strong> <span>{user.email}</span>
              </div>
              <div className="col-md-12 mb-3">
                <strong>Password:</strong> <span>{user.password}</span>
              </div>
              {user.image && (
                <div className="col-12 mt-4">
                  <img
                    src={user.image}
                    alt={user.nama}
                    className="img-fluid rounded shadow"
                  />
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-muted">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
