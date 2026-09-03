'use client'

import { useState } from 'react'
import Header from '@/components/Dashboard/Header'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '800px', minHeight: '80vh' }}>
      <Header title="Hubungi Kami (Contact Us)" />
      
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2.5rem',
        marginTop: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
      }}>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Punya pertanyaan seputar website, saran fitur baru, atau pertanyaan terkait kemitraan / periklanan? Silakan kirimkan pesan Anda melalui formulir di bawah ini.
        </p>

        {submitted ? (
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '8px',
            padding: '1.5rem',
            textAlign: 'center',
            color: '#4ade80'
          }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Pesan Terkirim!</h4>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Terima kasih telah menghubungi kami. Kami akan merespon pesan Anda sesegera mungkin.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#fff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Nama Lengkap
              </label>
              <input 
                type="text" 
                required 
                placeholder="Masukkan nama Anda..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#fff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Alamat Email
              </label>
              <input 
                type="email" 
                required 
                placeholder="nama@email.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#fff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Subjek Pesan
              </label>
              <input 
                type="text" 
                required 
                placeholder="Misal: Pertanyaan Iklan / Bug Report"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#fff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Isi Pesan
              </label>
              <textarea 
                required 
                rows={5}
                placeholder="Tuliskan pesan atau pertanyaan Anda secara rinci..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <button 
              type="submit"
              style={{
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                padding: '0.85rem 2rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
                width: 'max-content'
              }}
            >
              Kirim Pesan
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
