import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, FormControl, FormLabel, OverlayTrigger, Tooltip  } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { GetProductSubcategories, GetProductSizes, GetProductConditions, GetProductSex } from '../services/products';
import { CompactPicker } from 'react-color';
import "./styles/ProductEdit.css"

const ProductEdit = ({ product, onSave, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const sizes = useSelector((state) => state.productsSlice.productSizes);
  const subcategories = useSelector((state) => state.productsSlice.productSubcategories);
  const conditions = useSelector((state) => state.productsSlice.productConditions);
  const sex = useSelector((state) => state.productsSlice.productSex);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const dispatch = useDispatch();
  const handleSave = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmSave = () => {
    setShowConfirmationModal(false);
    onSave(editedProduct);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  useEffect(() => {
    const fetchProductConditions = async () => {
      try {
        GetProductConditions(dispatch);
      } catch (error) {
        console.error('Error fetching product Conditions:', error);
      }
    };

    const fetchProductSizes = async () => {
      try {
        GetProductSizes(dispatch);
      } catch (error) {
        console.error('Error fetching product sizes:', error);
      }
    };

    const fetchProductSubcategories = async () => {
      try {
        GetProductSubcategories(dispatch);
      } catch (error) {
        console.error('Error fetching product subcategories:', error);
      }
    };

    
    const fetchProductSex = async () => {
      try {
        GetProductSex(dispatch);
      } catch (error) {
        console.error('Error fetching product Sex:', error);
      }
    };

    fetchProductSubcategories();
    fetchProductSizes();
    fetchProductConditions();
    fetchProductSex();
  }, [dispatch]);

  const handleColorChange = (selectedColor) => {
    setEditedProduct({ ...editedProduct, productColor: selectedColor.hex });
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

 

  return (
    <Modal show={true} onHide={onCancel} className="wider-modal">
      <style></style>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
        <Col md={6} className="px-5 py-2">
        <Row className="input-field">
            <Col>
              <FormLabel>Product Type</FormLabel>
              <Form.Control type="text" name="productType" value={editedProduct.productType} disabled />
            </Col>
          </Row>

          <Row className="input-field">
            <Col>
              <FormLabel>Product Name</FormLabel>
              <FormControl
                type="text"
                name="productName"
                value={editedProduct.productName}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row className="input-field">
            <Col>
              <FormLabel>Product Description</FormLabel>
              <FormControl
                type="text"
                name="productDescription"
                value={editedProduct.productDescription}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row className="input-field">
                <Col>
                  <FormLabel>Product Sex</FormLabel>
                  <Form.Select
                    name="productSex"
                    value={editedProduct.productSex}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Sex</option>
                    {sex.map((sex) => (
                      <option key={sex} value={sex}>
                        {sex}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Row className="input-field">
                <Col>
                  <FormLabel>Product Condition</FormLabel>
                  <Form.Select
                    name="productCondition"
                    value={editedProduct.productCondition}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Product Condition</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

          <Row className="input-field">
            <Col>
              <FormLabel>Product Brand</FormLabel>
              <FormControl
                type="text"
                name="productImage"
                value={editedProduct.productBrand}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          </Col>
          <Col md={6} className="px-5 py-2">
          <Row className="input-field">
            <Col>
              <FormLabel>Color
              <OverlayTrigger
                 placement="right"
                 overlay={<Tooltip id="color-tooltip">Choose the most dominant color of your product</Tooltip>}
               >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px' }}>?</span>
               </OverlayTrigger>
              </FormLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: editedProduct.productColor,
                    marginRight: '10px',
                    border: '1px solid black',
                  }}
                />
                <Button variant="dark" onClick={() => setShowColorPicker(true)}>Product Color</Button>
              </div>
              {showColorPicker && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="danger" onClick={handleCloseColorPicker}>
                      X
                    </Button>
                  </div>
                  <CompactPicker color={editedProduct.productColor} onChange={handleColorChange} />
                </div>
              )}
            </Col>
          </Row>


          <Row className="input-field">
            <Col>
              <FormLabel>Product Image</FormLabel>
              <FormControl
                type="text"
                name="productImage"
                value={editedProduct.productImage}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          {editedProduct.productType === 'Clothes' && (
            <>
              
          <Row className="input-field">
                <Col>
                  <FormLabel>Product Size</FormLabel>
                  <Form.Select
                    name="productSize"
                    value={editedProduct.productSize}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Size</option>
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              
          <Row className="input-field">
                <Col>
                  <FormLabel>Product Subcategory</FormLabel>
                  <Form.Select
                    name="productSubcategory"
                    value={editedProduct.productSubcategory}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </>
          )}

          {editedProduct.productType === 'Shoes' && (
            
          <Row className="input-field">
              <Col>
                <FormLabel>Size number</FormLabel>
                <FormControl
                  type="number"
                  name="productSizeNumber"
                  value={editedProduct.productSizeNumber}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
          )}

          
        <Row className="input-field">
            <Col>
              <FormLabel>Product Measurements
              <OverlayTrigger
                 placement="right"
                 overlay={<Tooltip id="color-tooltip">Enter detailed measurements for the product in cm</Tooltip>}
               >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px' }}>?</span>
               </OverlayTrigger>
              </FormLabel>
              <FormControl
                type="text"
                name="productMeasurements"
                value={editedProduct.productMeasurements}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row className="input-field">
            <Col>
              <FormLabel>Product Material</FormLabel>
              <FormControl
                type="text"
                name="productMaterial"
                value={editedProduct.productMaterial}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
       
        <Row className="input-field">
        <Col>
          <FormLabel>Price (MKD)</FormLabel>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControl
              type="number"
              name="productPrice"
              value={editedProduct.productPrice}
              onChange={handleInputChange}
            />
          </div>
        </Col>
      </Row>
      </Col>
      </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="dark"onClick={() => setShowConfirmationModal(true)}>
          Save
        </Button>
      </Modal.Footer>

      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to save the changes?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleConfirmSave}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Modal>
    
    
  );
};

export default ProductEdit;
