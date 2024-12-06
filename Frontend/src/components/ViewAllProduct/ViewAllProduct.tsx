import React from 'react'
import { Link } from 'react-router-dom'
import { paths } from '../../constants/paths'

interface ViewAllProductType {
    size?: 'small' | 'large'; 
}

const ViewAllProduct = ({ size }: ViewAllProductType) => {
  const classes =
  size === 'large'
    ? 'mx-auto mt-6 bg-primaryColor text-gray-200 px-9 py-4 text-lg rounded-md hover:bg-primaryColor/70 transition-all'
    : 'bg-primaryColor text-gray-200 px-5 py-3 text-sm rounded hover:bg-primaryColor/70 transition-all';

return (
  <Link to={paths.products} className={classes}>
    View All Products
  </Link>
);
}

export default ViewAllProduct