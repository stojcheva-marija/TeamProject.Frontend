import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  const styles = `
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .card {
      width: 60rem; /* Increase the width to make the card bigger */
      height: 22rem; /* Increase the height to make the card bigger */
      opacity: 0.7;
      background-color: rgba(255, 255, 255, 0.7);
      padding: 2rem; /* Add padding for better spacing */
      text-align: center; /* Center the content horizontally */
    }

    .card-title {
      font-size: 2rem; /* Increase the font size for the title */
      font-weight: bold;
      color: black;
      margin-bottom: 2rem; /* Add some margin below the title */
    }

    .btn {
      background-color: #000000;
      color: #ffffff;
      font-size: 1.5rem; /* Increase the font size for the button */
      padding: 0.5rem 1rem; /* Add some padding for better button appearance */
      text-decoration: none; /* Remove underline from the link */
    }
  `;

  return (
    <div>
      <style>{styles}</style>
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
