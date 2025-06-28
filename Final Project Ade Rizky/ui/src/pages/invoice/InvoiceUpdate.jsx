import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const InvoiceUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [clients, setClients] = useState([]);
    const [users, setUsers] = useState([]);

    const [form, setForm] = useState({
        no_invoice: "",
        id_client: "",
        id_user: "",
        status: "",
        total_harga: 0,
    });

    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch clients & users
        axios.get("http://localhost:3000/clients").then((res) => setClients(res.data));
        axios.get("http://localhost:3000/users").then((res) => setUsers(res.data));

        // Fetch invoice data
        axios.get(`http://localhost:3000/invoices/show/${id}`).then((res) => {
            const data = res.data;
            setForm({
                no_invoice: data.no_invoice,
                id_client: data.id_client,
                id_user: data.id_user,
                status: data.status,
                total_harga: data.total_harga,
            });
            setItems(
                (data.Items || []).map((item) => ({
                    id: item.id,
                    nama_barang: item.nama_barang,
                    jumlah: +item.jumlah,
                    harga_satuan: +item.harga_satuan,
                    total_harga_item: +item.total_harga_item,
                }))
            );

        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = field === "jumlah" || field === "harga_satuan" ? +value : value;
        newItems[index].total_harga_item = newItems[index].jumlah * newItems[index].harga_satuan;
        setItems(newItems);
        updateGrandTotal(newItems);
    };

    const updateGrandTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.total_harga_item, 0);
        setForm((prev) => ({ ...prev, total_harga: total }));
    };

    const addItemRow = () => {
        setItems([...items, { nama_barang: "", jumlah: 0, harga_satuan: 0, total_harga_item: 0 }]);
    };

    const removeItemRow = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        updateGrandTotal(newItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            nama_barang: items.map((i) => i.nama_barang),
            jumlah: items.map((i) => i.jumlah),
            harga_satuan: items.map((i) => i.harga_satuan),
            total_harga_item: items.map((i) => i.total_harga_item),
        };

        try {
            await axios.put(`http://localhost:3000/invoices/update/${id}`, payload);
            Swal.fire("Berhasil", "Invoice berhasil diupdate", "success");
            navigate("/invoices");
        } catch (err) {
            console.error(err);
            Swal.fire("Gagal", "Gagal mengupdate invoice", "error");
        }
    };

    return (
        <div className="container mt-4">
            <h3>Edit Invoice</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">No Invoice</label>
                    <input
                        type="text"
                        name="no_invoice"
                        value={form.no_invoice}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Klien</label>
                    <select
                        name="id_client"
                        value={form.id_client}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select Klien</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.nama}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Pengguna</label>
                    <select
                        name="id_user"
                        value={form.id_user}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select Pengguna</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <h5>Item Invoice</h5>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nama Barang</th>
                            <th>Jumlah</th>
                            <th>Harga Satuan</th>
                            <th>Total Harga</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={item.nama_barang}
                                        onChange={(e) => handleItemChange(i, "nama_barang", e.target.value)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.jumlah}
                                        onChange={(e) => handleItemChange(i, "jumlah", e.target.value)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.harga_satuan}
                                        onChange={(e) => handleItemChange(i, "harga_satuan", e.target.value)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input type="number" className="form-control" value={item.total_harga_item} readOnly />
                                </td>
                                <td>
                                    {items.length > 1 && (
                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => removeItemRow(i)}>
                                            Hapus
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button type="button" onClick={addItemRow} className="btn btn-secondary mb-3">
                    + Tambah Item
                </button>

                <div className="mb-3">
                    <label className="form-label">Total Harga</label>
                    <input
                        type="number"
                        className="form-control"
                        value={form.total_harga}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select name="status" value={form.status} onChange={handleChange} className="form-select" required>
                        <option value="">Select Status</option>
                        <option value="dibayar">Dibayar</option>
                        <option value="belum dibayar">Belum Dibayar</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-success me-2">
                    Update
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/invoices")}>
                    Kembali
                </button>
            </form>
        </div>
    );
};

export default InvoiceUpdate;
