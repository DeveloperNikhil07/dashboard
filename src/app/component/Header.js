"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Header({ AsidebarToggleHandle }) {

  const [ShowUserProfileCard, setShowUserProfileCard] = useState(false)
  const ShowUserProfileCardHandle = () => {
    setTimeout(() => {
      setShowUserProfileCard((prev) => !prev)
    }, 100);
  }

  return (
    <header className='header-wrapper'>
      <div className="container-fluid">
        <div className="row">
          <div className="header-item d-flex flex-wrap align-items-center justify-content-between justify-content-md-end  justify-content-lg-between">
            {/* Header Search bar */}
            <div className='toggle-btn p-1 d-block d-md-none' onClick={AsidebarToggleHandle}>
              <Image src="/assets/images/menu.png" alt="Icon" priority height={24} width={24} />
            </div>
            <div className="header-search-bar d-none d-lg-block">
              <label htmlFor="search_bar"><i className='fa fa-search'></i></label>
              <input type="text" className='search-bar' id='search_bar' placeholder='Type to search...' />
            </div>
            {/* End */}

            {/* Header Profile */}
            <div className="header-profile d-flex align-items-center">
              <div className="header-alert-item">
                <ul className='d-flex align-items-center'>
                  <li><Image src="/assets/images/bell.png" alt="Icon" priority height={18} width={18} /></li>
                  <li><Image src="/assets/images/chat.png" alt="Icon" priority height={18} width={18} /></li>
                </ul>
              </div>
              <div className="user-profile" onClick={ShowUserProfileCardHandle} onBlur={() => setTimeout(() => setShowUserProfileCard(false), 100)}>
                <div className="user-title d-flex align-items-center gap-3">
                  <div className="username d-none d-md-block">
                    <h6>John Doe</h6>
                    <p>Designer</p>
                  </div>
                  <div className="user-profile-img">
                    <Image src="/assets/images/user.webp" alt='User Profile' height={48} width={48} priority />
                  </div>
                  <i className={`fa ${ShowUserProfileCard ? "fa-angle-up" : "fa-angle-down"}`}></i>
                </div>
                {/* Profile Card open */}
                {ShowUserProfileCard && (
                  <div className="user-profile-card">
                    <ul>
                      <li><Image src="/assets/images/people.png" alt="Icon" priority height={18} width={18} /><Link href="#">My Profile</Link></li>
                      <li><Image src="/assets/images/profile.png" alt="Icon" priority height={18} width={18} /><Link href="#">Account Settings</Link></li>
                    </ul>
                    <div className="logout-btn d-flex align-items-center">
                      <Image src="/assets/images/logout.png" alt="Icon" priority height={18} width={18} /><Link href="#">Log out</Link>
                    </div>
                  </div>
                )}
                {/* End */}
              </div>
            </div>
            {/* End */}
          </div>
        </div>
      </div>
    </header>
  )
}
