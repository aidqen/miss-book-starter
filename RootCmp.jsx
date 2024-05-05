const { useState } = React

import { About } from "./pages/About.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { Home } from "./pages/Homepage.jsx";


export function RootCmp() {

    const [ route, setRoute ] = useState('bookIndex')

  return (
    <main className="content-grid">
      <header>
        <h1>Miss Books</h1>
        <nav>
            <ul>
                <li onClick={() => setRoute('home')}>Home</li>
                <li onClick={() => setRoute('bookIndex')}>Book Index</li>
                <li onClick={() => setRoute('about')}>About</li>
            </ul>
        </nav>
      </header>

    {route === 'home' && <Home />}
    {route === 'bookIndex' && <BookIndex />}
    {route === 'about' && <About />}
    </main>
  )
}
