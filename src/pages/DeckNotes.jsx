import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'

export default function DeckNotes() {
  const { deckId } = useParams()
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [nextPage, setNextPage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/notes/?deck=${deckId}`).then(res => {
      setNotes(res.data.results)
      setNextPage(res.data.next)
      setLoading(false)
    })
  }, [deckId])

  const loadMore = () => {
    api.get(nextPage).then(res => {
      setNotes(prev => [...prev, ...res.data.results])
      setNextPage(res.data.next)
    })
  }

  if (loading) return <p className="text-gray-400">Loading notes...</p>

  return (
    <div>
      <button onClick={() => navigate('/')} className="text-sm text-blue-500 mb-6 hover:underline">
        ← Back to decks
      </button>
      <h2 className="text-2xl font-semibold mb-6">Notes</h2>
      <div className="grid gap-3">
        {notes.map(note => (
          <button
            key={note.id}
            onClick={() => navigate(`/note/${note.id}`)}
            className="w-full text-left px-5 py-4 bg-white rounded-xl border hover:border-blue-400 hover:shadow transition"
          >
            <div
              className="text-sm line-clamp-2 text-gray-700"
              dangerouslySetInnerHTML={{ __html: note.text }}
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {note.tags_list.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
              {note.has_images && (
                <span className="text-xs bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full">
                  📷 has images
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      {nextPage && (
        <button
          onClick={loadMore}
          className="mt-6 w-full py-3 bg-white border rounded-xl text-blue-500 hover:border-blue-400 transition"
        >
          Load more
        </button>
      )}
    </div>
  )
}