import { useEffect, useState } from "react"; 
import { Navbar, Container, Nav } from 'react-bootstrap'; 
import logo from '../assets/logo.png';

// buat komponen NavBar
export const NavBar = () => {
 const [activeLink, setActiveLink] = useState('home'); 
 const [scrolled, seScrolled] = useState(false); 
 
 useEffect(() => {
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
 const onUpdateActiveLink = (link) => {
  setActiveLink(link);
 }
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
      <Nav.Link href="/daftar" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Daftar Online</Nav.Link>
    </Nav>
     
    </Navbar.Collapse>
   </Container>
  </Navbar>
 );
}

