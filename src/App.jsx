import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import DeckList from './pages/DeckList'
import DeckNotes from './pages/DeckNotes'
import NoteDetail from './pages/NoteDetail'

function Header() {
  const navigate = useNavigate()
  return (
    <header style={{
      borderBottom: '1px solid #1e1e2e',
      background: 'rgba(10,10,15,0.9)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0 2rem',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #6c63ff, #3ecfcf)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px'
        }}>🧬</div>
        <span className="display-font" style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px', color: '#fff' }}>
          Dermki<span style={{ color: '#6c63ff' }}>.</span>
        </span>
      </div>
      <span style={{ fontSize: '12px', color: '#444', letterSpacing: '2px', textTransform: 'uppercase' }}>
        Dermatology Quiz
      </span>
    </header>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
        <Header />
        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
          <Routes>
            <Route path="/" element={<DeckList />} />
            <Route path="/deck/:deckId" element={<DeckNotes />} />
            <Route path="/note/:noteId" element={<NoteDetail key={window.location.pathname} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}