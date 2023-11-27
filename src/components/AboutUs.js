import React from 'react';

const AboutUs = () => {
  const styles = `

    .content-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .card {
      width: 60rem;
      height: auto;
      opacity: 0.9;
      background-color: #ffffff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
    }

    .card-title {
      font-size: 2.5rem;
      font-weight: bold;
      color: #333333;
      margin-bottom: 2rem;
    }

    .card-text {
      font-size: 1.6rem;
      color: #555555;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .contact-info {
      font-size: 1.6rem;
      color: #555555;
      margin-bottom: 1rem;
    }
  `;

  return (
    <div>
      <style>{styles}</style>
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
