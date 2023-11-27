import React, { useState } from 'react';

const Help = () => {

  const [activeIndex, setActiveIndex] = useState(null);

    const styles=`
    
        .custom-font {
          font-family: 'Tangerine';
          font-weight: bold;
          font-size: 3rem;
        }
  
    
        .content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
    
        .content .card {
          width: 50rem;
          opacity: 1;
          background-color: rgba(255, 255, 255, 0.7);
        }
    
        .card-body h5,
        .card-body a {
          color: #000000;
          opacity: 1;
        }
    
        .arrow-icon {
          font-size: 12px;
          margin-left: 10px;
        }
        
        .faq-page {
          padding: 10px; /* Add padding to the question container */
          transition: background-color 0.4s; /* Add transition for smoother effect */
        }
        
        .faq-page.active {
          background-color: #C2A4C8; /* Light gray background for the active question */
        }
        
        .faq-body {
          display: block;
          overflow: hidden;
          background-color: #F3D395;
          color: #000;
          padding: 10px;
          margin-top: 10px;
          border-radius: 5px;
        }
    
          `;

          const questions = [
            'How can I make an account?',
            'How can I order an item?',
            'How can I sell an item?',
            'When can I rate the seller I ordered from?',
            'Is there a delivery charge?',
            'How long does it take for my order to arrive?'
          ];
        
          const answers = [
            'The process of registration is very simple. You just need to enter your personal information. To start the registration process, click on "SIGN IN" in the upper right corner, then fill in your personal details.If you are already a registered user, click on "LOG IN" in the upper right corner, enter your email address, and continue shopping.',
            'To be able to make purchases on our website, you need to be a registered user. Refer to question 1 for a guide on registering. The process of ordering starts with choosing an item from any of the available categories under the Buy section. Upon adding an item to your shopping cart, a notification will appear above the shopping cart icon. An order can be placed through the shopping cart where you will find all available information about the items and their seller.',
            'To be able to post items on our website, you need to be a registered user. Upon selecting the Sell category in the main menu, you will be taken to a page where you can select the type of product you want to sell. After the selection a pop-up window distinct for each category will appear. Fill the necessary fields, refer to the help hover-on icons for details on how to fill the information correctly. The next step is the overview and the confirmation.',
            'In the current prototype of the application, right after placing an order, you will be able to preview your order and rate the seller for each item you have ordered.',
            'Depending on the method of shipment there are 2 available choices. Standard delivery, which is 150 MKD and fast delivery which is 250 MKD',
            'Depending on the chosen method of shipment, with standard delivery the estimate is 3- business days, with fast delivery 1-2 business days ',
          ];


          const toggleQuestion = (index) => {
            if (index === activeIndex) {
              setActiveIndex(null);
            } else {
              setActiveIndex(index);
            }
          };

          return (
            <div className="wrapper">
              <style>{styles}</style>
              <div className="content">
                <div className="card text-center">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    {questions.map((question, index) => (
                      <div key={index}>
                        <h5
                          className={`faq-page ${activeIndex === index ? 'active' : ''}`}
                          onClick={() => toggleQuestion(index)}
                        >
                          {question}
                          <span className="arrow-icon">{activeIndex === index ? '▲' : '▼'}</span>
                        </h5>
                        {activeIndex === index && (
                          <div className="faq-body">
                            <p>{answers[index]}</p>
                          </div>
                        )}
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
};

export default Help;