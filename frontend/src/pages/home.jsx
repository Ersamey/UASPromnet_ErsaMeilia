import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <section className="banner" id="home">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6} xl={7}>
              <span className="tagline">Selamat datang di Website kami</span>
              <h1>{`Puskesmas`} </h1>
              <h1>{`Ersa Meilia`} </h1>
              <p>
                Puskesmas Ersa berkomitmen untuk memberikan pelayanan kesehatan prima dan terjangkau kepada masyarakat. Dengan dukungan tenaga medis profesional dan fasilitas yang memadai, kami bertujuan untuk meningkatkan kesejahteraan dan kesehatan seluruh warga di sekitar wilayah kami.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      
    </>
  );
};

export default Home;
