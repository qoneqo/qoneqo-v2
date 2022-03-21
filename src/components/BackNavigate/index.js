import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const BackNavigate = ({to}) => {
  return (
    <Link to={to}>
      <AiOutlineArrowLeft 
        className={`inline-block cursor-pointer text-unhover hover:text-hover`}
      />
    </Link>
  )
}

export default BackNavigate