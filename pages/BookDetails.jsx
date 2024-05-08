const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React

import { BookDetailsMain } from '../cmps/BookDetails/BookDetailsMain.jsx'
import { NextPrevBook } from '../cmps/BookDetails/NextPrevBook.jsx'
import { bookService } from '../services/book.service.js'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!params.bookId) navigate('/books')

    bookService.get(params.bookId)
    .then(setBook)
  }, [params])

  if (book) {
    console.log(book)
  }

  return (
    <div className="book-details">
      {!book ? (<h2>Loading...</h2>) : (
        <React.Fragment>
          <img src={`../BooksImages/${book.idx}.jpg`} alt="" />
          <div className="details-container">
            <BookDetailsMain book={book}/>
            <NextPrevBook nextbookId={book.nextbookId} prevbookId={book.prevbookId}/>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
