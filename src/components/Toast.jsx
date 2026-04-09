import React from 'react'

export default function Toast({ message }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      padding: '12px 20px', borderRadius: 10,
      background: '#1a1e35', border: '1px solid #6c63ff',
      color: '#e8eaf6', fontSize: 13, fontFamily: 'inherit',
      boxShadow: '0 8px 32px rgba(0,0,0,.6)',
      animation: 'fadeIn .3s ease',
      maxWidth: 300,
    }}>
      {message}
    </div>
  )
}
