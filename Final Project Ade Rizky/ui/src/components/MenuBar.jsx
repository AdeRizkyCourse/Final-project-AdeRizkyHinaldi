import React from 'react';
import { Link } from "react-router-dom";
import './MenuBar.css'; // pastikan file ini ada

export default function MenuBar() {
  return (
    <div className="w-100 bg-light py-3 shadow-sm">
      <div className="container text-center">
        <Link to="/" className="btn btn-link mx-2 text-decoration-none fs-5 text-dark custom-link">
          Dashboard
        </Link>
        <Link to="/clients" className="btn btn-link mx-2 text-decoration-none fs-5 text-dark custom-link">
          Klien
        </Link>
        <Link to="/users" className="btn btn-link mx-2 text-decoration-none fs-5 text-dark custom-link">
          Pengguna
        </Link>
        <Link to="/invoices" className="btn btn-link mx-2 text-decoration-none fs-5 text-dark custom-link">
          Invoice
        </Link>
      </div>
    </div>
  );
}
