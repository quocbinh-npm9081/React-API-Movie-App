import React from 'react'
import './footer.scss';
import { Link } from 'react-router-dom';
import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';
const Footer = () => {
    return (
        <div className="footer" style={{backgroundImage: `url(${bg})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <img src={logo} alt="" />
                    <Link to="/">BMovies</Link>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to="/">Home</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/">Term of services</Link>
                        <Link to="/">About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">Live</Link>
                        <Link to="/contact">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy policy</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">You must watch</Link>
                        <Link to="/contact">Recent release</Link>
                        <Link to="/">Top IMDB</Link>
                        <Link to="/">About us</Link>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default Footer
