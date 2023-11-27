import { useState, useEffect } from 'react';
import { Form, Row, Col, Button, FormControl, FormLabel } from 'react-bootstrap';
import { useDispatch ,useSelector} from 'react-redux';
import { DeleteProduct, NewProduct, EditProduct, GetProductTypes } from '../services/products';
import * as React from "react"

export default ({ product, setIsEditing }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [sizeNumber, setSizeNumber] = useState(0);
  const [isNewProduct, setIsNewProduct] = useState(true);
  const [selectedProductType, setSelectedProductType] = useState('');

  const dispatch = useDispatch();

  const types = useSelector(state => state.productsSlice.productTypes);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        GetProductTypes(dispatch);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProductTypes();

    if (product !== undefined) {
      setIsNewProduct(false);
      setName(product.productName);
      setSelectedProductType(product.productType);
    } else {
      setIsNewProduct(true);
    }
  }, [product, dispatch]);

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (isNewProduct) {
          NewProduct(dispatch, { productType: selectedProductType, productColor: color, productSizeNumber: sizeNumber, productName: name });
        } else {
          EditProduct(dispatch, { id: product.id, productType: selectedProductType, productColor: color, productSizeNumber: sizeNumber, productName: name });
          setIsEditing(false);
        }
      }}
    >
      <Row>
        <Col>
          <FormLabel>Type</FormLabel>
          {types ? (
            <select
              name="productType"
              value={selectedProductType}
              onChange={(event) => setSelectedProductType(event.target.value)}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          ) : (
            <p>Loading product types...</p>
          )}
        </Col>
        <Col>
          <FormLabel>Color</FormLabel>
          <FormControl
            type="text"
            placeholder={color}
            onChange={(event) => setColor(event.target.value)}
          />
        </Col>
        <Col>
          <FormLabel>Size number</FormLabel>
          <FormControl
            type="number"
            placeholder={sizeNumber}
            onChange={(event) => setSizeNumber(event.target.value)}
          />
        </Col>
        <Col>
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            placeholder={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Col>
        <Col>
          <div>
            {isNewProduct ? (
              <Button variant="primary" type="submit">
                Add
              </Button>
            ) : (
              <div>
                <Button variant="warning" onClick={() => DeleteProduct(dispatch, product)}>
                  Delete
                </Button>
                <Button variant="success" type="submit">
                  Save
                </Button>
                <Button variant="default" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Form>
  );
};
