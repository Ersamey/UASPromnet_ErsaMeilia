import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Antri = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9080/api/pasien')
      .then(response => {
        setPatients(response.data);
        setFilteredPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []); 

  const handleSearch = () => {
    const filtered = patients.filter(patient => 
      patient.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const responsive = { 
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Daftar Antrian Puskesmas Ersa</h2>
              <input 
                type="text" 
                placeholder="Cari Pasien" 
                className="form-control mt-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="button" 
                className="btn btn-primary mt-2"
                onClick={handleSearch}
              >
                Cari
              </button>
              <Carousel responsive={responsive} infinite={true} className="listatri align-item-center">
                <div>
                  <table className="patients-table mt-4">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Usia</th>
                        <th>Jenis Kelamin</th>
                        <th>Alamat</th>
                        <th>Deskripsi</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map((patient, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{patient.nama}</td>
                          <td>{patient.usia}</td>
                          <td>{patient.jenis_kelamin}</td>
                          <td>{patient.alamat}</td>
                          <td>{patient.deskripsi}</td>
                          <td>
                            <Link to={`/view/${patient.id}`} className="btn btn-info">View</Link>
                            <Link to={`/update/${patient.id}`} className="btn btn-info">Update</Link>
                            <Link to={`/hapus/${patient.id}`} className="btn btn-danger">Delete</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Carousel>
              <br />
              <a href="/daftar" className="btn btn-secondary">Daftar</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Antri;
