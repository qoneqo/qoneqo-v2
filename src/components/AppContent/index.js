import React from 'react'
import {Outlet} from 'react-router-dom';

const AppContent = () => {
  return (
    <>
      <main className="p-5 min-h-screen">
        <Outlet />
      </main>
    </>
  )
}

export default AppContent
