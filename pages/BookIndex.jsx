const { useState, useEffect } = React
import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/bookIndex/BookFilter.jsx'
import { BookList } from '../cmps/bookIndex/BookList.jsx'

export function BookIndex() {
  const [books, setBooks] = useState([])
  const [filterBy, setFilterBy] = useState({ minPrice: 0, txt: '' })

  useEffect(() => {
    bookService
      .query(filterBy)
      .then(booksPrm => setBooks(booksPrm))
      .catch(err => {
        console.eror('err:', err)
        showErrorMsg('Cannot load cars')
      })
  }, [filterBy])

  function onRemove(bookId) {
    bookService.remove(bookId)
                .then(setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
    // .then(prevBooks => setBooks(prevBooks.filter(book => book.id !== bookId)))
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
  }

  return (
    <React.Fragment>
      <div className="books-container">
        <BookFilter
          books={books}
          filterBy={filterBy}
          onSetFilterBy={onSetFilterBy}
        />
        {books.length === 0 ? <h2>Loading...</h2> : <BookList books={books} onRemove={onRemove} />}
      </div>
    </React.Fragment>
  )
}
