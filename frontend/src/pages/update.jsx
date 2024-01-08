import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrackVisibility from "react-on-screen";
import nurse from "../assets/nurses.png";
import "animate.css";
import { Col, Container, Row } from "react-bootstrap";

const Update = () => {
  const { id } = useParams();
  const [formDetails, setFormDetails] = useState({
    nama: "",
    usia: "",
    jenisKelamin: "",
    alamat: "",
    deskripsi: "",
  });

  const history = useNavigate();

  useEffect(() => {
    console.log("Fetching data for id:", id);

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9080/api/pasien/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);

          setFormDetails({
            nama: data.nama,
            usia: data.usia,
            jenisKelamin: data.jenis_kelamin,
            alamat: data.alamat,
            deskripsi: data.deskripsi,
          });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!formDetails.nama) {
    return <div>Loading...</div>;
  }

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      nama: formDetails.nama,
      usia: formDetails.usia,
      jenis_kelamin: formDetails.jenisKelamin,
      alamat: formDetails.alamat,
      deskripsi: formDetails.deskripsi,
    };

    try {
      const response = await fetch(`http://localhost:9080/api/pasien/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User updated successfully");
        history("/antri");
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={isVisible ? "animate__animated animate__zoomIn" : ""}
                  src={nurse}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h3>Silahkan Masukan Data Terbaru</h3>
                  <form onSubmit={submitForm}>
                    {/* Nama Input */}
                    <Col size={12} sm={12} className="px-1">
                      <input
                        type="text"
                        value={formDetails.nama}
                        placeholder="Nama Lengkap"
                        onChange={(e) => onFormUpdate("nama", e.target.value)}
                      />
                    </Col>
                    <input
                      type="number"
                      value={formDetails.usia}
                      placeholder="Usia"
                      onChange={(e) => onFormUpdate("usia", e.target.value)}
                    />
                    <br />
                    <br />
                    <label className="radio-container">
                      Laki-laki
                      <input
                        type="radio"
                        value="Laki-laki"
                        name="jenisKelamin"
                        checked={formDetails.jenisKelamin === "Laki-laki"}
                        onChange={(e) => onFormUpdate("jenisKelamin", e.target.value)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="radio-container">
                      Perempuan
                      <input
                        type="radio"
                        value="Perempuan"
                        name="jenisKelamin"
                        checked={formDetails.jenisKelamin === "Perempuan"}
                        onChange={(e) => onFormUpdate("jenisKelamin", e.target.value)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <br />
                    <br />
                    <input
                      type="tel"
                      value={formDetails.alamat}
                      placeholder="Alamat"
                      onChange={(e) => onFormUpdate("alamat", e.target.value)}
                    />
                    <Col size={6} md={12} className="px-1">
                      <textarea
                        rows="6"
                        value={formDetails.deskripsi}
                        placeholder="Deskripsi keluhan anda"
                        onChange={(e) => onFormUpdate("deskripsi", e.target.value)}
                      ></textarea>
                    </Col>
                    <button type="submit">Update Data</button>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Update;
