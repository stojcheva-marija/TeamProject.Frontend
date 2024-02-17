import React from 'react';
import "./styles/AboutUs.css"
const AboutUs = () => {

  return (
    <div>
      <div className="content-container">
      <div className="card">
        <div className="card-body">
            <h2 className="card-title">About Us</h2>
            <p className="card-text">
              At ReWear, we believe that fashion can be both trendy and sustainable.
              Our mission is to make second-hand fashion accessible to everyone, offering
              a wide selection of fashion gems that would have otherwise ended up in landfills.
              With each purchase, you contribute to creating a better future for fashion and
              the planet, one step at a time.
            </p>
            <h3 className="card-title">Our Team</h3>
            <p className="card-text">
              Our team is passionate about fashion and the environment.
              We work tirelessly to curate the best collection of second-hand clothing,
              ensuring that every piece is unique and in great condition. Together,
              we aim to redefine fashion shopping and promote a sustainable lifestyle.
            </p>
            <h3 className="card-title">Contact Us</h3>
            <p className="contact-info">
              Email: info@rewear.com
            </p>
            <p className="contact-info">
              Phone: +1 (123) 456-7890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
