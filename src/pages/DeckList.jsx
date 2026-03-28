import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const ACCENT = '#6c63ff'
const TEAL = '#3ecfcf'

export default function DeckList() {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/decks/').then(res => {
      const data = res.data.results || res.data
      setDecks(data.filter(d => d.note_count > 0))
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🧬</div>
        <p style={{ color: '#444', letterSpacing: '2px', fontSize: '12px', textTransform: 'uppercase' }}>Loading decks...</p>
      </div>
    </div>
  )

  const mainDecks = decks.filter(d => d.name.startsWith('Dermki0') || d.name.startsWith('Dermki1') || d.name === 'DermkiAAD_Basic_Curriculum')
  const otherDecks = decks.filter(d => !mainDecks.includes(d))

  return (
    <div>
      {/* Hero */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(108,99,255,0.12)',
          border: '1px solid rgba(108,99,255,0.3)',
          borderRadius: '100px',
          padding: '4px 14px',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: ACCENT,
          marginBottom: '16px'
        }}>
          Dermatology Board Prep
        </div>
        <h1 className="display-font" style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-1px',
          color: '#fff',
          marginBottom: '12px'
        }}>
          Choose your<br />
          <span style={{ color: ACCENT }}>study deck</span>
        </h1>
        <p style={{ color: '#666', fontSize: '15px', maxWidth: '400px' }}>
          9,368 dermatology notes across 18 topics. Tap a deck to begin.
        </p>
      </div>

      {/* Main Dermki Decks Grid */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#444', marginBottom: '16px' }}>
          Core Modules
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '12px',
        }}>
          {mainDecks.map((deck, i) => (
            <DeckCard key={deck.id} deck={deck} index={i} onClick={() => navigate(`/deck/${deck.id}`)} />
          ))}
        </div>
      </div>

      {/* Other Decks */}
      {otherDecks.length > 0 && (
        <div style={{ marginTop: '2.5rem' }}>
          <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#444', marginBottom: '16px' }}>
            Other
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '10px',
          }}>
            {otherDecks.map((deck, i) => (
              <DeckCard key={deck.id} deck={deck} index={i} onClick={() => navigate(`/deck/${deck.id}`)} small />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function DeckCard({ deck, index, onClick, small }) {
  const [hovered, setHovered] = useState(false)

  const colors = [
    ['#6c63ff', '#3ecfcf'],
    ['#ff6b6b', '#ffa500'],
    ['#3ecfcf', '#6c63ff'],
    ['#ff9f43', '#ee5a24'],
    ['#a29bfe', '#fd79a8'],
    ['#00b894', '#00cec9'],
    ['#e17055', '#d63031'],
    ['#74b9ff', '#0984e3'],
  ]
  const [c1, c2] = colors[index % colors.length]

  const cleanName = deck.name
    .replace(/^Dermki\d*_?/, '')
    .replace(/_/g, ' ')
    .replace(/^AAD_Basic_Curriculum$/, 'AAD Basic Curriculum')
    || deck.name

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#13131f' : '#0f0f1a',
        border: `1px solid ${hovered ? c1 : '#1e1e2e'}`,
        borderRadius: '16px',
        padding: small ? '16px 20px' : '20px 24px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? `0 8px 30px rgba(0,0,0,0.3), 0 0 0 1px ${c1}22` : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient orb */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${c1}33, transparent 70%)`,
        transition: 'opacity 0.2s',
        opacity: hovered ? 1 : 0.5,
      }} />

      {/* Icon */}
      <div style={{
        width: small ? '32px' : '40px',
        height: small ? '32px' : '40px',
        borderRadius: '10px',
        background: `linear-gradient(135deg, ${c1}33, ${c2}22)`,
        border: `1px solid ${c1}44`,
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: small ? '14px' : '18px',
      }}>
        🔬
      </div>

      <div className="display-font" style={{
        fontSize: small ? '13px' : '15px',
        fontWeight: 700,
        color: '#e8e8f0',
        marginBottom: '6px',
        lineHeight: 1.3,
      }}>
        {cleanName}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#555',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span style={{
          display: 'inline-block',
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${c1}, ${c2})`,
        }} />
        {deck.note_count} notes
      </div>
    </button>
  )
}