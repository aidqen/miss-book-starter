const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Home } from './pages/Homepage.jsx'

export function RootCmp() {
  return (
    <Router>
      <AppHeader />
      <main className="content-grid">
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/books" element={ <BookIndex />} />
          <Route path="/about" element={ <About />} />
          <Route path="/books/details/:bookId" element={ <BookDetails />} />
        </Routes>
      </main>
    </Router>
  )
}
