import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DeckList from './pages/DeckList'
import DeckNotes from './pages/DeckNotes'
import NoteDetail from './pages/NoteDetail'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <header className="bg-white border-b px-6 py-4 shadow-sm">
          <h1 className="text-xl font-bold tracking-tight">📚 Dermki Quiz</h1>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-8">
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