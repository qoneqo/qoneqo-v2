import React from 'react'
import {Outlet} from 'react-router-dom';

const WebContent = () => {
  return (
    <>    
      <section className="web-content bg-white">
        <Outlet />
      </section>
    </>
  )
}

export default WebContent
