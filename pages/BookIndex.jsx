import { BookFilter } from '../cmps/bookIndex/BookFilter.jsx'
import { BookList } from '../cmps/bookIndex/BookList.jsx'
import { bookService } from '../services/book.service.js'
const { useState, useEffect } = React

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

  function onSetFilterBy(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
  }

  console.log(books);
  console.log(!books);

  return (
    <React.Fragment>
      <div className="books-container">
        <BookFilter
          books={books}
          filterBy={filterBy}
          onSetFilterBy={onSetFilterBy}
        />
        {books.length === 0 ? <h2>Loading...</h2> : <BookList books={books} />}
      </div>
    </React.Fragment>
  )
}
