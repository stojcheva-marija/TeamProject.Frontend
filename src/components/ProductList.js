import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProducts, GetProductConditions, GetProductSizes,AddToCart, AddToFavourites } from '../services/products';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import { CompactPicker } from 'react-color';
import { setSelectedFilters } from '../app/productsSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productsSlice.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [sortByPrice, setSortByPrice] = useState('');
  const [sortByUserRating, setSortByUserRating] = useState('');
  const sizes = useSelector((state) => state.productsSlice.productSizes);
  const conditions = useSelector((state) => state.productsSlice.productConditions);
  const [selectedColor, setSelectedColor] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const selectedType = useSelector(state => state.productsSlice.selectedType);
  const selectedSex = useSelector(state => state.productsSlice.selectedSex);
  const selectedSubcategory = useSelector(state => state.productsSlice.selectedSubcategory);
  const isClothesType = selectedType === 'Clothes';
  const isShoesType = selectedType === 'Shoes';
  const [shoeNumberRange, setShoeNumberRange] = useState([22,45]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3; //change this later to 9
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  
  const handleRemoveFilters = () => {
    // Reset all the filter states to their initial values
    setSearchTerm('');
    setSizeFilter('');
    setConditionFilter('');
    setSortByPrice('');
    setSortByUserRating('');
    setSelectedColor('');
    setSelectedColor('');
    setShowColorPicker(false);
    setShoeNumberRange([22, 45]);
    fetchProductsForRemoveFilters();

  };

 
  useEffect(() => {

    const fetchProductSizes = async () => {
      try {
        GetProductSizes(dispatch);
      } catch (error) {
        console.error('Error fetching product sizes:', error);
      }
    };

    const fetchProductConditions = async () => {
      try {
        GetProductConditions(dispatch);
      } catch (error) {
        console.error('Error fetching product Conditions:', error);
      }
    };

const fetchData = async () => {
      try {
        await Promise.all([fetchProductSizes(), fetchProductConditions(),   fetchProducts()]);
        setIsLoading(false); // ako projde promise staj false
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();

  }, [dispatch, selectedType, selectedSex, selectedSubcategory, sortByPrice, sortByUserRating, searchTerm]);


  const handleColorChange = (selectedColor) => {
    setSelectedColor(selectedColor.hex);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const handleBreadCrumbs = (type, sex, subcategory) => {

    dispatch(setSelectedFilters({ type, sex, subcategory }));
    navigate('/products');
  };

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    setCurrentItems(products.slice(newOffset, newOffset + itemsPerPage));
  };

  const fetchProducts = async () => {
    try {
      const data = await GetProducts(dispatch, selectedType, selectedSex, selectedSubcategory, searchTerm, selectedColor, sizeFilter, conditionFilter, sortByPrice, sortByUserRating, shoeNumberRange);
      setPageCount(Math.ceil(data.length / itemsPerPage));
      setCurrentItems(data.slice(itemOffset, itemOffset + itemsPerPage));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  
  const fetchProductsForRemoveFilters = async () => {
    try {
      const data = await GetProducts(dispatch, selectedType, selectedSex, selectedSubcategory, '', '', '', '', '', '', [22, 45]);
      setPageCount(Math.ceil(data.length / itemsPerPage));
      setCurrentItems(data.slice(itemOffset, itemOffset + itemsPerPage));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };



  const styles = `

.breadcrumb>li+li:before {
    content: "" !important;
}

.breadcrumb {
  padding: 25px;
  font-size: 14px;
  color: #aaa !important;
  letter-spacing: 2px;
  border-radius: 5px !important;
}

a {
    text-decoration: none !important;
}

a:focus,
a:active {
    outline: none !important;
    box-shadow: none !important;
}

img {
    vertical-align: bottom;
}

.first span {
    color: black;
}

.breadcrumb-item-content {
  display: flex;
  align-items: center;
}

.active-1  , .active-2{
    font-size: 13px !important;
    padding-bottom: 12px !important;
    padding-top: 12px !important;
    padding-right: 25px !important;
    padding-left: 25px !important;
    border-radius: 200px !important;
    background-color: #C2A4C8  !important;
    color: black;
}



#sidebar {
  width: 100%;
  min-height: 30vh; /* Set the minimum height to cover the entire viewport height */
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center; /* Align content at the top */
  align-items: center; /* Center horizontally */
  margin: 10px;
}

/* Additional styling for the content within the sidebar */
#sidebar-content {
  width: 100%;
  max-width: 80%; 
}\

#sidebar-content .row {
  margin-bottom: 15px;
}

#sidebar-content button {
  background-color: black !important;
  color: white !important;
}

.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}

/* Styles for individual page item */
.page-item {
  margin: 0 5px;
}

/* Styles for page links */
.page-link {
  background-color: black;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

/* Styles for active page */
.page-item.active .page-link {
  background-color: white;
  color: black;
}

/* Styles for disabled page */
.page-item.disabled .page-link {
  color: gray;
  pointer-events: none;
}

/* Styles for previous and next links */
.page-item.previous .page-link,
.page-item.next .page-link {
  background-color: black;
  color: white;
}

/* Styles for previous and next icons */
.page-item.previous .page-link::before,
.page-item.next .page-link::before {
  content: "\\2039"; /* Unicode for left-pointing arrow (‹) and right-pointing arrow (›) */
  font-size: 14px;
}

.page-item.next .page-link::before {
  content: "\\203A";
}
.main-container {
  background-color: rgba(255, 255, 255, 0.7); /* White background with 70% opacity */
  padding: 20px; /* Add padding for spacing */
}

`;

  return (
    <div className="main-container">
      {isLoading ? ( // Display loading animation when loading is true
        <div className="loading-animation">Loading...</div>
      ) : (
        // Load the page when loading is false
        <div>
       <style>{styles}</style>
      <div class="container d-flex justify-content-left mt-4"> 
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
      {selectedSex && (
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
                        onClick={() => handleBreadCrumbs('', selectedSex, '')}
                      >
                       {selectedSex}
          </Nav.Link>
          </div>
        </li>
      )}
      {selectedType && (
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
                        onClick={() => handleBreadCrumbs(selectedType, selectedSex, '')}
                      >
                       {selectedType}
          </Nav.Link>
          </div>
        </li>

      )}
      {selectedSubcategory && (
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
                        onClick={() =>  handleBreadCrumbs(selectedType, selectedSex, selectedSubcategory)}
                      >
                       {selectedSubcategory}
          </Nav.Link>
          </div>
        </li>
      )}
    </ol>
  </nav>
</div>
    <div>
    <div className='container mb-4'>
    <Row>
  {/* Search and Sort Controls */}
  <Col>
            <FormControl
              as="select"
              value={sortByPrice}
              onChange={(event) => setSortByPrice(event.target.value)}
            >
              <option value="">Sort By Price</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </FormControl>
          </Col>
          <Col>
            <FormControl
              as="select"
              value={sortByUserRating}
              onChange={(event) => setSortByUserRating(event.target.value)}
            >
              <option value="">Sort By User Rating</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </FormControl>
          </Col>

          
  <Col>
            <FormControl
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
  </Col>
  <Col>
  <i className="fa fa-search"></i>
  </Col>
</Row>
    </div>
    <div className='container'>
    <Row>
      <Col md={3}>
    <section id="sidebar">
    <div id="sidebar-content">
        <h6 class="p-1 border-bottom">Filter By</h6>
        <Row>
      <Col>
        <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: selectedColor,
                  marginRight: '10px',
                  border: '1px solid black',
                }}
              />
              <Button onClick={() => setShowColorPicker(true)}>Color</Button>
            </div>
            {showColorPicker && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="danger" onClick={handleCloseColorPicker}>
                    X
                  </Button>
                </div>
                <CompactPicker color={selectedColor} onChange={handleColorChange} />
              </div>
            )}
            </div>
          </Col>
        </Row>

        {isClothesType && (
          <Row>
            <Col>
              <FormControl
                as="select"
                value={sizeFilter}
                onChange={(event) => setSizeFilter(event.target.value)}
              >
                <option value="">All Sizes</option>
                {sizes.map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </FormControl>
            </Col>
            </Row>
          )}

        {isShoesType && (
          <Row>
           <Col>
            {/* Slider for shoe numbers */}
            <div style={{ padding: '10px 0' }}>
              <p class="mb-2">Shoe Size Number Range: {shoeNumberRange[0]} - {shoeNumberRange[1]}</p>
              <Slider
                range
                min={15}
                max={55}
                value={shoeNumberRange}
                onChange={setShoeNumberRange}
              />
            </div>
          </Col>
          </Row>
           )}
          <Row>
          <Col>
            <FormControl
              as="select"
              value={conditionFilter}
              onChange={(event) => setConditionFilter(event.target.value)}
            >
              <option value="">All Conditions</option>
              {conditions.map(condition => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </FormControl>
          </Col>
          </Row>
          <Row>
          <Col>
            <Button onClick={() => fetchProducts()}>Apply Filters</Button>
          </Col>
          </Row>
          <Row>
        <Col>
          <Button onClick={handleRemoveFilters}>Remove Filters</Button>
        </Col>
          </Row>
    </div>
</section>
</Col>

<Col md={9}>
{/* Product Listing */}
        <Row style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', margin: '10px' }}>
        {currentItems.map(p => (
          <Col key={p.id} sm={4}>
            <ListRow product={p} />
          </Col>
        ))}
      </Row>
</Col>
</Row>
    </div>
    <Row>
          <Col md={12}>
            <ReactPaginate 
              pageCount={pageCount}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              activeClassName="active"
              previousClassName="page-item"
              nextClassName="page-item"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              breakClassName="page-item disabled"
              breakLinkClassName="page-link"
              disabledClassName="disabled"
            />
          </Col>
        </Row>
    </div>   
    </div>
   )}
</div>
  );
};


const ListRow = ({ product }) => {

  const email = useSelector((state) => state.authenticationSlice.email);
  const dispatch = useDispatch();

  const renderStars = (rating) => {
    const filledStars = '★'.repeat(Math.floor(rating));
    const emptyStars = '☆'.repeat(5 - Math.floor(rating));

    return (
      <div className="stars">
        <span className="filled-stars">{filledStars}</span>
        <span className="empty-stars">{emptyStars}</span>
      </div>
    );
  };

  const styles = `
  .content .card {
    width: 50rem;
    height: 15rem;
  }

    .card {
    flex-direction: row;
  }

  .card-img-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-top-right-radius: 0;
    border-bottom-left-radius: calc(0.25rem - 1px);
  }

  .card-img {
    width: auto;
    height: 100%;
    object-fit: cover;
  }

 .content .card .card-title {
    color: black;
    
  }

  .stars {
    font-size: 26px; 
    display: flex;
    align-items: center;
    justify-content: center;
  }

`;

  return (
    <div className="col">
    <style>{styles}</style>
    <div className="card mb-3" style={{ maxWidth: '540px', backgroundColor: '#C2A4C8', margin: '10px' }}>
      <div className="row no-gutters">
        <div className="col-md-5">
          <div className="card-img-container" style={{ paddingLeft:'15px', paddingTop:'3px', paddingBottom: '3px' }}>
            <img
              src={product.productImage}
              className="card-img img-fluid"
              alt="Image"
            />
          </div>
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h4 className="card-title text-center">{product.productName}</h4>
            <h6 className="card-title text-right">{product.productPrice} MKD</h6>
            <h5 className="card-text text-center" style={{ color: '#000000' }}>
              Seller Rating {renderStars(product.userRating)}
            </h5>
            <div className='text-center'>
             <div className="btn btn-dark">
               <NavLink variant='link' to={`/product/${product.id}`} style={{color: 'white', textDecoration: 'none', display: 'block'}}>View more</NavLink>
           </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};