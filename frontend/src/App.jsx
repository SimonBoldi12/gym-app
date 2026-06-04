import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MembersProvider from './contexts/MembersProvider'
import MemberListPage from './pages/member-list-page/MemberListPage'
import MemberFormPage from './pages/member-form-page/MemberFormPage'
import MemberDetailPage from './pages/member-details-page/MemberDetailPage'
import StatsDashboardPage from './pages/stats-dashboard-page/StatsDashboardPage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
      <MembersProvider>
        <Routes>
          <Route path="/" element={<MemberListPage />} />
          <Route path="/members/new" element={<MemberFormPage />} />
          <Route path="/members/:id" element={<MemberDetailPage />} />
          <Route path="/members/:id/edit" element={<MemberFormPage />} />
          <Route path="/stats" element={<StatsDashboardPage />} />
        </Routes>
      </MembersProvider>
  )
}

export default App
