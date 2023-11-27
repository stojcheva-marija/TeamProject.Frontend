import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { setSelectedFilters } from '../app/productsSlice';
import { useNavigate } from 'react-router-dom';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import { NavLink, useLocation } from 'react-router-dom';


const SidebarMenu = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [isBuyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [isFemaleSubmenuOpen, setFemaleSubmenuOpen] = useState(false);
  const [isMaleSubmenuOpen, setMaleSubmenuOpen] = useState(false);
  const [isFemaleClothesOpen, setFemaleClothesOpen] = useState(false);
  const [isMaleClothesOpen, setMaleClothesOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
    setBuyDropdownOpen(false);
    setFemaleSubmenuOpen(false);
    setMaleSubmenuOpen(false);
    setFemaleClothesOpen(false);
    setMaleClothesOpen(false);
  };

  const toggleBuyDropdown = () => {
    setBuyDropdownOpen(!isBuyDropdownOpen);
    setFemaleSubmenuOpen(false);
    setMaleSubmenuOpen(false);
    setFemaleClothesOpen(false);
    setMaleClothesOpen(false);
  };

  const toggleFemaleSubmenu = () => {
    setFemaleSubmenuOpen(!isFemaleSubmenuOpen);
    setMaleSubmenuOpen(false);
    setFemaleClothesOpen(false);
    setMaleClothesOpen(false);
  };

  const toggleMaleSubmenu = () => {
    setMaleSubmenuOpen(!isMaleSubmenuOpen);
    setFemaleSubmenuOpen(false);
    setFemaleClothesOpen(false);
    setMaleClothesOpen(false);
  };

  const toggleFemaleClothes = () => {
    setFemaleClothesOpen(!isFemaleClothesOpen);
    setMaleClothesOpen(false);
  };

  const toggleMaleClothes = () => {
    setMaleClothesOpen(!isMaleClothesOpen);
    setFemaleClothesOpen(false);
  };

  const handleFilterChange = (type, sex, subcategory) => {
    setNavOpen(false);
    setBuyDropdownOpen(false);
    setFemaleSubmenuOpen(false);
    setMaleSubmenuOpen(false);
    setFemaleClothesOpen(false);
    setMaleClothesOpen(false);

    dispatch(setSelectedFilters({ type, sex, subcategory }));
    navigate('/products');
  };

  const closeSideMenu = () => {
    setNavOpen(false);
    setBuyDropdownOpen(false);
    setFemaleSubmenuOpen(false);
    setMaleSubmenuOpen(false);
    setFemaleClothesOpen(false);
    setMaleClothesOpen(false);
  };

  useEffect(() => {
    closeSideMenu();
  }, [location]);

  const styles = `

  .sidebar-menu {
    position: relative;
    font-family: Arial, sans-serif;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .sidebar-toggle {
    cursor: pointer;
    font-size: 24px;
    padding: 10px;
    background-color: transparent;
    color: ${isNavOpen ? 'inherit' : '#000000'};
    font-weight: bold;
  }

  .sidebar-toggle.open {
    border-bottom: none;
  }

  .sidenav {
    height: 100%;
    width: 300px; 
    position: fixed;
    top: 0;
    left: ${isNavOpen ? '0' : '-400px'};
    background-color: #F3D395;
    overflow-x: hidden;
    transition: left 0.5s;
    padding-top: 60px;
    border: 2.5px solid black;
    z-index: 2;
  }

    .sidenav .rewear-logo {
      color: ${isNavOpen ? '#000000' : 'inherit'}; 
      font-weight: bold;
      text-decoration: none;
    }

    .sidenav:not(.open) .rewear-logo:before {
      content: none;
    }

    .sidenav a {
      padding: 8px 8px 8px 32px;
      text-decoration: none;
      font-size: 25px;
      color: #818181;
      display: block;
      transition: 0.3s;
      cursor: pointer;
    }

    .sidenav a,
    .dropdown-btn {
      padding: 6px 8px 6px 16px;
      text-decoration: none;
      font-size: 20px;
      color: #000000;
      display: block;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      outline: none;
    }

    .sidenav .closebtn {
      position: absolute;
      top: 5px;
      right: 10px; 
      font-size: 36px;
      font-weight: bold; 
      cursor: pointer;
    }

    .sidenav a:hover,
    .sidenav .closebtn:hover {
      cursor: pointer;
    }

    .dropdown-icon {
      cursor: pointer;
    }
    .sidenav.open {
      z-index: 3; }
      
  `;

  return (
    <div className="sidebar-menu">
      <style>{styles}</style>
      <span className={`sidebar-toggle ${isNavOpen ? 'open' : ''}`} onClick={toggleNav}>
        &#9776; <span className="rewear-logo">ReWear</span>
      </span>
      <div className={`sidenav ${isNavOpen ? 'open' : ''}`}>
        <div className="closebtn" onClick={closeSideMenu}>
          &times;
        </div>
        <Nav className="flex-column">
          <NavLink variant='link' to='/' >Home</NavLink>
          <NavLink variant='link' to='/aboutus' style={{ color: '#000000' }}>
            About Us
          </NavLink>
          <Nav.Link href="#" style={{ color: '#000000' }} onClick={toggleBuyDropdown}>
            Buy{' '}
            {isNavOpen && (isBuyDropdownOpen ? <BsCaretUpFill /> : <BsCaretDownFill />)}
          </Nav.Link>
          {isBuyDropdownOpen && isNavOpen && (
            <>
              {/* Female Submenu */}
              <Nav.Link
                href="#"
                style={{ color: '#000000', paddingLeft: '20px' }}
                onClick={toggleFemaleSubmenu}
              >
                Female
                {isNavOpen && (isFemaleSubmenuOpen ? <BsCaretUpFill /> : <BsCaretDownFill />)}
              </Nav.Link>
              {isFemaleSubmenuOpen && isNavOpen && (
                <>
                  {/* Female Clothes Submenu */}
                  <Nav.Link
                    href="#"
                    style={{ color: '#000000', paddingLeft: '40px' }}
                    onClick={() => handleFilterChange('', 'Female', '')}
                  >
                    All
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    style={{ color: '#000000', paddingLeft: '40px' }}
                    onClick={toggleFemaleClothes}
                  >
                    Clothes
                    {isFemaleClothesOpen ? <BsCaretUpFill /> : <BsCaretDownFill />}
                  </Nav.Link>
                  {isFemaleClothesOpen && isNavOpen && (
                    <>
                      <Nav.Link href="#" 
                        style={{ color: '#000000', paddingLeft: '60px' }}
                        onClick={() => handleFilterChange('Clothes', 'Female', '')}
                      >
                        All
                      </Nav.Link>
                      <Nav.Link href="#" 
                        style={{ color: '#000000', paddingLeft: '60px' }}
                        onClick={() => handleFilterChange('Clothes', 'Female', 'TShirts/Tops')}
                      >
                        TShirts/Tops
                      </Nav.Link>
                      <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Blouses/Shirts')}
                  >
                    Blouses/Shirts
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Sweatshirts')}>
                    Sweatshirts
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Jackets/Coats/Blazers')}>
                    Jackets/Coats/Blazers
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Dresses')}>
                    Dresses
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Trousers')}>
                    Trousers
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Jeans')}>
                    Jeans
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Skirts/Shorts')}>
                    Skirts/Shorts
                  </Nav.Link>
                    </>
                  )}
                  {/* End of Female Clothes Submenu */}
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '40px' }} onClick={() => handleFilterChange('Accessories', 'Female', '')}>
                    Accessories
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '40px' }} onClick={() => handleFilterChange('Shoes', 'Female', '')}>
                    Shoes
                  </Nav.Link>
                </>
              )}
  <Nav.Link
                href="#"
                style={{ color: '#000000', paddingLeft: '20px' }}
                onClick={toggleMaleSubmenu}
              >
                Male
                {isNavOpen && (isMaleSubmenuOpen ? <BsCaretUpFill /> : <BsCaretDownFill />)}
              </Nav.Link>
              {isMaleSubmenuOpen && isNavOpen && (
                <>
                  <Nav.Link
                    href="#"
                    style={{ color: '#000000', paddingLeft: '40px' }}
                    onClick={() => handleFilterChange('', 'Male', '')}
                  >
                    All
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    style={{ color: '#000000', paddingLeft: '40px' }}
                    onClick={toggleMaleClothes}
                  >
                    Clothes
                    {isMaleClothesOpen ? <BsCaretUpFill /> : <BsCaretDownFill />}
                  </Nav.Link>
                  {isMaleClothesOpen && isNavOpen && (
                    <>
                 <Nav.Link href="#" 
                  style={{ color: '#000000', paddingLeft: '60px' }}
                  onClick={() => handleFilterChange('Clothes', 'Male', '')}>
                    All
                  </Nav.Link>
                  <Nav.Link href="#" 
                  style={{ color: '#000000', paddingLeft: '60px' }}
                  onClick={() => handleFilterChange('Clothes', 'Male', 'TShirts')}>
                    TShirts
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Male', 'Blouses/Shirts')}
                  >
                    Blouses/Shirts
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Male', 'Sweatshirts')}>
                    Sweatshirts
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Male', 'Jackets/Coats/Blazers')}>
                    Jackets/Coats/Blazers
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Male', 'Trousers')}>
                    Trousers
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Male', 'Jeans')}>
                    Jeans
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Male', 'Shorts')}>
                    Shorts
                  </Nav.Link>
                </>
              )}
              <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '40px' }}
              onClick={() => handleFilterChange('Accessories', 'Male', '')}>
                Accessories
              </Nav.Link>
              <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '40px' }}
               onClick={() => handleFilterChange('Shoes', 'Male', '')}>
                Shoes
              </Nav.Link>
                </>
              )}
            </>
          )}
          <NavLink variant='link' to='/add' style={{ color: '#000000' }}>
            Sell
          </NavLink>
          <NavLink variant='link' to='/notImplemented' style={{ color: '#000000' }}>
            Rent
          </NavLink>
          <NavLink variant='link' to='/notImplemented' style={{ color: '#000000' }}>
            Donate
          </NavLink>
        </Nav>
      </div>
    </div>
  );
};

export default SidebarMenu;
