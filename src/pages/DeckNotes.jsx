import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'

export default function DeckNotes() {
  const { deckId } = useParams()
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [nextPage, setNextPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [deckName, setDeckName] = useState('')

  useEffect(() => {
    api.get(`/decks/${deckId}/`).then(res => setDeckName(res.data.name.replace(/_/g, ' ')))
    api.get(`/notes/?deck=${deckId}`).then(res => {
      setNotes(res.data.results)
      setNextPage(res.data.next)
      setLoading(false)
    })
  }, [deckId])

  useEffect(() => {
    api.get(`/decks/${deckId}/`).then(res => {
      const name = res.data.name || ''
      const cleaned = name.split(String.fromCharCode(31)).join(' ').replace(/_/g, ' ')
      setDeckName(cleaned)
    }).catch(err => console.error('Deck fetch error:', err))

    api.get(`/notes/?deck=${deckId}`).then(res => {
      setNotes(res.data.results)
      setNextPage(res.data.next)
      setLoading(false)
    }).catch(err => {
      console.error('Notes fetch error:', err)
      setLoading(false)
    })
  }, [deckId])

  const loadMore = () => {
    if (!nextPage || loadingMore) return
    setLoadingMore(true)
    try {
      const url = new URL(nextPage)
      api.get(url.pathname + url.search).then(res => {
        setNotes(prev => [...prev, ...res.data.results])
        setNextPage(res.data.next)
        setLoadingMore(false)
      }).catch(err => {
        console.error('Load more error:', err)
        setLoadingMore(false)
      })
    } catch (err) {
      console.error('URL parse error:', err, nextPage)
      setLoadingMore(false)
    }
  }



  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <p style={{ color: '#444', letterSpacing: '2px', fontSize: '12px', textTransform: 'uppercase' }}>Loading notes...</p>
    </div>
  )

  return (
    <div>
      <button onClick={() => navigate('/')} style={{
        background: 'none', border: 'none', color: '#6c63ff',
        fontSize: '13px', cursor: 'pointer', marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '6px', padding: 0,
      }}>
        ← Back to decks
      </button>

      <h2 className="display-font" style={{
        fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
        fontWeight: 800, color: '#fff',
        letterSpacing: '-0.5px', marginBottom: '8px'
      }}>
        {deckName}
      </h2>
      <p style={{ color: '#555', fontSize: '13px', marginBottom: '2rem' }}>
        {notes.length} notes loaded
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '12px',
      }}>
        {notes.map(note => (
          <NoteCard key={note.id} note={note} onClick={() => navigate(`/note/${note.id}`)} />
        ))}
      </div>

      {nextPage && (
        <button onClick={loadMore} disabled={loadingMore} style={{
          marginTop: '2rem',
          width: '100%', padding: '14px',
          background: '#0f0f1a',
          border: '1px solid #1e1e2e',
          borderRadius: '12px',
          color: loadingMore ? '#444' : '#6c63ff',
          fontSize: '14px',
          cursor: loadingMore ? 'not-allowed' : 'pointer',
          transition: 'border-color 0.2s',
        }}>
          {loadingMore ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  )
}