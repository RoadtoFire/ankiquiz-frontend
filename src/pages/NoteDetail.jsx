import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'

export default function NoteDetail() {
  const { noteId } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/notes/${noteId}/`).then(res => {
      setNote(res.data)
      setLoading(false)
    })
  }, [noteId])

  if (loading) return <p className="text-gray-400">Loading note...</p>

  const question = note.content.text.replace(
    /\{\{c\d+::(.+?)(?:::.+?)?\}\}/g,
    '<span class="bg-blue-100 text-blue-100 rounded px-1 select-none">$1</span>'
  )

  const answer = note.content.text.replace(
    /\{\{c\d+::(.+?)(?:::.+?)?\}\}/g,
    '<span class="bg-green-100 text-green-800 font-semibold rounded px-1">$1</span>'
  )

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-500 mb-6 hover:underline"
      >
        ← Back
      </button>

      <div className="flex gap-2 flex-wrap mb-4">
        {note.tags_list.map(tag => (
          <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="bg-white rounded-2xl border p-6 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Question</p>
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition"
        >
          Reveal Answer
        </button>
      ) : (
        <div className="bg-white rounded-2xl border p-6">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Answer</p>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
          {note.content.extra && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Extra</p>
              <div
                className="prose prose-sm max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: note.content.extra }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}