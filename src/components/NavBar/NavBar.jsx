import { useState, useEffect } from 'react';
import '../../index.css';
import './navbar.css';
import logo from '../../assets/logo.png';
import home from '../../assets/home.svg';
import favorite from '../../assets/curtir-preenchido.png';
import pesquisar from '../../assets/lupa.svg';
import about from '../../assets/about.svg'

function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    if (!isPinned || isMobile) setIsExpanded(!isExpanded);
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--main-layout-margin', isPinned ? '14vw' : '6vw');

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isPinned]);

  return (
    <>
      {isMobile && (
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      )}
      <nav
        className={`sidebar ${isExpanded || isPinned ? 'expanded' : 'collapsed'}`}
        onMouseEnter={!isMobile ? toggleMenu : undefined}
        onMouseLeave={!isMobile ? toggleMenu : undefined}
      >
        <div className={`logo-container ${isExpanded || isPinned ? 'visible' : ''}`}>
          <img className="logo" src={logo} alt="logo" />
          {(isExpanded || isPinned) && <h3>GL</h3>}
        </div>

        <div className={`nav-list ${isExpanded || isPinned ? 'visible' : ''}`}>
          <p className="menu-items"><img src={home} alt="home-page" />{(isExpanded || isPinned) && 'Home'}</p>
          <p className="menu-items"><img src={favorite} alt="favorite" />{(isExpanded || isPinned) && 'Favoritas'}</p>
          <p className="menu-items"><img src={pesquisar} alt="pesquisar" />{(isExpanded || isPinned) && 'Pesquisar'}</p>
        </div>

        <button className={`pin-button ${isExpanded || isPinned ? 'visible' : ''}`} onClick={togglePin}>
          {isPinned ? 'Desafixar' : 'Fixar'}
        </button>
      </nav>
    </>
  );
}


export default NavBar;