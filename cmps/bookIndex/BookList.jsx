import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books }) {
  return (
    <ul className='books-list'>
      {books.map(book => {
        return <BookPreview key={book.id} book={book}/>
      })}
    </ul>
  )
}
