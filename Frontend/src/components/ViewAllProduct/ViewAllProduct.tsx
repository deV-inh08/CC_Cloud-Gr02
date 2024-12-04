import React from 'react'
import { Link } from 'react-router-dom'
import { paths } from '../../constants/paths'

const ViewAllProduct = () => {
  return (
    <Link to={paths.home} className=' mx-auto bg-primaryColor text-white px-9 py-4 rounded-md'>
      View All Products
    </Link>
  )
}

export default ViewAllProduct