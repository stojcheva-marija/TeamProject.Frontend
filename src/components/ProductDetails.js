import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddToCart, GetProduct, AddToFavourites, AddToRented } from '../services/products';
import { Nav, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToRented, setSelectedFilters } from '../app/productsSlice';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faTruckFast, faRotateLeft, faBox, faArrowLeft  } from '@fortawesome/free-solid-svg-icons';
import "./styles/ProductDetails.css"

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.authenticationSlice.email);
  const isLoggedIn = useSelector(state => state.authenticationSlice.isLoggedIn);
  const location = useLocation();


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await GetProduct(productId);
        setProduct(productDetails);
      } catch (error) {
        // Handle error
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBreadCrumbs = (type, sex, subcategory) => {

    dispatch(setSelectedFilters({ type, sex, subcategory }));
    navigate('/products');
  };

  const renderStars = (rating) => {
    const filledStars = '★'.repeat(Math.floor(rating));
    const emptyStars = '☆'.repeat(5 - Math.floor(rating));

    return (
      <span className="stars">
        <span className="filled-stars">{filledStars}</span>
        <span className="empty-stars">{emptyStars}</span>
      </span>
    );
  };

  const splitCamelCase = (text) => {
    return text
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleAddToFavorites = () => {
    if (!isLoggedIn) {
      // Redirect to signin page and store the current location
      navigate('/signin', { state: { from: location } });
    } else {
      // Add item to favorites
      AddToFavourites(dispatch, product, email);
    }
  };

  const handleAddToRented = () => {
    if (!isLoggedIn) {
      // Redirect to signin page and store the current location
      navigate('/signin', { state: { from: location } });
    } else {
      // Add item to favorites
      AddToRented(dispatch, product, email);
    }
  };

  

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // Redirect to signin page and store the current location
      navigate('/signin', { state: { from: location } });
    } else {
      // Add item to cart
      AddToCart(dispatch, product, email);
    }
  };



  const displayCondition = splitCamelCase(product.productCondition);


  return (
    <div className="container mt-5 mb-5 main-container">
  <div class="container d-flex mt-4"> 
   <nav aria-label="breadcrumb " class="first  d-md-flex">
    <ol class="breadcrumb indigo mb-5">
        <li class="breadcrumb-item">
        <Nav.Link href="#" 
                      className='black-text active-2'
                        style={{ color: '#000000', paddingLeft: '60px' }}
                        onClick={() => handleBreadCrumbs('', '', '')}
                      >
                       Buy
          </Nav.Link>
        </li>
      {product.productSex && (
        <li class="breadcrumb-item">
          <div class="breadcrumb-item-content">
          <img
            class="mr-md-3 mr-1"
            src="https://img.icons8.com/metro/50/000000/chevron-right.png"
            width="20"
            height="20"
          />
          <Nav.Link href="#" 
                      className='black-text active-2'
                        style={{ color: '#000000', paddingLeft: '60px' }}
                        onClick={() => handleBreadCrumbs('', product.productSex, '')}
                      >
                       {product.productSex}
          </Nav.Link>
          </div>
        </li>
      )}
      {product.productType && (
        <li class="breadcrumb-item">
          <div class="breadcrumb-item-content">
          <img
            class="mr-md-3 mr-1"
            src="https://img.icons8.com/metro/50/000000/chevron-right.png"
            width="20"
            height="20"
          />
       
          <Nav.Link href="#" 
                        className='black-text active-2'
                        style={{ color: '#000000', paddingLeft: '60px' }}
                        onClick={() => handleBreadCrumbs(product.productType, product.productSex, '')}
                      >
                       {product.productType}
          </Nav.Link>
          </div>
        </li>

      )}
      {product.productSubcategory && (
        <li class="breadcrumb-item">
                    <div class="breadcrumb-item-content">
            <img
            class="mr-md-3 mr-1"
            src="https://img.icons8.com/metro/50/000000/chevron-right.png"
            width="20"
            height="20"
          />
          <Nav.Link href="#" 
                        className='black-text active-2'
                        style={{ color: '#000000', paddingLeft: '60px' }}
                        onClick={() => handleBreadCrumbs(product.productType, product.productSex, product.productSubcategory)}
                      >
                       {product.productSubcategory}
          </Nav.Link>
          </div>
        </li>
      )}
        <li class="breadcrumb-item">
                    <div class="breadcrumb-item-content">
            <img
            class="mr-md-3 mr-1"
            src="https://img.icons8.com/metro/50/000000/chevron-right.png"
            width="20"
            height="20"
          />
          <Nav.Link href="#" 
                        className='black-text active-2'
                        style={{ color: '#000000', paddingLeft: '60px' }}
                      >
                       {product.productName}
          </Nav.Link>
          </div>
        </li>
    </ol>
  </nav>
</div>
      <div className="row p-3">
      <div className="col-md-6">
        <div className="card">
          <div className="images">
            <div className="text-center">
              <img
                src={product.productImage}
                alt="Product Image"
                style={{
                  width: '100%',            
                  objectFit: 'contain',       
                  display: 'block',           
                  margin: 'auto', 

                }}
              />
            </div>
          </div>
        </div>
      </div>
        <div className="col-md-6">
          <div className="product p-4">
          <div className="px-5">
            <div className='col-5 pl-0'>
             <Button className="btn btn-dark" onClick={() => handleBreadCrumbs(product.productType, product.productSex, product.productSubcategory)} style={{color: 'white', textDecoration: 'none', display: 'block'}}><FontAwesomeIcon icon={faArrowLeft} />Back to shopping</Button>
            </div>
            <div className="mt-4 mb-3">
              <span className="text-uppercase text-muted brand">{product.productBrand}</span>
              <h5 className="text-uppercase">{product.productName}</h5>
              <div className="price d-flex flex-row align-items-center">
                <span className="act-price">{product.productPrice} MKD</span>
              </div>
            </div>

            {product.productDescription && (            
              <p className="about">
              {product.productDescription}
            </p>)}
            <div className="sizes mt-3">
              <h6 className="text-uppercase">
              {product.productSize !== null && product.productType === 'Clothes' ? (
                  `Size: ${product.productSize}`
              ) : (
              product.productSizeNumber !== 0 && product.productType === 'Shoes' ? (
              `Size Number: ${product.productSizeNumber}`
              ) : null
             )}
              </h6>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className='mr-3'> Color</span> <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: product.productColor,
                  marginRight: '20px',
                  border: '1px solid black',
                }}
              />
            </div>
            {product.productAvailablity ? (
            <>
              <div className=' my-3'>
              <button className="btn btn-dark mr-2 px-4" onClick={handleAddToCart}>
                Add to cart
              </button>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip><span>Add to Favourites</span></Tooltip>}
              >
                <span onClick={handleAddToFavorites} style={{ cursor: 'pointer' }}>
                  <i className="fa fa-heart"></i>
                </span>
                
              </OverlayTrigger>
              <span onClick={handleAddToRented} style={{ cursor: 'pointer' }}>
                  <i className="fa fa-heart"></i>
                </span>
              </div>
            </>

          ) : (
            <div className="text-danger font-weight-bold my-3">This product is not currently available</div>
          )}
            </div>

      <section className="py-2 my-4">
      <div className="container">
        <div className="row gx-4">
          <div className="col-lg-12 mb-4">
            <div className="border rounded-2 px-3 py-2" style={{backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
          
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <a className="nav-link active" id="ex1-tab-1" data-bs-toggle="pill" href="#ex1-pills-1" role="tab" aria-controls="ex1-pills-1" aria-selected="true">Specification</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link" id="ex1-tab-2" data-bs-toggle="pill" href="#ex1-pills-2" role="tab" aria-controls="ex1-pills-2" aria-selected="false">Return Policy</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link" id="ex1-tab-3" data-bs-toggle="pill" href="#ex1-pills-3" role="tab" aria-controls="ex1-pills-3" aria-selected="false">Shipping info</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link" id="ex1-tab-4" data-bs-toggle="pill" href="#ex1-pills-4" role="tab" aria-controls="ex1-pills-4" aria-selected="false">Seller profile</a>
            </li>
          </ul>

          <hr/>

              <div className="tab-content" id="ex1-content">
                <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
              
                <table class="table table-striped">
        <tbody>
       <tr>
       <td>Product Type</td>
        <td>{product.productType}</td>
      </tr>
      {product.productSubcategory &&
      (
        <tr>
        <td>Product Subcategory</td>
        <td>{product.productSubcategory}</td>
      </tr>
      )
      }
      {product.productBrand &&
      (
        <tr>
        <td>Product Brand</td>
        <td>{product.productBrand}</td>
      </tr>
      )
      }
      {product.productType === 'Clothes' &&
      (
        <tr>
        <td>Product Size</td>
        <td>{product.productSize}</td>
      </tr>
      )
      }
      {product.productType === 'Shoes' &&
      (
        <tr>
        <td>Product Size Number</td>
        <td>{product.productSize}</td>
      </tr>
      )
      }
      {product.productMeasurements &&
      (
        <tr>
        <td>Product Measurements</td>
        <td>{product.productMeasurements}</td>
      </tr>
      )
      }
      {product.productMaterial &&
      (
        <tr>
        <td>Product Material</td>
        <td>{product.productMaterial}</td>
      </tr>
      )
      }
      <tr>
        <td>Product Condition</td>
        <td>{displayCondition}</td>
      </tr>
  </tbody>
</table>

                </div>
                <div className="tab-pane fade m-4" id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                  <p className='font-weight-bold'><FontAwesomeIcon icon={faRotateLeft} /> We have 28-day Returns Policy </p>
                  <p className='font-weight-normal' > <FontAwesomeIcon icon={faBox} /> Return through your local post office <br/> You will find a label on your return parcel</p>
                  <p className='text-secondary'> For more information feel free to contanct us </p>

                </div>
                <div className="tab-pane fade" id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                  
                <div class="delivery my-4">
                <div className='m-3 d-flex justify-content-between'>
               <div>
                 <p className="font-weight-bold mb-0"><FontAwesomeIcon icon={faTruck} /> <b>Regular Delivery</b></p>
                 <p className='text-secondary'>3-6 business days</p>
                 </div>
               <p className='font-weight-bold'>150 MKD</p>
                 </div>

                <div className='m-3 d-flex justify-content-between'>
               <div>
                 <p className="font-weight-bold mb-0"><FontAwesomeIcon icon={faTruckFast} /> <b>Fast Delivery</b></p>
                 <p className='text-secondary'>1-2 business days</p>
                 </div>
               <p className='font-weight-bold'>250 MKD</p>
                 </div>
                </div>
                </div>
                <div className="tab-pane fade m-4" id="ex1-pills-4" role="tabpanel" aria-labelledby="ex1-tab-4">
                  <p className='font-weight-bold'>Posted by {product.username}</p>
                  <p  style={{ color: '#000000' }}>
              Seller Rating {renderStars(product.userRating)}
            </p>
            <NavLink  className="btn btn-dark" to={email === product.email ? `/myProfile` : `/profile/${product.username}`}>View Profile</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
