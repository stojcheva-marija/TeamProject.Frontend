import React from 'react';
import { NavLink } from 'react-router-dom';
import "./styles/HomePage.css"

const HomePage = () => {
  return (
    <div>
      <div className="content">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Be fashion-forward and eco-friendly with ReWear - shop second-hand and give a new lease of life to fashion gems that would have otherwise ended up in landfills. Let's create a better future for fashion, one purchase at a time!</h5>
            <NavLink variant='link' to="/aboutus" className='btn'> Learn more </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
