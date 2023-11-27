import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: '#C2A4C8', color: 'white', textAlign: 'center', padding: '20px', zIndex: 1 }}>
      <div className="row justify-content-end align-items-center">
        <div className="col-auto">
          <p className="mb-0 text-dark font-weight-bold"><i className="fas fa-phone fa-shake" style={{ color: '#000000' }}></i>+1 (123) 456-7890</p>
        </div>
        <div className="col-auto pr-3">
          <p className="mb-0 text-dark font-weight-bold"> <i className="fas fa-envelope fa-bounce" style={{ color: '#000000' }}></i> info@rewear.com</p>
        </div>
        <div className="col-auto">
       <a href="/help"><img src="https://cdn-icons-png.flaticon.com/512/71/71768.png" alt="QuestionMarkIMG" style={{ width: '25px', height: '25px' }} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
