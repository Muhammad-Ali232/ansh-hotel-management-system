import React from 'react'
import { Link } from 'react-router-dom'

function AdminFooter() {
  return (

  <div className="py-6 px-6 text-center">
    <p className="mb-0 fs-4">Design and Developed by <Link to='/' target="_blank" class="pe-5 text-primary "> ANSH Builders.</Link></p>
  </div>


  )
}

export default AdminFooter