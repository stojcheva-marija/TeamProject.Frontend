import { Nav, Button } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/authenticationSlice';
import React, { useState, useEffect } from 'react';
import SidebarMenu from './SidebarMenu';

const Navbar = () => {
  const { isLoggedIn } = useSelector(state => state.authenticationSlice);
  const dispatch = useDispatch();
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const location = useLocation(); 
  const noCartItems = useSelector(state => state.productsSlice.cart.length);
  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  const handleCloseSubMenu = () => {
    setSubMenuOpen(false);
  };

  useEffect(() => {
    handleCloseSubMenu();
  }, [location]);


  return (
    <Nav className='navbar' style={{ backgroundColor: '#C2A4C8', textAlign: 'center', padding: '20px' }}>
      <SidebarMenu />
      {isLoggedIn ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <NavLink to="/cart" style={{ position: 'relative', marginLeft: '1rem', color: 'black', fontSize: '24px', textDecoration: 'none' }}>
          <i className="fa fa-shopping-cart"></i>
          {noCartItems > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                backgroundColor: '#FF5733',
                borderRadius: '50%',
                padding: '4px 6px',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              {noCartItems}
            </span>
          )}
        </NavLink>
          <NavLink to="/faves" style={{ marginLeft: '1rem', color: 'black', fontSize: '24px', textDecoration: 'none' }}>
            <i className="fa fa-heart"></i>
          </NavLink>
          <div style={{ position: 'relative', marginLeft: '1rem', zIndex: '1' }}> {/* Add zIndex: '1' to the submenu container */}
            <i className="fa fa-user" onClick={toggleSubMenu} style={{ fontSize: '24px', cursor: 'pointer', textDecoration: 'none', color: 'black' }}></i>
            {isSubMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  backgroundColor: '#C2A4C8',
                  top: '100%',
                  left: '-120px', // Adjust the left value to move the submenu to the left of the shopping cart icon
                  width: '160px', // Adjust the width as needed
                  padding: '10px',
                  borderRadius: '5px',
                  zIndex: '2', // Set a higher zIndex to make the submenu go over the content
                }}
              >
                <NavLink to="/myProfile" style={{ color: 'black', display: 'block', fontSize: '18px', textDecoration: 'none', fontWeight: 'bold' }}>
                  My profile
                </NavLink>
                <hr/>
                <NavLink to="/myProducts" style={{ color: 'black', display: 'block', fontSize: '18px', textDecoration: 'none', fontWeight: 'bold' }}>
                  My products
                </NavLink>
                <hr/>
                <NavLink to="/myOrders" style={{ color: 'black', display: 'block', fontSize: '18px', textDecoration: 'none', fontWeight: 'bold' }}>
                  My orders
                </NavLink>
                <hr/>
                <Button variant='link' href='/signin' onClick={() => { dispatch(logout()) }} style={{ color: 'black', fontSize: '18px', textDecoration: 'none', fontWeight: 'bold', backgroundColor: '#C2A4C8',
                borderColor: '#C2A4C8', margintop: '0', padding: '0px'}}>
                  Log out
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <NavLink to="/signin" style={{ marginLeft: '1rem', color: 'black', fontSize: '18px', textDecoration: 'none', fontWeight: 'bold' }}>Sign in</NavLink>
          <NavLink to="/signup" style={{ marginLeft: '1rem', color: 'black', fontSize: '18px', textDecoration: 'none', fontWeight: 'bold' }}>Sign up</NavLink>
        </div>
      )}
    </Nav>
  );
};

export default Navbar;
