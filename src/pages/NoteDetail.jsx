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

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <p style={{ color: '#444', letterSpacing: '2px', fontSize: '12px', textTransform: 'uppercase' }}>Loading...</p>
    </div>
  )

  const question = note.content.text.replace(
    /\{\{c\d+::(.+?)(?:::.+?)?\}\}/g,
    '<span style="background:rgba(108,99,255,0.15);color:rgba(108,99,255,0.15);border-radius:4px;padding:0 6px;user-select:none;">$1</span>'
  )

  const answer = note.content.text.replace(
    /\{\{c\d+::(.+?)(?:::.+?)?\}\}/g,
    '<span style="background:rgba(62,207,207,0.15);color:#3ecfcf;font-weight:600;border-radius:4px;padding:0 6px;">$1</span>'
  )

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{
        background: 'none', border: 'none', color: '#6c63ff',
        fontSize: '13px', cursor: 'pointer', marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '6px', padding: 0,
      }}>
        ← Back
      </button>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {note.tags_list.slice(0, 4).map(tag => (
          <span key={tag} style={{
            fontSize: '10px',
            background: 'rgba(108,99,255,0.12)',
            color: '#6c63ff',
            border: '1px solid rgba(108,99,255,0.2)',
            borderRadius: '100px',
            padding: '3px 10px',
            letterSpacing: '0.5px',
          }}>
            {tag.replace(/#/g, '').split('::').pop()}
          </span>
        ))}
      </div>

      {/* Question */}
      <div style={{
        background: '#0f0f1a',
        border: '1px solid #1e1e2e',
        borderRadius: '20px',
        padding: '28px',
        marginBottom: '16px',
      }}>
        <p style={{
          fontSize: '10px', letterSpacing: '2px',
          textTransform: 'uppercase', color: '#444',
          marginBottom: '16px', fontWeight: 600,
        }}>
          Question
        </p>
        <div
          style={{ fontSize: '15px', lineHeight: 1.8, color: '#c8c8d8' }}
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>

      {/* Reveal */}
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          style={{
            width: '100%', padding: '16px',
            background: 'linear-gradient(135deg, #6c63ff, #3ecfcf)',
            border: 'none', borderRadius: '14px',
            color: '#fff', fontSize: '15px', fontWeight: 600,
            cursor: 'pointer', letterSpacing: '0.3px',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.target.style.opacity = '0.9'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Reveal Answer
        </button>
      ) : (
        <div style={{
          background: '#0f0f1a',
          border: '1px solid rgba(62,207,207,0.2)',
          borderRadius: '20px',
          padding: '28px',
        }}>
          <p style={{
            fontSize: '10px', letterSpacing: '2px',
            textTransform: 'uppercase', color: '#3ecfcf',
            marginBottom: '16px', fontWeight: 600,
          }}>
            Answer
          </p>
          <div
            style={{ fontSize: '15px', lineHeight: 1.8, color: '#c8c8d8' }}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
          {note.content.extra && (
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #1e1e2e' }}>
              <p style={{
                fontSize: '10px', letterSpacing: '2px',
                textTransform: 'uppercase', color: '#444',
                marginBottom: '12px', fontWeight: 600,
              }}>
                Extra
              </p>
              <div
                style={{ fontSize: '13px', lineHeight: 1.8, color: '#666' }}
                dangerouslySetInnerHTML={{ __html: note.content.extra }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}