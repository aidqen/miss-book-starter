import { About } from "./pages/About.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { Home } from "./pages/Homepage.jsx";


export function RootCmp() {
  return (
    <main className="content-grid">
      
      <Home />
      <BookIndex />
      <About /> 
    </main>
  )
}
