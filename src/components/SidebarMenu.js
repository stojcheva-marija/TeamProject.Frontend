import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { setSelectedFilters } from '../app/productsSlice';
import { useNavigate } from 'react-router-dom';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import { NavLink, useLocation } from 'react-router-dom';
import "./styles/SidebarMenu.css"

const MySidebarMenu = () => {
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
    console.log('Toggling nav');
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

  return (
    <div className="sidebar-menu">
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

export default MySidebarMenu;
