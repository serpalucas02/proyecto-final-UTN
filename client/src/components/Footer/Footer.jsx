import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';

function Footer() {
    return (
        <footer>
            <div className='footer'>
                <img src={logo} alt="logo" className='logo'/>
                <p>IMPORTANTE: Las imágenes de los productos son sólo a modo ilustrativo. Los precios pueden sufrir variaciones sin previo aviso. Disponibilidad sujeta a stock.</p>
                <ul className="redesSociales">
                    <li><Link to='#'>Instagram</Link></li>
                    <li><Link to='#'>Facebook</Link></li>
                    <li><Link to='#'>Twitter</Link></li>
                    <li><Link to='#'>Youtube</Link></li>
                </ul>
                
            </div>
            <div className="footer-bottom">
                <p>&copy; L&A TECH 2022 - designed by <span>Lucas Nahuel Serpa</span></p>
            </div>
        </footer>
    );
}

export default Footer;