import { useEffect, useState } from "react"; // import useEffect dan useState dari React untuk keperluan lifecycle dan state
import { Navbar, Container, Nav } from 'react-bootstrap'; 
import logo from '../assets/logo.png';

// buat komponen NavBar
export const NavBar = () => {
 const [activeLink, setActiveLink] = useState('home'); //state untuk menyimpan data link yang aktif
 const [scrolled, seScrolled] = useState(false); //state untuk menyimpan data apakah navbar sudah discroll atau belum
 
 useEffect(() => {//cek apakah navbar sudah discroll atau belum
  const onScroll = () => {
   if (window.scrollY > 50) {
    seScrolled(true);
   } else {
    seScrolled(false);
   }
  }

  window.addEventListener('scroll', onScroll);
  
  return () => window.removeEventListener('scroll', onScroll);
 }, []);
 // buat fungsi untuk mengupdate data link yang aktif
 const onUpdateActiveLink = (link) => {
  setActiveLink(link);
 }
  // tampilkan komponen navbar
 return (
  <Navbar expand="lg" className={scrolled ? "scrolled": ""}> 
    <Container>
     <Navbar.Brand href="#home" > 
      <img src={logo} alt="logo" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav">
     <span className="navbar-toggler-icon" /> 
    </Navbar.Toggle> 
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <Nav.Link href="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
      <Nav.Link href="/antri" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Lihat Antrian</Nav.Link>
      <Nav.Link href="/antri" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Daftar Online</Nav.Link>
    </Nav>
     
    </Navbar.Collapse>
   </Container>
  </Navbar>
 );
}

