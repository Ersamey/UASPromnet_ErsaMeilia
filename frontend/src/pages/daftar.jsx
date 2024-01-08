import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import nurse from "../assets/nurses.png";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { useNavigate } from "react-router-dom";

const Daftar = () => {
  const history = useNavigate();
  const formInitialDetails = {
    nama: "",
    usia: "",
    jenisKelamin: "",
    alamat: "",
    deskripsi: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Daftar");

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const resetForm = () => {
    setFormDetails(formInitialDetails);
    setButtonText("Daftar");
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
      const response = await fetch('http://localhost:9080/api/pasien', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User created successfully');
        window.alert('Data berhasil ditambahkan ke database!');
        resetForm();
        history('/antri');
      } else {
        console.error('Failed to create user');
        window.alert('Gagal menambahkan data ke database');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      window.alert('Terjadi kesalahan saat menambahkan data ke database');
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
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                  src={nurse}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Form Daftar Online</h2>
                  <form onSubmit={submitForm}>
                    <Row>
                      <Col size={12} sm={12} className="px-1">
                        <input
                          type="text"
                          value={formDetails.nama}
                          placeholder="Nama Lengkap"
                          onChange={(e) =>
                            onFormUpdate("nama", e.target.value)
                          }
                        />
                      </Col>
                      <Col size={12} sm={12} className="px-1">
                        <input
                          type="number"
                          value={formDetails.usia}
                          placeholder="Usia"
                          onChange={(e) =>
                            onFormUpdate("usia", e.target.value)
                          }
                        />
                      </Col>
                      <Col className="inline-radio">
                        <label className="radio-container">
                          Laki-laki
                          <input
                            type="radio"
                            value="Laki-laki"
                            name="jenisKelamin"
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
                            onChange={(e) => onFormUpdate("jenisKelamin", e.target.value)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </Col>
                      <br />
                      <Col size={12} sm={12} className="px-1 mt-3">
                        <input
                          type="text"
                          value={formDetails.alamat}
                          placeholder="Alamat"
                          onChange={(e) =>
                            onFormUpdate("alamat", e.target.value)
                          }
                        />
                      </Col>
                      <Col size={6} className="px-1">
                        <textarea
                          rows="6"
                          value={formDetails.deskripsi}
                          placeholder="Deskripsi keluhan anda"
                          onChange={(e) =>
                            onFormUpdate("deskripsi", e.target.value)
                          }
                        ></textarea>
                        
                        <button type="submit" >
                          <span>{buttonText}</span>
                        </button>
                      </Col>
                    </Row>
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

export default Daftar;
