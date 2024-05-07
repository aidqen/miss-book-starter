const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React
import { bookService } from '../services/book.service.js'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!params.bookId) navigate('/books')

    bookService.get(params.bookId).then(setBook).then(console.log(book))
  }, [])

  if (book) {
    console.log(book)
  }

  return (
    <div className="book-details">
      {!book ? (
        <h2>Loading...</h2>
      ) : (
        <React.Fragment>
          <img src={`../BooksImages/${book.idx}.jpg`} alt="" />
          <div className="text-details">
            <h2>{book.title}</h2>
            <h3>
              Authors: <span>{book.authors.join(' ')}</span>
            </h3>
            <h3>
              Subtitle: <span>{book.subtitle}</span>
            </h3>
            <h3>
              Published: <span>{book.publishedDate}</span>
            </h3>
            <h3>
              Pages: <span>{book.pageCount}</span>
            </h3>
            <h3>
              Categories: <span>{book.categories}</span>
            </h3>
            <h3 className={book.listPrice.isOnSale ? 'bold' : ''}>
              Price:{' '}
              <span>{`${book.listPrice.amount}${book.listPrice.currencyCode} ${
                book.listPrice.isOnSale ? 'On Sale!' : ''
              }`}</span>
            </h3>
            <p>Description: <span>{book.description}</span></p>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
