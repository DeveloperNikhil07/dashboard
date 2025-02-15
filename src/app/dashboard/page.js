import React from 'react'
import DashboardCards from '../component/DashboardCards'
import DoughnutChart from '../component/DoughnutChart'

export default function DashboardPage() {
  return (
    <>
      <section className="dashboard-wrapper">
        <div className="container-fluid">
          <div className="row">
            <DashboardCards />
            <DoughnutChart/>
          </div>
        </div>
      </section>
    </>
  )
}
