import React from 'react'
import { NavLink } from 'react-router-dom';
import MyProductList from './MyProductList';

const MyProductsPage = () => (
    <div className='row' style={{margin: 'auto', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
       <h5 style={{textAlign: 'center'}}>My Products</h5>
        <div className='col-3'>
        <NavLink  style={{margin: '5px'}} className="btn btn-dark" to={`/add`}> Add New Product</NavLink>
        </div>
        <MyProductList />
    </div>
);

export default MyProductsPage;
