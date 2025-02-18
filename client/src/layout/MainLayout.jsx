import Navbar from '@/components/navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div>
            <Outlet></Outlet>
        </div>
    </div>
  )
}

export default MainLayout;