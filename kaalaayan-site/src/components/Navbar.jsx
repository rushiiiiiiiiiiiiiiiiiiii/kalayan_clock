import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left: Brand Title */}
      <div className="navbar-brand">
        कालायन
      </div>

      {/* Right: Nav Links */}
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/about" className="navbar-link">About Us</Link>
        <Link to="/gallery" className="navbar-link">Gallery</Link>
        <Link to="/contact" className="navbar-link">Contact Us</Link>
        
        {/* External Demo Link */}
        <a
          href="http://118.139.164.222:3000"
          className="navbar-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Demo
        </a>

        {/* Theme Pages */}
        <Link to="/theme1" className="navbar-link">Theme 1</Link>
        <Link to="/theme2" className="navbar-link">Theme 2</Link>
        <Link to="/theme3" className="navbar-link">Theme 3</Link>
        <Link to="/theme4" className="navbar-link">Theme 4</Link>
        <Link to="/theme5" className="navbar-link">Theme 5</Link>
      </div>
    </nav>
  );
}

export default Navbar;
