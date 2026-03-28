import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  return (
    <header className="bg-white border-b px-6 py-4 shadow-sm">
      <h1
        onClick={() => navigate('/')}
        className="text-xl font-bold tracking-tight cursor-pointer hover:text-blue-500 transition"
      >
        📚 Dermki Quiz
      </h1>
    </header>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Header />
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