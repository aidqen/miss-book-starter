import { BookPreview } from './BookPreview.jsx'
const { Link } = ReactRouterDOM

export function BookList({ books, onRemove }) {
  return (
    <ul className="books-list">
      {books.map(book => {
        return (
          <li key={book.id} className="book-preview">
            <BookPreview onRemove={onRemove} book={book} />
            <div className="actions">
              <Link to={`/books/details/${book.id}`}>Details</Link>
              <button onClick={() => onRemove(book.id)}>Delete</button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
