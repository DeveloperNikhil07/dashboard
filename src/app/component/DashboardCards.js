import React from 'react'
import Image from 'next/image'

export default function DashboardCards() {
    return (
        <>
            <div className="dashboard-card col-12">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card-box">
                            <div className="card-header">
                                <div className="card-icon">
                                    <i className='fa-solid fa-user-plus'></i>
                                </div>
                                <div className="card-body">
                                    <div className="card-subtitle">
                                        <p>New User</p>
                                        <div className='d-flex align-items-end justify-content-between'>
                                            <h3>10</h3>
                                            <span className='card-badge online'>Online</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mt-4 mt-md-0">
                        <div className="card-box">
                            <div className="card-header">
                                <div className="card-icon">
                                    <i className="fa-solid fa-user"></i>
                                </div>
                                <div className="card-body">
                                    <div className="card-subtitle">
                                        <p>Login User</p>
                                        <div className='d-flex align-items-end justify-content-between'>
                                            <h3>10</h3>
                                            <span className='card-badge online'>Online</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mt-4 mt-lg-0">
                        <div className="card-box">
                            <div className="card-header">
                                <div className="card-icon">
                                    <i className="fa-solid fa-user-minus"></i>                                </div>
                                <div className="card-body">
                                    <div className="card-subtitle offline">
                                        <p>Offline User</p>
                                        <div className='d-flex align-items-end justify-content-between'>
                                            <h3>10</h3>
                                            <span className='card-badge offline'>Logout</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
