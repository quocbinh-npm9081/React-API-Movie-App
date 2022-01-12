import React from 'react';
import './header.scss';
import { useEffect, useRef} from 'react';
import logo from '../../assets/tmovie.png';
import { Link, useLocation} from 'react-router-dom';
const headerNav = [
    {
        display: 'Home',
        path: '/React-API-Movie-App'

    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    }
];
const Header = () => {
    const {pathname} = useLocation();
    const headerRef = useRef(null);
    const active = headerNav.findIndex(e=>e.path === pathname);
        useEffect(() => {
            //console.log(pathname);
            const shrinkHeader = () =>{
                if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
                    headerRef.current.classList.add("shrink");
                }else{
                    headerRef.current.classList.remove("shrink");
                }
               // headerRef.current.classList.toggle("shrink", window.scrollY > 0);
            }
            window.addEventListener('scroll', shrinkHeader)
            return ()=>{
                window.removeEventListener('scroll', shrinkHeader)
            }
        },[])
        return (
            <div ref={headerRef} className="header">
                <div className="header__wrap container">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="/React-API-Movie-App">BMovies</Link>
                    </div>
                    <div>
                    <ul className="header__nav">
                        {
                            headerNav.map((e, i) => (
                                <li key={i} className={`${i === active ? 'active' : ''}`}>
                                    <Link to={e.path}>
                                        {e.display}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    </div>
                </div>
            </div>
        );
}

export default Header
