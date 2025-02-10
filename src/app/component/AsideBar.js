"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link'
import { useState } from 'react';

export default function AsideBar({ AsidebarToggleHandle }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleSubMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the submenu for the clicked item
  };


  return (
    <>
      <aside className='asidebar-wrapp'>
        <div className="asidebar-logo d-flex align-items-center justify-content-between">
          <Link href="/">Logo</Link>
          <div className='close-toggle-btn d-block d-md-none' onClick={AsidebarToggleHandle}>
            <Image src="/assets/images/logout.png" alt="Icon" priority height={24} width={24} />
          </div>
        </div>
        <nav className="asidebar-nav">
          <div className='menu-title'><h6>MENU</h6></div>
          <ul>
            <li className='active'>
              <Link href="#"><span><Image src="/assets/images/dashboard.png" alt='Icon' priority height={18} width={18} />Dashboard</span></Link>
            </li>
            <li>
              <Link href="#"><span><Image src="/assets/images/calendar.png" alt='Icon' priority height={18} width={18} />Calender</span></Link>
            </li>
            <li>
              <Link href="#"><span><Image src="/assets/images/people.png" alt='Icon' priority height={18} width={18} />Profile</span></Link>
            </li>
            <li>
              <Link href="#" onClick={() => toggleSubMenu(0)}><span><Image src="/assets/images/table.png" alt='Icon' priority height={18} width={18} />Tables</span><i className={`fa ${activeIndex === 0 ? "fa-angle-up" : "fa-angle-down"}`}></i></Link>
              {activeIndex === 0 && (
                <span className='submenu'>
                  <ul className='submenu-item'>
                    <li><Link href="#">Table</Link></li>
                  </ul>
                </span>
              )}
            </li>
            <li>
              <Link href="#" onClick={() => toggleSubMenu(1)}><span><Image src="/assets/images/contact-form.png" alt='Icon' priority height={18} width={18} />Pages</span><i className={`fa fa-angle-down ${activeIndex === 1 ? "fa-angle-up" : "fa-angle-down"}`}></i></Link>

              {activeIndex === 1 && (
                <span className='submenu'>
                  <ul className='submenu-item'>
                    <li><Link href="">Setting</Link></li>
                  </ul>
                </span>
              )}
            </li>
          </ul>
          <div className='menu-title mt-4'><h6>SUPPORT</h6></div>
          <ul>
            <li className=''>
              <Link href="#"><span><Image src="/assets/images/chat.png" alt='Icon' priority height={18} width={18} />Message</span></Link>
            </li>
          </ul>
          <div className='menu-title mt-4'><h6>OTHERS</h6></div>
          <ul>
            <li>
              <Link href="#" onClick={() => toggleSubMenu(3)}><span><Image src="/assets/images/logout.png" alt='Icon' priority height={18} width={18} />Authentication</span><i className={`fa ${activeIndex === 3 ? "fa-angle-up" : "fa-angle-down"}`}></i></Link>
              {activeIndex === 3 && (
                <span className='submenu'>
                  <ul className='submenu-item'>
                    <li><Link href="/login">Log In</Link></li>
                    <li><Link href="/usersignup">Sign Up</Link></li>
                    <li><Link href="/forgetpassword">Forget Password</Link></li>
                  </ul>
                </span>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
