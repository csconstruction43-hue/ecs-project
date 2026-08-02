// src/pages/NotFoundPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

function NotFoundPage() {
  return (
    <>
    <Seo title="Page Not Found | ECSPrep" description="The page you were looking for could not be found. Head back to ECSPrep to continue your ECS test practice and revision." path="/404" noindex />
    <div style={{ 
      textAlign: 'center', 
      padding: '80px 20px',
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div>
        <h1 style={{ fontSize: '80px', color: '#f59e0b', marginBottom: '20px' }}>404</h1>
        <h2 style={{ fontSize: '28px', color: '#1f2937', marginBottom: '10px' }}>Page Not Found</h2>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link 
          to="/" 
          style={{
            background: '#f59e0b',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'inline-block',
            fontWeight: 'bold'
          }}
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
    </>
  )
}

export default NotFoundPage