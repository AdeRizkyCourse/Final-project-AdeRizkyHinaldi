import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BsArrowLeftSquare } from "react-icons/bs";

export default function ClientDetail() {
  const params = useParams();
  const [client, setClient] = useState(null);
  const URL = 'http://localhost:3000';

  const getClientById = async () => {
    try {
      const result = await axios.get(`${URL}/clients/detail/${+params.id}`);
      setClient(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClientById();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h3>Detail Klien</h3>
           <Link to="/clients" className="btn btn-primary mb-3">
        <BsArrowLeftSquare className="me-1" />Kembali ke Daftar Klien
      </Link>

          {client ? (
            <div className="row">
              <div className="col-md-12 mb-3">
                <strong>Nama:</strong> <span>{client.nama}</span>
              </div>
              <div className="col-md-12 mb-3">
                <strong>Alamat:</strong> <span>{client.alamat}</span>
              </div>
              <div className="col-md-12 mb-3">
                <strong>No. HP:</strong> <span>{client.no_hp}</span>
              </div>
              <div className="col-md-12 mb-3">
                <strong>Email:</strong> <span>{client.email}</span>
              </div>
              {client.image && (
                <div className="col-12 mt-4">
                  <img
                    src={client.image}
                    alt={client.nama}
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
