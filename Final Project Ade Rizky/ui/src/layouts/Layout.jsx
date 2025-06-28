import React from 'react';
import { Outlet } from 'react-router-dom';
import { MenuBar } from '../components';

function Layout() {
  return (
    <div>
      {/* Header */}
      <header className="bg-primary text-white py-3 text-center sticky-top">
        <h1 className="h2 fw-bold m-0">Invoice App</h1>
      </header>

      {/* Menu Bar */}
      <nav className="bg-light border-bottom" style={{ top: '56px', zIndex: 1020 }}>
        {/* 56px = tinggi header, sesuaikan jika lebih */}
        <MenuBar />
      </nav>

      {/* Content */}
      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
