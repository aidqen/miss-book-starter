const { useState, useEffect } = React
import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/bookIndex/BookFilter.jsx'
import { BookList } from '../cmps/bookIndex/BookList.jsx'
import { BookAdd } from '../cmps/BookIndex/BookAdd.jsx'
import { utilService } from "../services/util.service.js";

export function BookIndex() {
  const [books, setBooks] = useState([])
  const [filterBy, setFilterBy] = useState({ minPrice: 0, txt: '' })

  useEffect(() => {
    initializeBooks()
  }, [filterBy])
  

  function initializeBooks() {
    bookService
      .query(filterBy)
      .then(booksPrm => setBooks(booksPrm))
      .catch(err => {
        console.eror('err:', err)
        showErrorMsg('Cannot load cars')
      })
  }

  function onRemove(bookId) {
    bookService.remove(bookId)
                .then(setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
  }

  function makeBook(book) {
    const { volumeInfo } = book
    const { title, subtitle, authors, publishedDate, description, pageCount, categories, imageLinks, language} = volumeInfo
    return {
      id: book.id,
      title,
      subtitle,
      authors,
      publishedDate,
      description,
      pageCount,
      categories,
      thumbnail: (imageLinks) ? imageLinks.thumbnail : '',
      language,
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
      reviews: []
    }
  }

  function addBook(book) {
    const bookRes = makeBook(book)
    bookService.addBook(bookRes)
            .then(setBooks(books => [bookRes, ...books]))
  }

  return (
    <React.Fragment>
      <div className="books-container">
        <BookAdd addBook={addBook}/>
        <BookFilter books={books} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        {books.length === 0 ? <h2>Loading...</h2> : <BookList books={books} onRemove={onRemove} />}
      </div>
    </React.Fragment>
  )
}
