import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
    const pieRef = useRef(null);
    const barRef = useRef(null);
    const pieChartRef = useRef(null);
    const barChartRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:3000/dashboards").then((res) => {
            const { terbayar, belumTerbayar } = res.data;

            if (pieChartRef.current) pieChartRef.current.destroy();
            if (barChartRef.current) barChartRef.current.destroy();

            pieChartRef.current = new Chart(pieRef.current, {
                type: "pie",
                data: {
                    labels: ["Dibayar", "Belum Dibayar"],
                    datasets: [
                        {
                            data: [terbayar, belumTerbayar],
                            backgroundColor: ["#00C9A7", "#FF6B6B"],
                            borderWidth: 2,
                            hoverOffset: 10,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: "",
                            color: "#000",
                            font: {
                                size: 16,
                                weight: "bold",
                            },
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            });

            barChartRef.current = new Chart(barRef.current, {
                type: "bar",
                data: {
                    labels: ["Dibayar", "Belum Dibayar"],
                    datasets: [
                        {
                            label: "Statistik Invoice",
                            data: [terbayar, belumTerbayar],
                            backgroundColor: ["#51cf66", "#ff922b"],
                            borderRadius: 10,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: "",
                            color: "#000",
                            font: {
                                size: 16,
                                weight: "bold",
                            },
                        },
                    },
                    scales: {
                        y: { beginAtZero: true },
                    },
                },
            });
        });

        return () => {
            if (pieChartRef.current) pieChartRef.current.destroy();
            if (barChartRef.current) barChartRef.current.destroy();
        };
    }, []);

    return (
        <div className="container py-4">
            <h3 className="text-center mb-4 text-dark fw-bold">
                Dashboard
            </h3>

            <div className="row g-4">
                {/* Pie Chart */}
                <div className="col-md-6">
                    <div className="card shadow border-0">
                        <div className="card-header bg-warning bg-gradient text-center text-dark fw-bold">
                            Invoice Dibayar vs Belum Dibayar
                        </div>
                        <div className="card-body">
                            <div style={{ height: "300px", position: "relative" }}>
                                <canvas ref={pieRef}></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="col-md-6">
                    <div className="card shadow border-0">
                        <div className="card-header bg-primary bg-gradient text-center text-white fw-semibold">
                           Statistik Jumlah Invoice
                        </div>
                        <div className="card-body">
                            <div style={{ height: "300px", position: "relative" }}>
                                <canvas ref={barRef}></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
