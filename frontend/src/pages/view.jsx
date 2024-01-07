import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

const Lihat = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({});

  const fetchPatientById = async (id) => {
    try {
      const response = await fetch(`http://localhost:9080/api/pasien/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        setPatient({
          nama: data.nama,
          usia: data.usia,
          jenis_kelamin: data.jenis_kelamin,
          alamat: data.alamat,
          deskripsi: data.deskripsi,
        });
      } else {
        console.error("Failed to fetch patient data");
        // Handle error, redirect, or show error message to the user
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
      // Handle error, redirect, or show error message to the user
    }
  };

  useEffect(() => {
    fetchPatientById(id)
      .then((res) => {
        setPatient(res.data);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  }, [id]);

  return (
    <section className="view" id="views">
      <div>
     <br />
        <Link to={`/antri`} className="btn btn-info btn-back">
          Back
        </Link>
        <div className="card col-md-50 offset-md-50">
          <h3 className="text-center">Detail Pendaftar</h3>
          <div className="card-body">
            <div className="row">
              <label className="info-label">Nama:</label>
              <div className="info-value">{patient.nama}</div>
            </div>
            <div className="row">
              <label className="info-label">Usia:</label>
              <div className="info-value">{patient.usia}</div>
            </div>
            <div className="row">
              <label className="info-label">Jenis Kelamin:</label>
              <div className="info-value">{patient.jenis_kelamin}</div>
            </div>
            <div className="row">
              <label className="info-label">Alamat:</label>
              <div className="info-value">{patient.alamat}</div>
            </div>
            <div className="row">
              <label className="info-label">Deskripsi:</label>
              <div className="info-value">{patient.deskripsi}</div>
            </div>
            {/* Tambahkan field lain sesuai kebutuhan */}
          </div>
        </div>
        <br />

        <div>
          <Link to={`/update/${id}`} className="btn btn-info">
            Update
          </Link>
          <Link to={`/hapus/${id}`} className="btn btn-danger">
            Delete
           </Link>
           
        </div>
      </div>
    </section>
  );
};

export default Lihat;
