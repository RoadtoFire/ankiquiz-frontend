import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function DeckList() {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
      api.get('/decks/').then(res => {
        // Handle both paginated and non-paginated responses
        const data = res.data.results || res.data
        const filtered = data.filter(d => d.note_count > 0)
        setDecks(filtered)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-gray-400">Loading decks...</p>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Choose a Deck</h2>
      <div className="grid gap-3">
        {decks.map(deck => (
          <button
            key={deck.id}
            onClick={() => navigate(`/deck/${deck.id}`)}
            className="w-full text-left px-5 py-4 bg-white rounded-xl border hover:border-blue-400 hover:shadow transition"
          >
            <div className="font-medium">{deck.name}</div>
            <div className="text-sm text-gray-400 mt-1">{deck.note_count} notes</div>
          </button>
        ))}
      </div>
    </div>
  )
}